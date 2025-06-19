import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAllPlan } from '@/hooks/useAllPlan';
import { usePlanDetail } from '@/hooks/usePlanDetail';
import { PlanResponse } from '@/types/plans';
import PlanCard from '@/components/PlanCard/PlanCard';

const Plan: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: planDetail,
    isLoading: isDetailLoading,
    error: detailError,
  } = usePlanDetail(id ?? '');

  const { data: planList = [], isLoading: isListLoading, error: listError } = useAllPlan();

  if (isDetailLoading || isListLoading) return <p className="p-4">로딩 중...</p>;
  if (detailError || listError) {
    return <p className="p-4 text-red-500">요금제를 불러오는 중 오류가 발생했습니다.</p>;
  }

  // 전체 목록
  if (!id && planList.length > 0) {
    return (
      <div className="p-6 flex flex-col gap-6 items-center">
        {planList.map((plan: PlanResponse) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onSelect={() => navigate(`/plans/${plan.id}`)}
            className="w-full max-w-md"
          />
        ))}
      </div>
    );
  }

  // 상세 페이지
  if (id && planDetail) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <PlanCard plan={planDetail} />
      </div>
    );
  }

  return <p className="p-4">요금제를 불러오지 못했습니다.</p>;
};

export default Plan;
