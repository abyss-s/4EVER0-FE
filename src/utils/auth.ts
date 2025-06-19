import { API_BASE_URL, apiWithToken, apiWithoutToken } from '@/lib/api/apiconfig';

export function loginViaProvider(provider: string, redirectPath?: string) {
  // 1) 돌아갈 경로 결정
  let from = redirectPath ?? window.location.pathname + window.location.search;

  // redirectPath가 signup 페이지면 루트로 변경
  if (!from.startsWith('/signup')) {
    sessionStorage.setItem('redirectPath', from);
  }
  // 2) OAuth 엔드포인트로 리다이렉트
  window.location.href = `${API_BASE_URL}/auth/${provider}`;
}

export async function refreshAccessToken(userId: string): Promise<void> {
  try {
    await apiWithoutToken.post(`/auth/refresh`, null, {
      params: { userId },
    });
    // 서버에서 Set-Cookie 헤더로 ACCESS_TOKEN 쿠키를 다시 내려줍니다.
  } catch (e) {
    console.error('토큰 리프레시 실패', e);
    throw e;
  }
}

export async function logout(): Promise<void> {
  try {
    await apiWithToken.post(`/auth/logout`);
    // 클라이언트 측에서도 ACCESS_TOKEN 쿠키 만료 처리
    document.cookie = 'ACCESS_TOKEN=; Max-Age=0; path=/; secure; samesite=None';
  } catch (e) {
    console.error('로그아웃 실패', e);
    throw e;
  }
}
