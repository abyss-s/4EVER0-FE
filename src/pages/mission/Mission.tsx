import { TossTabs } from '@/components/Tabs/TabsTossStyle';
import { AttendanceBanner } from './Attendance/AttendanceBanner';
import { AttendanceCalendar } from './Attendance/AttendanceCalendar';
import { MissionList } from '@/components/MissionList/MissionList';
import { UplusCalendar } from './Uplus/UplusCalendar';
import { UplusBenefitPreview } from './Uplus/UplusBenefitPreview';
import { useState } from 'react';
import { UplusBanner } from './Uplus/UplusBanner';
import { MissionBanner } from './Mission/MissionBanner';

const TABS = ['출석', '유플투쁠', '미션'];

const MissionPage = () => {
  const [selectedTab, setSelectedTab] = useState('출석');

  return (
    <div className="p-4 pt-1">
      <TossTabs tabs={TABS} defaultTab="출석" onChange={setSelectedTab} />

      <div className="mt-6">
        {selectedTab === '출석' && (
          <>
            <AttendanceBanner />
            <AttendanceCalendar />
          </>
        )}

        {selectedTab === '유플투쁠' && (
          <>
            <UplusBanner />
            <UplusCalendar />
            <UplusBenefitPreview />
          </>
        )}

        {selectedTab === '미션' && (
          <>
            <MissionBanner />
            <h1 className="text-xl font-bold text-brand-darkblue mb-4">진행 중인 미션</h1>
            <MissionList />
          </>
        )}
      </div>
    </div>
  );
};

export default MissionPage;
