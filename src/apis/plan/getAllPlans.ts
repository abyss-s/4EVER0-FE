import { apiWithoutToken } from '@/lib/api/apiconfig';

export const fetchAllPlans = async () => {
  const res = await apiWithoutToken.get('/plans');
  return res.data.data;
};
