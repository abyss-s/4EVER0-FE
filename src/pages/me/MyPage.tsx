import { BillSummaryCard } from '@/components/ui/billsummarycard';
import React from 'react';
import { Card, CardContent } from '@/components/Card';
import { useQuery } from '@tanstack/react-query';
import { fetchCurrentPlan } from '@/apis/plan/getCurrentPlan';
import { useUserProfile } from '@/stores/useUserProfile';
import { Ticket, Coins, Package, FolderHeart, Stamp, ClipboardCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IMAGES } from '@/constant/imagePath';
import { fetchUserCoupons } from '@/apis/coupon/getUserCoupons';

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

  const { data: coupons = [] } = useQuery({
    queryKey: ['userCoupons'],
    queryFn: fetchUserCoupons,
  });
  const availableCoupons = coupons.filter((c) => c.isUsed === false);

  if (isLoading) return <p className="p-4">로딩 중...</p>;
  if (error || !plan) return <p className="p-4">요금제를 불러오지 못했습니다.</p>;

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
    formatUsage('데이터', 'data', plan.data),
    formatUsage('통화', 'call', plan.voice),
    formatUsage('공유데이터', 'sharedData', plan.share_data),
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
        <Link to="coupons">
          <Card clickable>
            <CardContent className="flex items-center justify-center gap-1.5 py-2.5 leading-none">
              <Ticket className="w-[18px] h-[18px] text-yellow-600 shrink-0" />
              <span className="caption-1 whitespace-nowrap">보유 쿠폰</span>
              <span className="caption-1 font-bold ml-1 whitespace-nowrap">
                {availableCoupons.length}개
              </span>
            </CardContent>
          </Card>
        </Link>

        <Card clickable>
          <CardContent className="flex items-center justify-center gap-1.5 py-2.5 leading-none">
            <Coins className="w-[18px] h-[18px] text-blue-600 shrink-0" />
            <span className="caption-1 whitespace-nowrap">보유 포인트</span>
            <span className="caption-1 font-bold ml-1 whitespace-nowrap">1,250P</span>
          </CardContent>
        </Card>
      </div>

      <h3 className="title-2 mb-4 mt-4">요금제 설정</h3>
      <div className="grid grid-cols-2 gap-4">
        <Card clickable>
          <CardContent className="text-center py-2.5 caption-1  leading-tight">
            요금제 해지
          </CardContent>
        </Card>
        <Card clickable>
          <CardContent className="text-center py-2.5 caption-1  leading-tight">
            요금제 변경
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="title-2 mb-4 mt-4">
          내 활동 <span className="text-red-400 font-bold">4</span>개
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <Link to="subscriptions">
            <Card clickable>
              <CardContent className="flex flex-col items-center justify-center py-4 gap-1 whitespace-nowrap text-center">
                <Package className="w-6 h-6" />
                <span className="caption-1">구독상품 목록</span>
              </CardContent>
            </Card>
          </Link>

          <Card clickable>
            <CardContent className="flex flex-col items-center justify-center py-4 gap-1 whitespace-nowrap text-center">
              <ClipboardCheck className="w-6 h-6" />
              <span className="caption-1">미션 목록</span>
            </CardContent>
          </Card>
          <Card clickable>
            <CardContent className="flex flex-col items-center justify-center py-4 gap-1 whitespace-nowrap text-center">
              <Stamp className="w-6 h-6" />
              <span className="caption-1">이번달 출석 기록</span>
            </CardContent>
          </Card>
          <Card clickable>
            <CardContent className="flex flex-col items-center justify-center py-4 gap-1 whitespace-nowrap text-center">
              <FolderHeart className="w-6 h-6" />
              <span className="caption-1">좋아요한 쿠폰 목록</span>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
