// import * as React from 'react';
// import { cn } from '@/lib/utils';
// import { Progress } from '@/components/Progress';
// import { Button } from '@/components/ui/button';
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
//           'relative z-0 flex gap-3 items-start p-4 rounded-xl bg-white dark:bg-gray-900 shadow-sm',
//           missionItemVariants({ interactive, completed: isCompleted }),
//         )}
//         onClick={handleClick}
//       >
//         {/* 아이콘 */}
//         <div
//           className={cn(
//             missionIconVariants({ size: iconSize, type: mission.type }),
//             'p-1.5', // ✅ 패딩 줄이기
//           )}
//         >
//           {mission.image_url ? (
//             <img
//               src={mission.image_url}
//               alt={`${mission.name} 아이콘`}
//               className="w-full h-full object-cover"
//               onError={(e) => {
//                 e.currentTarget.style.display = 'none';
//               }}
//             />
//           ) : (
//             <span className="text-base">{typeConfig.icon}</span>
//           )}
//           {isCompleted && (
//             <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center z-10">
//               <span className="text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
//             </div>
//           )}
//         </div>

//         {/* 본문 */}
//         <div className="flex-1 min-w-0 space-y-2">
//           <div className="flex justify-between items-center gap-2">
//             <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
//               {mission.name}
//             </h3>
//             {showTypeTag && (
//               <div
//                 className={cn(
//                   'text-[10px] px-2 py-0.5 rounded-full',
//                   missionTypeTagVariants({ type: mission.type }),
//                 )}
//               >
//                 {typeConfig.label}
//               </div>
//             )}
//           </div>

//           {mission.description && (
//             <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
//               {mission.description}
//             </p>
//           )}

//           {hasProgress && (
//             <div className="space-y-1">
//               <Progress
//                 variant="mission"
//                 size="default"
//                 current={currentProgress}
//                 total={mission.target_count}
//                 className="h-2"
//               />
//               <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
//                 <span>
//                   {currentProgress}/{mission.target_count}
//                 </span>
//                 <span>
//                   {currentProgress === 0
//                     ? '진행 전'
//                     : `${Math.round((currentProgress / mission.target_count) * 100)}%`}
//                 </span>
//               </div>
//             </div>
//           )}

