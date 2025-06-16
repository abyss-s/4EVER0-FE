// 	전체 통합 페이지
import { useEffect, useState } from 'react';
import { format, isSameDay } from 'date-fns';
import { BaseCalendar } from '@/components/Calendar/BaseCalendar';
import axios from 'axios';

interface Benefit {
  date: string; // yyyy-MM-dd
  brand: string;
  logoUrl: string;
  description: string;
}

export const UplusCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [benefits, setBenefits] = useState<Benefit[]>([]);

  // 월별 혜택 데이터 불러오기
  useEffect(() => {
    axios
      .get<Benefit[]>(`/api/uplus-benefits`) // 이번 달 전체 조회
      .then((res) => setBenefits(res.data))
      .catch((err) => console.error('유플투쁠 혜택 불러오기 실패:', err));
  }, []);

  // 날짜별 혜택 찾기
  const getBenefitByDate = (date: Date) =>
    benefits.find((benefit) => isSameDay(new Date(benefit.date), date));

  return (
    <div className="w-full">
      <BaseCalendar
        currentMonth={currentMonth}
        onMonthChange={setCurrentMonth}
        renderDay={(date) => {
          const benefit = getBenefitByDate(date);
          return (
            <div className="flex flex-col items-center justify-center">
              <span className="text-sm">{format(date, 'd')}</span>
              {benefit && (
                <img
                  src={benefit.logoUrl}
                  alt={benefit.brand}
                  className="w-6 h-6 mt-1 object-contain rounded"
                />
              )}
            </div>
          );
        }}
      />
    </div>
  );
};
