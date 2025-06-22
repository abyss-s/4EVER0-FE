import { apiWithoutToken } from '@/lib/api/apiconfig';

export const assignRandomPlan = async () => {
  return apiWithoutToken.post('/user/plans/random');
};
