import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePlanDetail } from '@/hooks/usePlanDetail';

const PlanDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: plan, isLoading, error } = usePlanDetail(id ?? '');

  if (isLoading) return <p className="p-4">로딩 중...</p>;
  if (error || !plan) return <p className="p-4 text-red-500">요금제를 불러올 수 없습니다.</p>;

  return (
    <div className="p-6 space-y-2">
      <h1 className="text-2xl font-bold">{plan.name}</h1>
      <p>가격: {plan.price}원</p>
      <p>데이터: {plan.data}</p>
      <p>속도: {plan.speed}</p>
      <p>음성: {plan.voice}</p>
      <p>SMS: {plan.sms}</p>
      <p>쉐어링: {plan.share_data}</p>
      <p className="mt-4 text-sm text-gray-600">{plan.description}</p>
      <Link to="/plans" className="block mt-6 text-blue-500 underline">
        전체 요금제로 돌아가기
      </Link>
    </div>
  );
};

export default PlanDetail;
