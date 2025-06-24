import { FlatTabs } from '@/components/Tabs/FlatTabs';
import { AttendanceBanner } from './Attendance/AttendanceBanner';
import { AttendanceCalendar } from './Attendance/AttendanceCalendar';
import { MissionList } from '@/components/MissionList/MissionList';
import { UplusCalendar } from './Uplus/UplusCalendar';
import { UplusBenefitPreview } from './Uplus/UplusBenefitPreview';
import { useState, useEffect } from 'react';
import { UplusBanner } from './Uplus/UplusBanner';
import { MissionBanner } from './Mission/MissionBanner';
import { CategoryFilter } from './Uplus/CategoryFilter';
import { useLocation } from 'react-router-dom';

const TABS = ['출석', '유플투쁠', '미션'];

const MissionPage = () => {
  const location = useLocation();
  const scrollTo = location.state?.scrollTo;
  const [selectedTab, setSelectedTab] = useState('출석');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  useEffect(() => {
    if (scrollTo === 'mission-list') {
      setSelectedTab('미션');
    } else if (scrollTo === 'attendance') {
      setSelectedTab('출석');
    } else if (scrollTo === 'uplus') {
      setSelectedTab('유플투쁠');
    }
  }, [scrollTo]);
  return (
    <div>
      <FlatTabs tabs={TABS} value={selectedTab} onChange={setSelectedTab} />

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
            {/* 카테고리 필터 버튼 뷰 (공통) */}
            <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />

            {/* 선택된 카테고리에 따라 컴포넌트에 전달 */}
            <div className="mt-4">
              <UplusCalendar selectedCategory={selectedCategory} />
            </div>
            <div className="mt-4">
              <UplusBenefitPreview selectedCategory={selectedCategory} />
            </div>
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
