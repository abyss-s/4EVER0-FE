// src/pages/oauth/OAuthCallback.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import { apiWithToken } from '@/lib/api/apiconfig';
import { useQueryClient } from '@tanstack/react-query';
import { UserResponse } from '@/types/user';

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const queryClient = useQueryClient();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiWithToken.get<UserResponse>('/user');
        login(data.userId, data.id);

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

  return null;
};

export default OAuthCallback;
