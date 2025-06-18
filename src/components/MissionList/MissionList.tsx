// // MissionList.tsx
// import * as React from 'react';
// import { cn } from '@/lib/utils';
// import { Progress } from '@/components/Progress';
// import {
//   missionListVariants,
//   missionItemVariants,
//   missionIconVariants,
// } from './missionListVariants';
// import type { MissionListProps, Mission } from './MissionList.types';
// import { VariantProps } from 'class-variance-authority';

// interface MissionItemProps {
//   mission: Mission;
//   onClick?: (mission: Mission) => void;
//   iconSize?: VariantProps<typeof missionIconVariants>['size'];
//   interactive?: boolean;
// }

// const MissionItem = React.memo(
//   ({ mission, onClick, iconSize = 'default', interactive = false }: MissionItemProps) => {
//     const handleClick = () => {
//       if (interactive && onClick) {
//         onClick(mission);
//       }
//     };

//     const renderIcon = () => {
//       if (React.isValidElement(mission.icon)) {
//         return <div className={cn(missionIconVariants({ size: iconSize }))}>{mission.icon}</div>;
//       }

//       if (typeof mission.icon === 'string') {
//         return (
//           <div className={cn(missionIconVariants({ size: iconSize }))}>
//             <img
//               src={mission.icon}
//               alt={`${mission.title} icon`}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         );
//       }

//       return <div className={cn(missionIconVariants({ size: iconSize }))} />;
//     };

//     return (
//       <div
//         className={cn(
//           missionItemVariants({
//             interactive,
//             completed: mission.isCompleted,
//           }),
//         )}
//         onClick={handleClick}
//       >
//         {renderIcon()}

//         <div className="flex-1 min-w-0 space-y-2">
//           <div className="space-y-1">
//             <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm leading-5">
//               {mission.title}
//             </h3>
//             {mission.description && (
//               <p className="text-xs text-gray-500 dark:text-gray-400 leading-4">
//                 {mission.description}
//               </p>
//             )}
//           </div>

//           {mission.hasProgress && mission.current !== undefined && mission.total !== undefined && (
//             <div className="space-y-1">
//               <Progress
//                 variant="mission"
//                 size="default"
//                 current={mission.current}
//                 total={mission.total}
//                 className="h-2"
//               />
//               <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
//                 <span>
//                   {mission.current}/{mission.total}
//                 </span>
//                 <span>{Math.round((mission.current / mission.total) * 100)}%</span>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="flex flex-col items-center gap-1 flex-shrink-0">
//           <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
//             {mission.reward}P
//           </span>
//           <span className="text-xs text-gray-500 dark:text-gray-400">받기</span>
//         </div>
//       </div>
//     );
//   },
// );

// MissionItem.displayName = 'MissionItem';

// export function MissionList({
//   missions,
//   className,
//   onMissionClick,
//   variant = 'default',
//   spacing = 'normal',
//   iconSize = 'default',
//   interactive = false,
//   ...props
// }: MissionListProps &
//   VariantProps<typeof missionListVariants> & {
//     iconSize?: VariantProps<typeof missionIconVariants>['size'];
//     interactive?: boolean;
//   }) {
//   if (!missions.length) {
//     return (
//       <div className={cn(missionListVariants({ variant, spacing }), className)} {...props}>
//         <div className="text-center py-8">
//           <p className="text-gray-500 dark:text-gray-400 text-sm">진행 중인 미션이 없습니다</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={cn(missionListVariants({ variant, spacing }), className)} {...props}>
//       {missions.map((mission, index) => (
//         <MissionItem
//           key={mission.id || index}
//           mission={mission}
//           onClick={onMissionClick}
//           iconSize={iconSize}
//           interactive={interactive}
//         />
//       ))}
//     </div>
//   );
// }

