import { useEffect, useState } from 'react';
import { Benefit } from '@/types/uplus';
import { getMonthlyBenefits } from '@/apis/uplus/benefit';
import { Card, CardContent } from '@/components/Card';
import { calcDday } from '@/utils/calcDday';

export const UplusBenefitPreview = () => {
  const [benefits, setBenefits] = useState<Benefit[] | null>(null);

  useEffect(() => {
    getMonthlyBenefits()
      .then((data) => {
        setBenefits(data);
      })
      .catch((err) => {
        console.error('❌ 유플 혜택 조회 실패:', err);
      });
  }, []);

  if (benefits === null) {
    return <p className="text-sm text-gray-400 px-2">혜택을 불러오는 중입니다...</p>;
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {benefits.map((b) => {
        return (
          <Card
            key={`${b.brand}-${b.date}`}
            variant="ghost"
            size="sm"
            className="min-w-[100px] h-[100px] bg-pink-50"
          >
            <CardContent className="flex flex-col items-center justify-center gap-1">
              <span className="text-xs font-semibold">{calcDday(b.date ?? '')}</span>
              <span className="text-[11px] font-medium text-center truncate">{b.brand}</span>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
