import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePlanDetail } from '@/hooks/usePlanDetail';
import PlanCard from '@/components/PlanCard/PlanCard';

const PlanDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: plan, isLoading, error } = usePlanDetail(id ?? '');

  if (isLoading) return <p className="p-4">로딩 중...</p>;
  if (error || !plan) return <p className="p-4 text-red-500">요금제를 불러올 수 없습니다.</p>;

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <PlanCard plan={plan} />
      <Link to="/plans" className="block text-center text-blue-500 underline">
        전체 요금제로 돌아가기
      </Link>
    </div>
  );
};

export default PlanDetail;
