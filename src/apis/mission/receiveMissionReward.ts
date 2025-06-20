import { apiWithToken } from '@/lib/api/apiconfig';

export const receiveMissionReward = async (missionId: number) => {
  const response = await apiWithToken.patch(`/missions/${missionId}/reward`);
  return response.data;
};
