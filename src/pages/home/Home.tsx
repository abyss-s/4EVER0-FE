// src/pages/home/Home.tsx
import React, { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import { useUserProfile } from '@/stores/useUserProfile';
import { logout as apiLogout } from '@/utils/auth';
import { Banner } from '@/components/Banner';
import { Button } from '@/components/Button';
import { IMAGES } from '@/constant/imagePath';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, logout: stateLogout } = useAuthStore();
  const { data: profile, isLoading: profileLoading } = useUserProfile();

  const handleLogout = useCallback(async () => {
    try {
      await apiLogout();
      stateLogout();
      navigate('/login');
    } catch {
      alert('로그아웃 실패');
    }
  }, [navigate, stateLogout]);

  return (
    <div>
      <Banner
        variant="primary"
        size="sm"
        title="🐙 무너와 대화하러 가기"
        description="AI 챗봇과 함께 나에게 딱 맞는 요금제를 찾아보세요!"
        image={IMAGES.MOONER['mooner-phone']}
        actionButton={
          <Button
            variant="outline"
            size="sm"
            className="bg-white/20 border-white/30 text-white hover:bg-white/20 cursor-pointer"
            onClick={() => navigate('/chatbot')}
          >
            대화 시작하기
          </Button>
        }
        className="mb-8"
      />

      {/* 조건부 컨텐츠 */}
      {isLoggedIn ? (
        profileLoading ? (
          <div className="flex justify-center">프로필 정보 로딩 중…</div>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1">
            <h1 className="text-2xl font-bold mb-4">안녕하세요, {profile?.name ?? '회원'}님!</h1>
            <p className="mb-2">플랜 ID: {profile?.planId}</p>
            <p className="mb-2">포인트: {profile?.point}</p>
            <p className="mb-4">출석 연속일: {profile?.attendanceStreak}일</p>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              로그아웃
            </button>
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center flex-1">
          <h1 className="text-2xl font-bold mb-6">홈</h1>
          <p className="mb-4">로그인하시면 더 많은 기능을 이용하실 수 있습니다.</p>
          <button
            onClick={() => navigate('/login', { state: { from: location } })}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            로그인하러 가기
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
