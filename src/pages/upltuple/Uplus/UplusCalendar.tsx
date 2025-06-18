import { useEffect, useState } from 'react';
import { BaseCalendar } from '@/components/Calendar/BaseCalendar';
import { format, isSameDay } from 'date-fns';
import { getMonthlyBenefits } from '@/apis/uplus/benefit';
import { Benefit } from '@/types/uplus';
import { getBrandDotColor } from '@/utils/brandColor';

export const UplusCalendar = () => {
  const [benefits, setBenefits] = useState<Benefit[] | null>(null);
  const [month, setMonth] = useState(new Date());

  useEffect(() => {
    getMonthlyBenefits()
      .then((data) => {
        console.log('✅ 응답 성공:', data);
        setBenefits(data);
      })
      .catch((err) => {
        console.error('❌ 유플 혜택 조회 실패:', err.response?.data || err.message);
      });
  }, []);

  if (!benefits) {
    return <p className="text-sm text-gray-400">혜택 불러오는 중...</p>;
  }

  return (
    <BaseCalendar
      currentMonth={month}
      onMonthChange={setMonth}
      renderDay={(date, isCurrentMonth) => {
        // 해당 날짜의 모든 혜택 찾기
        const dayBenefits = benefits.filter((benefit) => isSameDay(new Date(benefit.date), date));

        return (
          <div className="flex flex-col items-center justify-center h-full relative">
            <span className="relative z-10">{format(date, 'd')}</span>

            {/* 혜택이 있는 날짜에 작은 점들 표시 */}
            {dayBenefits.length > 0 && isCurrentMonth && (
              <div className="absolute bottom-1 flex gap-0.5 justify-center">
                {dayBenefits.slice(0, 3).map((benefit, index) => (
                  <div
                    key={`${benefit.brand}-${index}`}
                    className={`w-1.5 h-1.5 ${getBrandDotColor(benefit.brand)} rounded-full`}
                    title={benefit.brand}
                  />
                ))}
                {/* 3개 이상의 혜택이 있으면 +표시 */}
                {dayBenefits.length > 3 && (
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full flex items-center justify-center">
                    <span className="text-[4px] text-white font-bold leading-none">+</span>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      }}
    />
  );
};
