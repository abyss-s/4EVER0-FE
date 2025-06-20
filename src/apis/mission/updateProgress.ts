import { apiWithToken } from '@/lib/api/apiconfig';

export const updateProgress = async (missionId: number) => {
  await apiWithToken.patch(`/missions/${missionId}/progress`);
};
