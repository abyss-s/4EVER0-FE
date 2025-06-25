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
import { Benefit } from '@/types/uplus';
import { getMonthlyBenefits } from '@/apis/uplus/benefit';
import { SEOHelmet } from '@/seo/SEOHelmet';

const TABS = ['출석', '유플투쁠', '미션'];

const MissionPage = () => {
  const location = useLocation();
  const scrollTo = location.state?.scrollTo;
  const [selectedTab, setSelectedTab] = useState('출석');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [benefits, setBenefits] = useState<Benefit[] | null>(null);

  useEffect(() => {
    if (scrollTo === 'mission-list') {
      setSelectedTab('미션');
    } else if (scrollTo === 'attendance') {
      setSelectedTab('출석');
    } else if (scrollTo === 'uplus') {
      setSelectedTab('유플투쁠');
    }
  }, [scrollTo]);

  // 유플투쁠 탭이 선택되었을 때만 혜택 데이터 로딩
  useEffect(() => {
    if (selectedTab === '유플투쁠' && benefits === null) {
      getMonthlyBenefits()
        .then((data) => {
          console.log('✅ 응답 성공:', data);
          setBenefits(data);
        })
        .catch((err) => {
          console.error('❌ 유플 혜택 조회 실패:', err.response?.data || err.message);
        });
    }
  }, [selectedTab, benefits]);

  return (
    <div>
      <SEOHelmet
        title="미션 - MoonoZ 출석체크 및 포인트 적립"
        description="매일 출석체크하고 다양한 미션을 완료해서 포인트를 적립하세요. 무너와 함께하는 재미있는 일상!"
        keywords="미션, 출석체크, 포인트적립, 일일미션"
        url="https://4-ever-0-fe.vercel.app/mission"
      />

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

            {benefits === null ? (
              <div className="text-sm text-gray-500 text-center py-10">
                혜택을 불러오는 중입니다...
              </div>
            ) : (
              <>
                {/* 선택된 카테고리에 따라 컴포넌트에 전달 */}
                <div className="mt-4">
                  <UplusCalendar selectedCategory={selectedCategory} benefits={benefits} />
                </div>
                <div className="mt-4">
                  <UplusBenefitPreview selectedCategory={selectedCategory} benefits={benefits} />
                </div>
              </>
            )}
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
