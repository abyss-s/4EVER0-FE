import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { refreshAccessToken, logout as apiLogout } from '@/utils/auth';
import { useAuthStore } from '@/stores/useAuthStore';

export const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

// 인증 필요 인스턴스
export const apiWithToken = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const apiWithoutToken = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

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
        // 인터셉터 내부에서 매번 최신 userId 가져오기
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
