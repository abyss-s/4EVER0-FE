// src/pages/login/Login.tsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginViaProvider } from '@/utils/auth';
import { useAuthStore } from '@/stores/useAuthStore';

interface LocationState {
  from?: {
    pathname: string;
    search: string;
  };
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  // ProtectedRoute 에서 전달한 원래 경로
  const from =
    ((location.state as LocationState)?.from?.pathname ?? '') +
      ((location.state as LocationState)?.from?.search ?? '') || '/';

  // 이미 로그인된 경우 자동 리다이렉트
  useEffect(() => {
    if (isLoggedIn) {
      navigate(from, { replace: true });
    }
  }, [isLoggedIn, navigate, from]);

  const handleLogin = (provider: string) => () => {
    // redirectPath를 넘겨줘야 콜백에서 올바르게 돌아옵니다
    console.log('▶️ saving redirectPath:', from);
    loginViaProvider(provider, from);
  };

  // 로그인 상태면 버튼 대신 메시지
  if (isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">이미 로그인되어 있습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">OAuth Login</h1>
      <div className="space-y-4">
        <button
          onClick={handleLogin('google')}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Google 로그인
        </button>
        <button
          onClick={handleLogin('kakao')}
          className="px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500"
        >
          Kakao 로그인
        </button>
        <button
          onClick={handleLogin('naver')}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Naver 로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
