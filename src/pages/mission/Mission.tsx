// pages/mission/Mission.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AttendanceBanner } from './Attendance';
import { AttendanceCalendar } from './Attendance/AttendanceCalendar';
import { MissionList } from '@/components/MissionList/MissionList';
import type { Mission } from '@/components/MissionList/MissionList.types';

const dummyMissions: Mission[] = [
  {
    id: 1,
    name: '친구 초대하기',
    description: '친구를 초대하면 포인트가 팡팡!',
    type: 'INVITE',
    target_count: 5,
    reward_point: 1000,
    completed_at: '2025-06-30',
    image_url: '',
    current_progress: 2,
    is_completed: false,
  },
  {
    id: 2,
    name: '출석 10일 달성',
    description: '연속 출석으로 보상 받아가세요',
    type: 'ATTENDANCE',
    target_count: 10,
    reward_point: 500,
    completed_at: '2025-06-30',
    image_url: '',
    current_progress: 10,
    is_completed: true,
  },
];

const MissionPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <AttendanceBanner />

      <div className="flex items-center justify-between mb-4 mt-6">
        <h2 className="text-[20px] font-bold text-gray-900">출석 스탬프 북</h2>
        <button
          onClick={() => navigate('/upltuple')}
          className="text-sm text-[#DD4640] font-medium hover:underline"
        >
          유플투쁠 혜택 더 자세히 보기 &gt;
        </button>
      </div>

      <AttendanceCalendar />

      <div className="mt-10">
        <h2 className="text-lg font-bold text-gray-900 mb-4">진행 중인 미션</h2>
        <MissionList
          missions={dummyMissions}
          showTypeTag
          interactive
          spacing="normal"
          iconSize="default"
        />
      </div>
    </div>
  );
};

export default MissionPage;
