import React from 'react';
import { loginViaProvider, Provider } from '../utils/auth';

const Login: React.FC = () => {
  const handleLogin = (provider: Provider) => () => {
    loginViaProvider(provider);
  };

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