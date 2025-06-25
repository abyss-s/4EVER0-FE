import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import { apiWithToken } from '@/lib/api/apiconfig';
import { useQueryClient } from '@tanstack/react-query';
import { UserResponse } from '@/types/user';
import { IMAGES } from '@/constant/imagePath';

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps = [
    {
      imageUrl: IMAGES.MOONER.rotation_1,
      title: '로그인 정보 확인 중...',
    },
    {
      imageUrl: IMAGES.MOONER.rotation_2,
      title: '사용자 정보 받아오는 중...',
    },
    {
      imageUrl: IMAGES.MOONER.rotation_3,
      title: '로그인 정보 확인 중...',
    },
    {
      imageUrl: IMAGES.MOONER.rotation_4,
      title: '사용자 정보 받아오는 중...',
    },
  ];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % loadingSteps.length);
    }, 250);
    return () => clearInterval(stepInterval);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiWithToken.get<UserResponse>('/user');
        login(data.userId, data.id);
        localStorage.setItem('hasLoggedIn', 'true');

        // React Query 캐시에 미리 저장
        queryClient.setQueryData(['userProfile', data.userId], data);

        // 복귀 경로 로드 및 로그
        const redirectPath = sessionStorage.getItem('redirectPath') || '/';
        sessionStorage.removeItem('redirectPath');

        navigate(redirectPath, { replace: true });
      } catch {
        navigate('/login', { replace: true });
      }
    })();
  }, [login, navigate, queryClient]);

  const currentLoadingStep = loadingSteps[currentStep];

  return (
    <div className="flex flex-col items-center justify-center min-h-full">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">
          <span className="text-red-500">M</span>
          <span className="text-slate-800">oono</span>
          <span className="text-red-500">Z</span>
        </h1>
      </div>

      {/* 이미지 + 타이틀 */}
      <div className="relative mb-8 flex flex-col items-center">
        <img
          src={currentLoadingStep.imageUrl}
          alt={currentLoadingStep.title}
          className="w-64 h-42 mx-auto transition-transform duration-300 transform hover:scale-105"
          style={{ animation: 'bounce 1s infinite' }}
        />
        <h2 className="mt-4 text-xl font-semibold text-slate-800 transition-colors duration-300">
          {currentLoadingStep.title}
        </h2>
      </div>

      {/* 새로고침 경고 메시지 */}
      <div className="text-xs text-slate-400 space-y-1 text-center">
        <p>잠시만 기다려주세요...</p>
        <p>로딩 중 절대 새로 고침을 하지 마세요! ✨</p>
      </div>
    </div>
  );
};

export default OAuthCallback;
