import { useQuery } from '@tanstack/react-query';
import { getUserMissions } from '@/apis/mission/getUserMissions';
import { receiveMissionReward } from '@/apis/mission/receiveMissionReward';
import { toast } from 'sonner';

export const useMissions = () => {
  return useQuery({
    queryKey: ['missions', 'me'],
    queryFn: getUserMissions,
  });
};

export const useMissionActions = () => {
  const receiveReward = async (missionId: number) => {
    try {
      const result = await receiveMissionReward(missionId);
      toast.success(result.message ?? '보상을 수령했어요!');

      // 미션 리스트 리패치 필요 (상태 COM → REC 변경)
    } catch (e: unknown) {
      if (
        typeof e === 'object' &&
        e !== null &&
        'response' in e &&
        typeof (e as { response?: { data?: { message?: string } } }).response?.data?.message ===
          'string'
      ) {
        toast.error((e as { response: { data: { message: string } } }).response.data.message);
      } else {
        toast.error('보상 수령에 실패했어요');
      }
    }
  };

  return { receiveReward };
};
