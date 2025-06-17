import { useEffect, useState } from 'react';
import { BaseCalendar } from '@/components/Calendar/BaseCalendar';
import { format, isSameDay } from 'date-fns';
import { getMonthlyBenefits } from '@/apis/uplus/benefit';
import { Benefit } from '@/types/uplus';

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
    return <p className="text-sm text-gray-400">혜택 불러오는 중...</p>; // ✅ 로딩 중 메시지
  }

  return (
    <BaseCalendar
      currentMonth={month}
      onMonthChange={setMonth}
      renderDay={(date, isCurrentMonth) => {
        const b = benefits.find((b) => isSameDay(new Date(b.date), date));
        return (
          <div className="flex flex-col items-center justify-center">
            <span>{format(date, 'd')}</span>
            {b && isCurrentMonth && (
              <div className="text-[10px] text-pink-600 font-medium truncate mt-1">
                🎁 {b.brand}
              </div>
            )}
          </div>
        );
      }}
    />
  );
};
