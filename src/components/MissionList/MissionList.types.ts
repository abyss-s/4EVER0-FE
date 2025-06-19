import type { Mission } from '@/types/mission';

export interface MissionListProps {
  missions: Mission[];
  className?: string;
  onMissionClick?: (mission: Mission) => void;
}

// 미션 타입별 설정
export const MISSION_TYPE_CONFIG = {
  SHARE: {
    label: '공유',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    icon: '📤',
  },
  ATTENDANCE: {
    label: '출석',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    icon: '📅',
  },
  INVITE: {
    label: '초대',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    icon: '👥',
  },
} as const;