// MissionList.tsx
// import * as React from 'react';
// import { cn } from '@/lib/utils';
// import { Progress } from '@/components/Progress';
// import {
//   missionListVariants,
//   missionItemVariants,
//   missionIconVariants,
//   missionTypeTagVariants,
// } from './missionListVariants';
// import type { MissionListProps, Mission } from './MissionList.types';
// import { MISSION_TYPE_CONFIG } from './MissionList.types';
// import { VariantProps } from 'class-variance-authority';

// interface MissionItemProps {
//   mission: Mission;
//   onClick?: (mission: Mission) => void;
//   iconSize?: VariantProps<typeof missionIconVariants>['size'];
//   interactive?: boolean;
//   showTypeTag?: boolean;
// }

// const MissionItem = React.memo(
//   ({
//     mission,
//     onClick,
//     iconSize = 'default',
//     interactive = false,
//     showTypeTag = false,
//   }: MissionItemProps) => {
//     const handleClick = () => {
//       if (interactive && onClick) {
//         onClick(mission);
//       }
//     };

//     const typeConfig = MISSION_TYPE_CONFIG[mission.type];
//     const hasProgress = mission.target_count > 0;
//     const currentProgress = mission.current_progress || 0;
//     const isCompleted = mission.is_completed || currentProgress >= mission.target_count;

//     return (
//       <div
//         className={cn(
//           missionItemVariants({
//             interactive,
//             completed: isCompleted,
//           }),
//         )}
//         onClick={handleClick}
//       >
//         {/* 미션 아이콘 */}
//         <div className={cn(missionIconVariants({ size: iconSize, type: mission.type }))}>
//           {mission.image_url ? (
//             <img
//               src={mission.image_url}
//               alt={`${mission.name} 아이콘`}
//               className="w-full h-full object-cover"
//               onError={(e) => {
//                 // 이미지 로드 실패 시 폴백
//                 const target = e.target as HTMLImageElement;
//                 target.style.display = 'none';
//                 const parent = target.parentElement;
//                 if (parent) {
//                   parent.innerHTML = `<span class="text-lg">${typeConfig.icon}</span>`;
//                 }
//               }}
//             />
//           ) : (
//             <span className="text-lg">{typeConfig.icon}</span>
//           )}

//           {/* 완료 상태 오버레이 */}
//           {isCompleted && (
//             <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
//               <span className="text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
//             </div>
//           )}
//         </div>

//         <div className="flex-1 min-w-0 space-y-2">
//           {/* 미션 제목과 타입 태그 */}
//           <div className="flex items-start justify-between gap-2">
//             <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm leading-5 flex-1">
//               {mission.name}
//             </h3>
//             {showTypeTag && (
//               <div className={cn(missionTypeTagVariants({ type: mission.type }))}>
//                 {typeConfig.label}
//               </div>
//             )}
//           </div>

//           {/* 미션 설명 */}
//           {mission.description && (
//             <p className="text-xs text-gray-500 dark:text-gray-400 leading-4 line-clamp-2">
//               {mission.description}
//             </p>
//           )}

//           {/* 진행률 */}
//           {hasProgress && (
//             <div className="space-y-1">
//               <Progress
//                 variant="mission"
//                 size="default"
//                 current={currentProgress}
//                 total={mission.target_count}
//                 className="h-2"
//               />
//               <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
//                 <span>
//                   {currentProgress}/{mission.target_count}
//                 </span>
//                 <span>{Math.round((currentProgress / mission.target_count) * 100)}%</span>
//               </div>
//             </div>
//           )}

//           {/* 완료 일자 */}
//           <div className="flex justify-between items-center text-xs text-gray-400 dark:text-gray-500">
//             <span>완료 기한: {new Date(mission.completed_at).toLocaleDateString('ko-KR')}</span>
//             {isCompleted && (
//               <span className="text-green-600 dark:text-green-400 font-medium">완료됨</span>
//             )}
//           </div>
//         </div>

