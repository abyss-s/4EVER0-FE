import { apiWithToken } from '@/lib/api/apiconfig';
import { Mission, MissionType, RawUserMission } from '@/types/mission';

export const getUserMissions = async (): Promise<Mission[]> => {
  const res = await apiWithToken.get<{ data: RawUserMission[] }>('/missions/me');

  return res.data.data.map(
    (m): Mission => ({
      id: m.mission_id,
      name: m.mission_name,
      description: m.description ?? '',
      image_url: m.image_url ?? '',
      completed_at: m.completed_at ?? '',
      type: m.type as MissionType, // ✅ 필요 시 임시 처리 or mission에서 type join 필요
      target_count: m.target_count,
      current_progress: m.progress_count,
      reward_point: m.reward_point,
      is_completed: m.status !== 'INP', // ✅ 핵심!
      status: m.status,
    }),
  );
};
