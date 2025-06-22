import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import { useUserProfile } from '@/stores/useUserProfile';
import Subscription from './Subscription';
import { Banner } from '@/components/Banner';
import { Button } from '@/components/Button';
import { IMAGES } from '@/constant/imagePath';
import { useCurrentPlan } from '@/hooks/useCurrentPlan';
import { BillSummaryCard } from '@/components/ui/billsummarycard';
import PromotionalBanner from '@/components/PromotionalBanner/PromotionalBanner';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const { data: plan, isLoading: planLoading } = useCurrentPlan();

  const formatUsage = (
    label: string,
    variant: 'data' | 'call' | 'sharedData' | 'sms',
    value: string,
  ) => {
    if (!value) {
      return {
        label,
        variant,
        current: 0,
        total: 1,
        displayText: '0',
      };
    }
    const isUnlimited = value.includes('무제한');
    const total =
      variant === 'data'
        ? 30
        : variant === 'sharedData'
          ? 60
          : variant === 'sms'
            ? 200
            : variant === 'call'
              ? 1000
              : 1;
    const numeric = isUnlimited ? total : Number(value.replace(/[^0-9.]/g, ''));
    return {
      label,
      variant,
      current: numeric,
      total,
      displayText: isUnlimited ? '무제한' : variant === 'sms' ? `${numeric}건` : value,
    };
  };

  const usageData = [
    formatUsage('데이터', 'data', plan?.data),
    formatUsage('통화', 'call', plan?.voice),
    formatUsage('공유데이터', 'sharedData', plan?.share_data),
    formatUsage('문자', 'sms', plan?.sms),
  ];

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

      <PromotionalBanner navigate={navigate} />

      {isLoggedIn ? (
        profileLoading || planLoading ? (
          <div className="flex justify-center">프로필 정보 로딩 중…</div>
        ) : plan ? (
          <div className="mb-4">
            <h1 className="text-xl font-bold text-brand-darkblue mb-4">내 요금제</h1>
            <BillSummaryCard
              phoneNumber={profile?.phoneNumber ?? '010-****-****'}
              planName={plan.name}
              month={`${new Date().getMonth() + 1}월`}
              amount={Number(plan.price)}
              usageData={usageData}
            />
          </div>
        ) : (
          // 요금제 정보 없을 때
          <div className="relative mb-4 rounded-xl overflow-hidden">
            <div className="filter blur-sm brightness-90 select-none pointer-events-none">
              <img
                src={IMAGES.MOONER['mooner-phone']}
                alt="요금제 배경"
                className="w-full h-40 object-cover"
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <h2 className="text-title-1 font-bold text-[#25394B] mb-2">
                가입된 요금제가 없어요.
              </h2>

              <Button onClick={() => navigate('/plans')} variant="outline">
                요금제 둘러보기
              </Button>
            </div>
          </div>
        )
      ) : null}

      <Subscription />
    </div>
  );
};

export default Home;
