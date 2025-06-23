// src/lib/api/apiconfig.ts
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { refreshAccessToken, logout as apiLogout } from '@/utils/auth';
import { useAuthStore } from '@/stores/useAuthStore';

// Mixed Content 방지를 위해 강제로 HTTPS 사용
const getApiBaseUrl = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  // HTTP를 HTTPS로 강제 변환
  if (baseUrl && baseUrl.startsWith('http://')) {
    return baseUrl.replace('http://', 'https://') + '/api';
  }
  return `${baseUrl}/api`;
};

export const API_BASE_URL = getApiBaseUrl();

// 인증 필요 인스턴스
export const apiWithToken = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  // Mixed Content 방지를 위한 추가 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiWithoutToken = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 개발 환경에서 Mixed Content 경고 로그
if (import.meta.env.DEV && API_BASE_URL.startsWith('http://')) {
  console.warn('API_BASE_URL이 HTTP로 설정되어 있습니다. HTTPS를 사용하세요:', API_BASE_URL);
}

let isRefreshing = false;
let queue: Array<() => void> = [];

// Zustand에서 상태 변경 함수만 꺼내오기
const { login: stateLogin, logout: stateLogout } = useAuthStore.getState();

apiWithToken.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (err: AxiosError) => {
    const originalReq = err.config as AxiosRequestConfig & { _retry?: boolean };

    if (err.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push(() => {
            apiWithToken(originalReq).then(resolve).catch(reject);
          });
        });
      }

      isRefreshing = true;
      try {
        // ✏️ 인터셉터 내부에서 매번 최신 userId 가져오기
        const { userId, authId } = useAuthStore.getState();
        if (!userId) throw new Error('No userId for refresh');
        if (!authId) throw new Error('No authId for refresh');

        // 1) refreshToken 호출
        await refreshAccessToken(authId);

        // 2) Zustand 로그인 상태 갱신 (userId 인자로!)
        stateLogin(authId, userId);

        // 3) 대기 중이던 요청들 재시도
        queue.forEach((cb) => cb());
        queue = [];

        // 4) 원래 요청 재시도
        return apiWithToken(originalReq);
      } catch (e) {
        // 리프레시 실패 → 실제 로그아웃 API 호출 + Zustand 상태 초기화
        await apiLogout();
        stateLogout();

        // 로그인 페이지로 이동
        window.location.href = '/login';
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  },
);
