import { apiWithToken } from '@/lib/api/apiconfig';

export const fetchPlanDetail = async (planId: string) => {
  const res = await apiWithToken.get(`/plans/${planId}`);
  return res.data.data;
};
