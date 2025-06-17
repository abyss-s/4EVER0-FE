import { BillSummaryCard } from '@/components/ui/billsummarycard';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCurrentPlan } from '@/apis/plan/getCurrentPlan';
import { useUserProfile } from '@/stores/useUserProfile';
import { Ticket, Coins, Package, FolderHeart, Stamp, ClipboardCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IMAGES } from '@/constant/imagePath';

const MyPage: React.FC = () => {
  const {
    data: plan,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['currentPlan'],
    queryFn: fetchCurrentPlan,
  });
  const { data: profile } = useUserProfile();

  const month = `${new Date().getMonth() + 1}월`;

  if (isLoading) return <p className="p-4">로딩 중...</p>;
  if (error || !plan) return <p className="p-4">요금제를 불러오지 못했습니다.</p>;

  const formatUsage = (label: string, variant: 'data' | 'call' | 'sms', value: string) => {
    const isUnlimited = value === '무제한';
    const numeric = isUnlimited ? 1 : Number(value.replace(/GB|분/g, ''));

    return {
      label,
      variant,
      current: numeric,
      total: 1,
      displayText: isUnlimited ? '무제한' : variant === 'sms' ? `${numeric}건` : value,
    };
  };

  // ✅ 여기에서 정의해야 함!
  const usageData = [
    formatUsage('데이터', 'data', plan.data),
    formatUsage('통화', 'call', plan.voice),
    formatUsage('문자', 'sms', plan.sms),
  ];
  return (
    <div className="pb-20 space-y-8">
      <h2 className="title-1 mt-6 flex items-center gap-2">
        <img src={IMAGES.MOONER['mooner-phone']} alt="문어 아이콘" className="w-15 h-15" />
        {profile?.name ?? '고객'} 님 안녕하세요!
      </h2>
      <h3 className="title-2 mb-4 mt-4">내 요금제</h3>
      <BillSummaryCard
        phoneNumber={profile?.phoneNumber ?? '010-****-****'}
        planName={plan.name}
        month={month}
        amount={Number(plan.price)}
        usageData={usageData}
      />
      <h3 className="title-2 mb-4 mt-4">내 정보</h3>
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="coupons"
          className="w-full py-3 rounded-lg bg-card text-card-foreground shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Ticket className="w-5 h-5 text-yellow-600" />
          <span className="caption-1">보유 쿠폰</span>
          <span className="caption-1 font-bold ml-1">3개</span>
        </Link>
        <div className="w-full py-3 rounded-lg bg-card text-card-foreground shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2">
          <Coins className="w-5 h-5 text-blue-600" />
          <span className="caption-1">보유 포인트</span>
          <span className="caption-1 font-bold ml-1">1,250P</span>
        </div>
      </div>
      <h3 className="title-2 mb-4 mt-4">요금제 설정</h3>
      <div className="grid grid-cols-2 gap-4">
        <button className="w-full py-3 rounded-lg bg-card text-card-foreground shadow-sm hover:shadow-md transition-all caption-1">
          요금제 해지
        </button>
        <button className="w-full py-3 rounded-lg bg-card text-card-foreground shadow-sm hover:shadow-md transition-all caption-1">
          요금제 변경
        </button>
      </div>

      <div>
        <h3 className="title-2 mb-4 mt-4">
          내 활동 <span className="text-red-400 font-bold">4</span>개
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-card text-card-foreground flex flex-col items-center justify-center gap-1 rounded-xl py-4 shadow-sm cursor-pointer transition-all border border-gray-50 hover:shadow-md">
            <Package className="w-6 h-6" />
            <span className="caption-1">구독상품 목록</span>
          </button>
          <button className="bg-card text-card-foreground flex flex-col items-center justify-center gap-1 rounded-xl py-4 shadow-sm cursor-pointer transition-all border border-gray-50 hover:shadow-md">
            <ClipboardCheck className="w-6 h-6" />
            <span className="caption-1">미션 목록</span>
          </button>
          <button className="bg-card text-card-foreground flex flex-col items-center justify-center gap-1 rounded-xl py-4 shadow-sm cursor-pointer transition-all border border-gray-50 hover:shadow-md">
            <Stamp className="w-6 h-6" />
            <span className="caption-1">이번달 출석 기록</span>
          </button>
          <button className="bg-card text-card-foreground flex flex-col items-center justify-center gap-1 rounded-xl py-4 shadow-sm cursor-pointer transition-all border border-gray-50 hover:shadow-md">
            <FolderHeart className="w-6 h-6" />
            <span className="caption-1">좋아요한 쿠폰 목록</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
