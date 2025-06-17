// pages/mission/Mission.tsx
import React from 'react';
import { AttendanceBanner } from './Attendance';
import { AttendanceCalendar } from './Attendance/AttendanceCalendar';
import { useNavigate } from 'react-router-dom';

const Mission: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="p-4">
      <AttendanceBanner />
      <div className="flex items-center justify-between mb-4 mt-6">
        <h2 className="text-[20px] leading-[20px] tracking-[0px] font-bold text-gray-900">
          출석 스탬프 북
        </h2>
        <button
          onClick={() => navigate('/upltuple')}
          className="text-sm text-[#DD4640] font-medium hover:underline"
        >
          유플투쁠 혜택 더 자세히 보기 &gt;
        </button>
      </div>
      <AttendanceCalendar />
    </div>
  );
};

export default Mission;
