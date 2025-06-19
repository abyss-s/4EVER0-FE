import { useQuery } from '@tanstack/react-query';
import { fetchAllPlans } from '@/apis/plan/getAllPlans';
import { PlanResponse } from '@/types/plans';

export const useAllPlan = () => {
  return useQuery<PlanResponse[], Error>({
    queryKey: ['allPlan'],
    queryFn: async () => {
      const data = await fetchAllPlans();
      if (!data) throw new Error('요금제 응답이 없습니다');
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