//           {/* 보상 및 버튼 */}
//           <div className="flex justify-between items-center pt-1">
//             <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
//               {mission.reward_point.toLocaleString()}P
//             </span>
//             <Button
//               size="sm"
//               variant={isCompleted ? 'secondary' : 'outline'}
//               className={cn(
//                 'rounded-full text-xs h-6 px-3 py-0.5',
//                 isCompleted
//                   ? 'text-green-600 border-green-300 dark:text-green-400 dark:border-green-600'
//                   : 'text-gray-700 dark:text-gray-300',
//               )}
//               disabled={isCompleted}
//             >
//               {isCompleted ? '완료' : '받기'}
//             </Button>
//           </div>
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
//       <div
//         className={cn('relative', missionListVariants({ variant, spacing }), className)}
//         {...props}
//       >
//         <div className="text-center py-12">
//           <div className="text-5xl mb-3">🎯</div>
//           <p className="text-gray-500 dark:text-gray-400 text-base font-medium mb-2">
//             진행 중인 미션이 없습니다
//           </p>
//           <p className="text-gray-400 dark:text-gray-500 text-sm">
//             새로운 미션이 곧 추가될 예정이에요
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const sortedMissions = [...missions].sort((a, b) => {
//     const aCompleted = a.is_completed || (a.current_progress || 0) >= a.target_count;
//     const bCompleted = b.is_completed || (b.current_progress || 0) >= b.target_count;
//     return aCompleted !== bCompleted ? (aCompleted ? 1 : -1) : b.reward_point - a.reward_point;
//   });

//   return (
//     <div
//       className={cn(
//         'space-y-4', // ✅ 겹침 방지
//         missionListVariants({ variant, spacing }),
//         className,
//       )}
//       {...props}
//     >
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

// import { useMissions } from '@/hooks/useMissions';
// import { Progress } from '@/components/Progress';
// import { Button } from '@/components/ui/button';
// import type { Mission } from './MissionList.types';
// import { MISSION_TYPE_CONFIG } from './MissionList.types';

// interface MissionItemProps {
//   mission: Mission;
// }

// const MissionItem = ({ mission }: MissionItemProps) => {
//   const typeConfig = MISSION_TYPE_CONFIG[mission.type];
//   const isCompleted = mission.is_completed || mission.current_progress >= mission.target_count;

//   return (
//     <div className="rounded-xl shadow-sm bg-white dark:bg-gray-900 px-4 py-3 flex flex-col gap-2 w-full">
//       <div className="flex items-start gap-3">
//         <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-lg">
//           {typeConfig.icon}
//         </div>

//         <div className="flex-1 min-w-0 flex flex-col gap-1">
//           <div className="flex justify-between items-start gap-2">
//             <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
//               {mission.name}
//             </h3>
//             <div className="text-[10px] px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">
//               {typeConfig.label}
//             </div>
//           </div>

//           {mission.description && (
//             <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
//               {mission.description}
//             </p>
//           )}

//           <div className="mt-1">
//             <Progress
//               current={mission.current_progress}
//               total={mission.target_count}
//               className="h-2"
//             />
//             <div className="flex justify-between text-[11px] text-gray-500 mt-1">
//               <span>
//                 {mission.current_progress}/{mission.target_count}
//               </span>
//               <span>
//                 {isCompleted
//                   ? '100%'
//                   : `${Math.round((mission.current_progress / mission.target_count) * 100)}%`}
//               </span>
//             </div>
//           </div>

//           <div className="flex justify-between items-center mt-2">
//             <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
//               {mission.reward_point.toLocaleString()}P
//             </span>
//             <Button
//               size="sm"
//               variant={isCompleted ? 'secondary' : 'outline'}
//               className="h-6 px-3 text-xs rounded-full"
//               disabled={isCompleted}
//             >
//               {isCompleted ? '완료' : '받기'}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export const MissionList = () => {
//   const { data: missions, isLoading } = useMissions();

//   if (isLoading) {
//     return (
//       <div className="text-sm text-gray-500 text-center py-10">미션을 불러오는 중입니다...</div>
//     );
//   }

//   if (!missions || missions.length === 0) {
//     return (
//       <div className="text-sm text-gray-500 text-center py-10">
//         🎯 진행 중인 미션이 없습니다.
//         <br />
//         새로운 미션이 곧 추가될 예정이에요!
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-4">
//       {missions.map((mission) => (
//         <MissionItem key={mission.id} mission={mission} />
//       ))}
//     </div>
//   );
// };

import { useMissions } from '@/hooks/useMissions';
import { Progress } from '@/components/Progress';
import { Button } from '@/components/ui/button';
import type { Mission } from '@/types/mission';
import { MISSION_TYPE_CONFIG } from './MissionList.types';

interface MissionItemProps {
  mission: Mission;
}

const MissionItem = ({ mission }: MissionItemProps) => {
  const typeConfig = MISSION_TYPE_CONFIG[mission.type];

  // ✅ 안전하게 기본값 0으로 처리
  const current = mission.current_progress ?? 0;
  const isCompleted = mission.is_completed || current >= mission.target_count;

  return (
    <div className="rounded-xl shadow-sm bg-white dark:bg-gray-900 px-4 py-3 flex flex-col gap-2 w-full">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-lg">
          {typeConfig.icon}
        </div>

        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
              {mission.name}
            </h3>
            <div className="text-[10px] px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">
              {typeConfig.label}
            </div>
          </div>

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
              variant={isCompleted ? 'secondary' : 'outline'}
              className="h-6 px-3 text-xs rounded-full"
              disabled={isCompleted}
            >
              {isCompleted ? '완료' : '받기'}
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
