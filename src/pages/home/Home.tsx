import React, { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import { useUserProfile } from '@/stores/useUserProfile';
import { logout as apiLogout } from '@/utils/auth';
import Subscription from './Subscription';
import { Banner } from '@/components/Banner';
import { Button } from '@/components/Button';
import { IMAGES } from '@/constant/imagePath';
import { sonnerToast } from '@/components/Sooner';
import { Card, CardContent } from '@/components/Card';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, logout: stateLogout } = useAuthStore();
  const { data: profile, isLoading: profileLoading } = useUserProfile();

  const handleLogout = useCallback(async () => {
    try {
      await apiLogout();
      stateLogout();
      sonnerToast('로그아웃되었습니다.');
      navigate('/login');
    } catch {
      sonnerToast.error('로그아웃 실패');
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
        className="mb-4"
      />

      {isLoggedIn ? (
        profileLoading ? (
          <div className="flex justify-center">프로필 정보 로딩 중…</div>
        ) : (
          <div className="relative flex flex-col items-center justify-center flex-1 px-6 py-12 min-h-[20vh] bg-[#F4DE75] rounded-lg text-center shadow-md mb-4 overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 rounded-full z-0" />
            <div className="absolute bottom-0 -right-12 w-44 h-44 bg-white/20 rounded-full z-0" />
            <div className="relative z-10">
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
          </div>
        )
      ) : (
        <div className="relative flex flex-col items-center justify-center flex-1 px-6 py-12 min-h-[20vh] bg-[#F4DE75] rounded-lg text-center shadow-md mb-4 overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 rounded-full z-0" />
          <div className="absolute bottom-0 -right-12 w-44 h-44 bg-white/20 rounded-full z-0" />
          <div className="relative z-10">
            <img
              src={IMAGES.MOONER['moonoz-hello']}
              alt="MoonoZ 인사"
              className="w-24 h-24 mx-auto mb-4"
            />
            <h1 className="text-3xl font-bold text-[#25394B] mb-3">어서오세요!</h1>
            <p className="text-[#25394B] mb-6">
              로그인하시면 <span className="font-semibold underline">맞춤 추천</span>과<br />
              <span className="font-semibold underline">추가 혜택</span>을 이용하실 수 있어요 😊
            </p>
            <button
              onClick={() => navigate('/login', { state: { from: location } })}
              className="px-6 py-2 bg-[#25394B] text-white rounded-full font-semibold shadow hover:brightness-110 transition-all"
            >
              로그인하러 가기
            </button>
          </div>
        </div>
      )}

      <Subscription />
    </div>
  );
};

export default Home;
