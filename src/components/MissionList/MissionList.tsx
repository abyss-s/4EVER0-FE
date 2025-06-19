import * as React from 'react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/Progress';
import {
  missionListVariants,
  missionItemVariants,
  missionIconVariants,
  missionTypeTagVariants,
} from './missionListVariants';
import type { MissionListProps, Mission } from './MissionList.types';
import { MISSION_TYPE_CONFIG } from './MissionList.types';
import { VariantProps } from 'class-variance-authority';

interface MissionItemProps {
  mission: Mission;
  onClick?: (mission: Mission) => void;
  iconSize?: VariantProps<typeof missionIconVariants>['size'];
  interactive?: boolean;
  showTypeTag?: boolean;
}

const MissionItem = React.memo(
  ({
    mission,
    onClick,
    iconSize = 'default',
    interactive = false,
    showTypeTag = false,
  }: MissionItemProps) => {
    const handleClick = () => {
      if (interactive && onClick) {
        onClick(mission);
      }
    };

    const typeConfig = MISSION_TYPE_CONFIG[mission.type];
    const hasProgress = mission.target_count > 0;
    const currentProgress = mission.current_progress || 0;
    const isCompleted = mission.is_completed || currentProgress >= mission.target_count;

    return (
      <div
        className={cn(
          'relative', // ✅ 겹침 방지용
          missionItemVariants({ interactive, completed: isCompleted }),
        )}
        onClick={handleClick}
      >
        {/* 아이콘 */}
        <div className={cn(missionIconVariants({ size: iconSize, type: mission.type }))}>
          {mission.image_url ? (
            <img
              src={mission.image_url}
              alt={`${mission.name} 아이콘`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <span className="text-lg">{typeConfig.icon}</span>
          )}
          {isCompleted && (
            <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
              <span className="text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 space-y-3">
          {/* 제목 + 타입 태그 */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base leading-6 flex-1">
              {mission.name}
            </h3>
            {showTypeTag && (
              <div className={cn(missionTypeTagVariants({ type: mission.type }))}>
                {typeConfig.label}
              </div>
            )}
          </div>

          {/* 설명 */}
          {mission.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-5 mb-3">
              {mission.description}
            </p>
          )}

          {/* 진행률 */}
          {hasProgress && (
            <div className="space-y-2">
              <Progress
                variant="mission"
                size="lg"
                current={currentProgress}
                total={mission.target_count}
                className="h-2"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {currentProgress}/{mission.target_count}
                </span>
                <span
                  className={cn(
                    'text-sm font-medium',
                    currentProgress === 0
                      ? 'text-gray-400 dark:text-gray-500'
                      : 'text-gray-700 dark:text-gray-300',
                  )}
                >
                  {currentProgress === 0
                    ? '진행 전'
                    : `${Math.round((currentProgress / mission.target_count) * 100)}%`}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 보상 */}
        <div className="flex flex-col items-center gap-2 flex-shrink-0 ml-4 mt-1">
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {mission.reward_point.toLocaleString()}P
          </span>
          <span
            className={cn(
              'text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap',
              isCompleted
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
            )}
          >
            {isCompleted ? '완료' : '받기'}
          </span>
        </div>
      </div>
    );
  },
);

MissionItem.displayName = 'MissionItem';

export function MissionList({
  missions,
  className,
  onMissionClick,
  variant = 'default',
  spacing = 'normal',
  iconSize = 'default',
  interactive = false,
  showTypeTag = false,
  ...props
}: MissionListProps &
  VariantProps<typeof missionListVariants> & {
    iconSize?: VariantProps<typeof missionIconVariants>['size'];
    interactive?: boolean;
    showTypeTag?: boolean;
  }) {
  if (!missions.length) {
    return (
      <div
        className={cn('relative', missionListVariants({ variant, spacing }), className)}
        {...props}
      >
        <div className="text-center py-12">
          <div className="text-5xl mb-3">🎯</div>
          <p className="text-gray-500 dark:text-gray-400 text-base font-medium mb-2">
            진행 중인 미션이 없습니다
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            새로운 미션이 곧 추가될 예정이에요
          </p>
        </div>
      </div>
    );
  }

  const sortedMissions = [...missions].sort((a, b) => {
    const aCompleted = a.is_completed || (a.current_progress || 0) >= a.target_count;
    const bCompleted = b.is_completed || (b.current_progress || 0) >= b.target_count;
    return aCompleted !== bCompleted ? (aCompleted ? 1 : -1) : b.reward_point - a.reward_point;
  });

  return (
    <div
      className={cn(
        'space-y-4', // ✅ 아이템 간 여백 확보
        missionListVariants({ variant, spacing }),
        className,
      )}
      {...props}
    >
      {sortedMissions.map((mission) => (
        <MissionItem
          key={mission.id}
          mission={mission}
          onClick={onMissionClick}
          iconSize={iconSize}
          interactive={interactive}
          showTypeTag={showTypeTag}
        />
      ))}
    </div>
  );
}
