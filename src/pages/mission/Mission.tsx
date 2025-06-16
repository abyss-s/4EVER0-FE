import React from 'react';
import { useAttendance } from '@/hooks/useAttendance';
import { Banner } from '@/components/Banner';
import { Button } from '@/components/Button';
import { IMAGES } from '@/constant/imagePath';

const Mission: React.FC = () => {
  const { attendance, checkAttendance, isChecking, userName } = useAttendance();

  const isChecked = attendance?.checked ?? false;

  return (
    <div className="p-4">
      <Banner
        variant="primary"
        size="sm"
        title={`🐙 ${userName}님`}
        description={
          isChecked
            ? '오늘 이미 출석하셨어요! 내일 또 만나요 😊'
            : '아직 출석 안하셨네요? 오늘도 출석체크를 해주세요!'
        }
        image={IMAGES.MOONER['mooner-game']}
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
        className="mb-8"
      />
    </div>
  );
};

export default Mission;
