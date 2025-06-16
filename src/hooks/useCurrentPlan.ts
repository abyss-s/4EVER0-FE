import { useQuery } from '@tanstack/react-query';
import { fetchCurrentPlan } from '@/apis/plan/getCurrentPlan';

export const useCurrentPlan = () => {
  return useQuery({
    queryKey: ['currentPlan'],
    queryFn: fetchCurrentPlan,
    staleTime: 1000 * 60 * 5,
  });
};
