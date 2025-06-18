// src/pages/login/Login.tsx
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p">
            {/* Header Message */}
            <div className="text-center">
              <div className="inline-block bg-white/90 px-4 py-2 rounded-full shadow-sm mb-2">
                <p className="text-slate-700 font-medium text-sm">지금 바로 시작하기!</p>
              </div>
            </div>

            {/* MoonoZ Logo and Mascot */}
            <div className="text-center">
              <img
                src="https://d3e0ocbonj571p.cloudfront.net/MoonoZ_logo_v1.png"
                alt="MoonoZ Logo"
                className="h-50 w-50 mx-auto"
              />
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-4">
              {/* Google Login */}
              <Button
                onClick={handleLogin('google')}
                className="w-full h-12 bg-white hover:bg-gray-50 text-slate-700 border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md"
                variant="outline"
              >
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="font-medium">Google 로그인</span>
                </div>
              </Button>

              {/* Naver Login */}
              <Button
                onClick={handleLogin('naver')}
                className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-medium transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
                    <span className="text-green-500 font-bold text-sm">N</span>
                  </div>
                  <span>네이버 로그인</span>
                </div>
              </Button>

              {/* Kakao Login */}
              <Button
                onClick={handleLogin('kakao')}
                className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-slate-800 font-medium transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3C7.03 3 3 6.14 3 10.1c0 2.52 1.65 4.74 4.1 6.05l-.96 3.52c-.08.3.23.56.49.41l4.36-2.84c.34.02.68.03 1.01.03 4.97 0 9-3.14 9-7.1S16.97 3 12 3z" />
                  </svg>
                  <span>카카오 로그인</span>
                </div>
              </Button>
            </div>

            {/* Footer Links */}
            <div className="mt-8 text-center space-y-3">
              <div className="text-xs text-slate-400 space-y-1">
                <p>로그인하시면 MoonoZ의</p>
                <div className="flex items-center justify-center gap-2">
                  <button className="text-yellow-600 hover:underline">이용약관</button>
                  <span>및</span>
                  <button className="text-yellow-600 hover:underline">개인정보처리방침</button>
                  <span>에 동의하게 됩니다.</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
