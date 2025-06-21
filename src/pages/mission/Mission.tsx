// pages/mission/Mission.tsx
import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AttendanceBanner } from './Attendance';
import { AttendanceCalendar } from './Attendance/AttendanceCalendar';
import { MissionList } from '@/components/MissionList/MissionList';

const MissionPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const missionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scrollTarget = location.state?.scrollTo;

    if (scrollTarget === 'mission-list' && missionRef.current) {
      setTimeout(() => {
        missionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="p-4">
      <AttendanceBanner />

      <div className="flex items-center justify-between mt-6 mb-4">
        <h1 className="text-xl font-bold text-brand-darkblue mb-2">출석 스탬프 북</h1>
        <button
          onClick={() => navigate('/upltuple')}
          className="text-sm text-[#DD4640] font-medium hover:underline"
        >
          유플투쁠 혜택 더 자세히 보기 &gt;
        </button>
      </div>

      <AttendanceCalendar />

      <div ref={missionRef} className="mt-10">
        <h1 className="text-xl font-bold text-brand-darkblue mb-4">진행 중인 미션</h1>
        <MissionList />
      </div>
    </div>
  );
};

export default MissionPage;
