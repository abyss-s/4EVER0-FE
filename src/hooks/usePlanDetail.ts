import { useQuery } from '@tanstack/react-query';
import { fetchPlanDetail } from '@/apis/plan/getPlanDetail';
import { PlanResponse } from '@/types/plans';

export const usePlanDetail = (planId: string) => {
  return useQuery<PlanResponse>({
    queryKey: ['planDetail', planId],
    queryFn: () => fetchPlanDetail(planId),
    enabled: !!planId,
  });
};
