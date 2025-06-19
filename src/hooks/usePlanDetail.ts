import { useQuery } from '@tanstack/react-query';
import { fetchPlanDetail } from '@/apis/plan/getPlanDetail';

export const usePlanDetail = (planId: string) => {
  return useQuery({
    queryKey: ['planDetail', planId],
    queryFn: () => fetchPlanDetail(planId),
    enabled: !!planId,
    staleTime: 1000 * 60 * 5,
  });
};
