import { apiWithToken } from '@/lib/api/apiconfig';

/**
 * 요금제 변경 신청
 * @param planId 변경할 요금제 ID
 */
export const changePlan = async (planId: number) => {
  const res = await apiWithToken.post('/user/plans', { plan_id: planId });
  return res?.data;
};
