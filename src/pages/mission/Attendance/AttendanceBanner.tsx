// pages/mission/Attendance/AttendanceBanner.tsx
import { useAttendance } from '@/hooks/useAttendance';
import { Banner } from '@/components/Banner';
import { Button } from '@/components/Button';
import { IMAGES } from '@/constant/imagePath';

export const AttendanceBanner = () => {
  const { attendance, isManuallyChecked, checkAttendance, isChecking, userName, isLoadingToday } =
    useAttendance();

  if (isLoadingToday) {
    return <div className="mb-8 h-24 rounded-xl bg-slate-100 animate-pulse" />; // 스켈레톤 등
  }

  const isChecked = isManuallyChecked || attendance;

  return (
    <Banner
      variant="sunrise"
      size="sm"
      title={`🐙 ${userName}님`}
      description={
        isChecked
          ? '오늘 이미 출석하셨어요! \n 내일 또 만나요 😊'
          : '아직 출석 안하셨네요? \n 오늘도 출석체크를 해주세요!'
      }
      image={IMAGES.MOONER.MOONER_PENCIL}
      actionButton={
        !isChecked && (
          <Button
            variant="outline"
            size="sm"
            className="bg-white/20 border-white/30 text-white hover:bg-white/20 cursor-pointer"
            onClick={() => checkAttendance()}
            disabled={isChecking}
          >
            {isChecking ? '출석 중...' : '오늘 출석하기'}
          </Button>
        )
      }
      className="mb-8 whitespace-pre-line"
    />
  );
};
