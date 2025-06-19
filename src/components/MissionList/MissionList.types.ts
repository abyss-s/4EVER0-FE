import type { Mission } from '@/types/mission';

export interface MissionListProps {
  missions: Mission[];
  className?: string;
  onMissionClick?: (mission: Mission) => void;
}
