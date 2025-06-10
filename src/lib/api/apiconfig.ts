import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { logout, refreshAccessToken } from "@/utils/auth";

export const API_BASE_URL = "http://localhost:5050/api";

// — 1) 인증 필요 없는 인스턴스 —
export const apiWithoutToken = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// — 2) 인증 필요 인스턴스 (쿠키 기반) —
export const apiWithToken = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let queue: Array<() => void> = [];

/**
 *  인증 실패(401) 시 자동으로 REFRESH_TOKEN 쿠키로
 *  /auth/refresh 호출 후 재시도해 주는 인터셉터
 */
apiWithToken.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (err: AxiosError) => {
    const originalReq = err.config as AxiosRequestConfig & { _retry?: boolean };

    // 1) 401 + 아직 재시도하지 않은 요청만 처리
    if (err.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;

      // 2) 이미 리프레시 중이라면 큐에 담아두고 대기
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push(() => {
            apiWithToken(originalReq).then(resolve).catch(reject);
          });
        });
      }

      isRefreshing = true;
      try {
        const userId = "mciA6SMvQGQEDZYS9W7IXTXGAgOt4sd4YJLIimSiCSI";
        // 3) REFRESH_TOKEN 쿠키로 재발급
        await refreshAccessToken(userId);
        // 서버가 새 ACCESS_TOKEN 쿠키를 Set-Cookie 해 줍니다

        // 4) 대기 중이던 요청들 재시도
        queue.forEach((cb) => cb());
        queue = [];

        // 5) 원래 요청 재시도
        return apiWithToken(originalReq);
      } catch (e) {
        // 재발급 실패 시 로그아웃
        await logout();
        window.location.href = "/login";
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  },
);
