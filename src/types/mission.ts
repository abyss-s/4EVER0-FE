// src/types/mission.ts

export type MissionType = 'INVITE' | 'SHARE' | 'ATTENDANCE';
export type MissionStatus = 'INP' | 'COM' | 'REC'; // 진행중, 완료, 보상받음

export interface Mission {
  id: number;
  name: string;
  description: string;
  type: MissionType;

  target_count: number;
  current_progress: number;

  reward_point: number;
  status?: MissionStatus;

  is_completed: boolean;

  image_url?: string;
  completed_at?: string;
}

export interface RawUserMission {
  id: number;
  mission_id: number;
  mission_name: string;
  progress_count: number;
  target_count: number;
  reward_point: number;
  status: 'INP' | 'COM' | 'REC';
  is_completed: boolean;
  type: MissionType;
  image_url?: string;
  description?: string;
  completed_at?: string;
}
