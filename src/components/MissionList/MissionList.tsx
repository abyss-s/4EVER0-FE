import { useMissions } from '@/hooks/useMissions';
import { Progress } from '@/components/Progress';
import { Button } from '@/components/ui/button';
import type { Mission } from '@/types/mission';
import { cn } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { receiveMissionReward } from '@/apis/mission/receiveMissionReward';
import { toast } from 'sonner';

interface MissionItemProps {
  mission: Mission;
}

const MissionItem = ({ mission }: MissionItemProps) => {
  const current = mission.current_progress ?? 0;
  const queryClient = useQueryClient();

  // ✅ 보상 수령 뮤테이션
  const { mutate: claimReward, isPending } = useMutation({
    mutationFn: () => receiveMissionReward(mission.id),
    onSuccess: (data) => {
      toast.success(data.message ?? '보상 수령 완료!');
      queryClient.invalidateQueries({ queryKey: ['missions'] }); // 미션 상태 최신화
    },
    onError: (err) => {
      toast.error('보상 수령에 실패했어요.');
      console.error(err);
    },
  });

  return (
    <div className="rounded-xl shadow-sm bg-white dark:bg-gray-900 px-4 py-3 flex flex-col gap-2 w-full">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-lg">
          🧩
        </div>

        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
            {mission.name}
          </h3>

          {mission.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {mission.description}
            </p>
          )}

          <div className="mt-1">
            <Progress current={current} total={mission.target_count} className="h-2" />
            <div className="flex justify-between text-[11px] text-gray-500 mt-1">
              <span>
                {current}/{mission.target_count}
              </span>
              <span>
                {mission.target_count > 0
                  ? `${Math.round((current / mission.target_count) * 100)}%`
                  : '0%'}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-2">
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {mission.reward_point.toLocaleString()}P
            </span>
            <Button
              size="sm"
              variant={
                mission.status === 'COM'
                  ? 'default'
                  : mission.status === 'INP'
                    ? 'outline'
                    : 'secondary'
              }
              className={cn(
                'h-6 px-3 text-xs rounded-full',
                mission.status === 'COM'
                  ? 'cursor-pointer hover:opacity-90 hover:scale-105'
                  : 'cursor-default',
              )}
              disabled={mission.status !== 'COM' || isPending}
              onClick={() => {
                if (mission.status === 'COM') {
                  console.log(`보상 수령! missionId: ${mission.id}`);
                  // 보상 수령 API 연동
                  claimReward();
                }
              }}
            >
              {mission.status === 'COM'
                ? isPending
                  ? '수령 중...'
                  : '🪙 수령하기'
                : mission.status === 'REC'
                  ? '이미 수령'
                  : '진행 중'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MissionList = () => {
  const { data: missions, isLoading } = useMissions();

  if (isLoading) {
    return (
      <div className="text-sm text-gray-500 text-center py-10">미션을 불러오는 중입니다...</div>
    );
  }

  if (!missions || missions.length === 0) {
    return (
      <div className="text-sm text-gray-500 text-center py-10">
        🎯 진행 중인 미션이 없습니다.
        <br />
        새로운 미션이 곧 추가될 예정이에요!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {missions.map((mission) => (
        <MissionItem key={mission.id} mission={mission} />
      ))}
    </div>
  );
};
