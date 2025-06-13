import { BillSummaryCard } from '@/components/ui/billsummarycard';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCurrentPlan } from '@/apis/plan/getCurrentPlan';

const MyPage: React.FC = () => {
  const {
    data: plan,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['currentPlan'],
    queryFn: fetchCurrentPlan,
  });

  const month = `${new Date().getMonth() + 1}월`;

  if (isLoading) return <p className="p-4">로딩 중...</p>;
  if (error || !plan) return <p className="p-4">요금제를 불러오지 못했습니다.</p>;

  return (
    <div className="p-4">
      <BillSummaryCard
        phoneNumber="010-1**4-5**8"
        planName={plan.name}
        month={month}
        amount={Number(plan.price)}
        usageData={[
          { label: '데이터', variant: 'data', current: 6, total: 6 },
          { label: '통화', variant: 'call', current: 1, total: 1 },
          { label: '영상', variant: 'video', current: 0.8, total: 1 },
          { label: '문자', variant: 'sms', current: 1, total: 1 },
        ]}
      />
      <Outlet />
    </div>
  );
};

export default MyPage;

{
  /* <nav>
        <Link to="coupons">쿠폰</Link> |<Link to="likes">좋아요</Link> |
        <Link to="events">이벤트</Link> |<Link to="change-plans">요금제 변경</Link>
      </nav> */
}
