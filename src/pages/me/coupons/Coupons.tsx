import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { CouponTicket } from './CouponTicket';
import { getTicketBackground } from '@/utils/getTicketBackground';
import { fetchUserCoupons } from '@/apis/coupon/getUserCoupons';
import type { Coupon } from '@/types/coupon';
import { Ticket } from 'lucide-react';

const formatDiscount = (value?: number, type?: string) => {
  if (!value || !type) return '';
  return type === 'PERCENT' ? `${value}% 할인` : `${value.toLocaleString()}원 할인`;
};

const Coupons: React.FC = () => {
  const { data: coupons = [], isLoading } = useQuery<Coupon[]>({
    queryKey: ['userCoupons'],
    queryFn: fetchUserCoupons,
  });
  const colorCycle: Array<'red' | 'yellow' | 'gray'> = ['red', 'yellow', 'gray'];
  const availableCoupons = coupons.filter((c) => !c.isUsed);
  if (isLoading) return <div className="p-4">로딩 중...</div>;
  console.log('쿠폰 데이터:', coupons);
  console.log('쿠폰 구조 예시', coupons[0]);

  console.log(
    '쿠폰 ID 목록:',
    coupons.map((c) => c.couponId),
  );

  console.log(
    coupons.map((c) => ({
      id: c.couponId,
      brand: c.brand.name,
      image: c.brand.imageUrl,
    })),
  );
  return (
    <div className="px-4 py-6 pb-24">
      <div className="text-center mb-6">
        <div className="text-center flex flex-col items-center gap-1">
          <Ticket className="w-5 h-5 text-yellow-600" />
          <div className="text-3xl font-bold">{availableCoupons.length}개</div>
          <div className="text-sm text-gray-500">보유 쿠폰</div>
        </div>
      </div>

      {coupons
        .filter((coupon) => !coupon.isUsed)
        .map((coupon, index) => (
          <CouponTicket
            key={coupon.couponId}
            brand={coupon.brand.name}
            title={coupon.title}
            description={formatDiscount(coupon.discount_value, coupon.discount_type)}
            background={getTicketBackground(colorCycle[index % colorCycle.length])}
            logoUrl={coupon.brand.imageUrl}
          />
        ))}
    </div>
  );
};

export default Coupons;