//         {/* 보상 포인트 */}
//         <div className="flex flex-col items-center gap-1 flex-shrink-0">
//           <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
//             {mission.reward_point.toLocaleString()}P
//           </span>
//           <span
//             className={cn(
//               'text-xs px-2 py-1 rounded-full',
//               isCompleted
//                 ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
//                 : 'text-gray-500 dark:text-gray-400',
//             )}
//           >
//             {isCompleted ? '완료' : '받기'}
//           </span>
//         </div>
//       </div>
//     );
//   },
// );

// MissionItem.displayName = 'MissionItem';

// export function MissionList({
//   missions,
//   className,
//   onMissionClick,
//   variant = 'default',
//   spacing = 'normal',
//   iconSize = 'default',
//   interactive = false,
//   showTypeTag = false,
//   ...props
// }: MissionListProps &
//   VariantProps<typeof missionListVariants> & {
//     iconSize?: VariantProps<typeof missionIconVariants>['size'];
//     interactive?: boolean;
//     showTypeTag?: boolean;
//   }) {
//   if (!missions.length) {
//     return (
//       <div className={cn(missionListVariants({ variant, spacing }), className)} {...props}>
//         <div className="text-center py-8">
//           <div className="text-4xl mb-2">🎯</div>
//           <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">
//             진행 중인 미션이 없습니다
//           </p>
//           <p className="text-gray-400 dark:text-gray-500 text-xs">
//             새로운 미션이 곧 추가될 예정이에요
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // 미션을 완료 여부와 타입별로 정렬
//   const sortedMissions = [...missions].sort((a, b) => {
//     const aCompleted = a.is_completed || (a.current_progress || 0) >= a.target_count;
//     const bCompleted = b.is_completed || (b.current_progress || 0) >= b.target_count;

//     // 완료되지 않은 미션을 먼저 표시
//     if (aCompleted !== bCompleted) {
//       return aCompleted ? 1 : -1;
//     }

//     // 같은 완료 상태라면 타입별로 정렬
//     return a.type.localeCompare(b.type);
//   });

//   return (
//     <div className={cn(missionListVariants({ variant, spacing }), className)} {...props}>
//       {sortedMissions.map((mission) => (
//         <MissionItem
//           key={mission.id}
//           mission={mission}
//           onClick={onMissionClick}
//           iconSize={iconSize}
//           interactive={interactive}
//           showTypeTag={showTypeTag}
//         />
//       ))}
//     </div>
//   );
// }

// MissionList.tsx
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

// MissionList.tsx에서 미션 아이템 부분 수정
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
          missionItemVariants({
            interactive,
            completed: isCompleted,
          }),
        )}
        onClick={handleClick}
      >
        {/* 미션 아이콘 */}
        <div className={cn(missionIconVariants({ size: iconSize, type: mission.type }))}>
          {mission.image_url ? (
            <img
              src={mission.image_url}
              alt={`${mission.name} 아이콘`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<span class="text-lg">${typeConfig.icon}</span>`;
                }
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
          {/* 미션 제목과 타입 태그 */}
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

          {/* 미션 설명 */}
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
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {Math.round((currentProgress / mission.target_count) * 100)}%
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 보상 포인트 */}
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
      <div className={cn(missionListVariants({ variant, spacing }), className)} {...props}>
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

  // 미션을 완료 여부별로 정렬 (완료되지 않은 미션을 먼저 표시)
  const sortedMissions = [...missions].sort((a, b) => {
    const aCompleted = a.is_completed || (a.current_progress || 0) >= a.target_count;
    const bCompleted = b.is_completed || (b.current_progress || 0) >= b.target_count;

    if (aCompleted !== bCompleted) {
      return aCompleted ? 1 : -1;
    }

    // 같은 완료 상태라면 보상 포인트 순으로 정렬 (높은 순)
    return b.reward_point - a.reward_point;
  });

  return (
    <div className={cn(missionListVariants({ variant, spacing }), className)} {...props}>
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
