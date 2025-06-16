// pages/mission/Mission.tsx
import React from 'react';
import { AttendanceBanner } from './Attendance';

const Mission: React.FC = () => {
  return (
    <div className="p-4">
      <AttendanceBanner />
      {/* 추후에 <AttendanceCalendar /> 추가 가능 */}
    </div>
  );
};

export default Mission;
