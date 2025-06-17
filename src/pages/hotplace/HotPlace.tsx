import { useEffect, useState } from 'react';
import { getTopCoupons, TopCoupon } from '@/apis/coupon/getTopCoupons';
import TopCouponCard from '@/components/Card/TopCouponCard';
import PopupMap from './PopupMap/PopupMap';

const HotPlace = () => {
  const [bestDeals, setBestDeals] = useState<TopCoupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const result = await getTopCoupons();
        setBestDeals(result);
      } catch (error) {
        console.error('쿠폰 API 호출 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const getDiscountLabel = (deal: TopCoupon) => {
    return deal.discountType === 'PERCENT'
      ? `${deal.discountValue}% 할인`
      : `${deal.discountValue.toLocaleString()}원 할인`;
  };

  return (
    <div>
      <div className="flex justify-center py-4">
        <div className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm">
          ⭐ 요즘 핫한 MZ들의 PICK은?!
        </div>
      </div>

      <PopupMap />

      {/* 인기 쿠폰 TOP 3 */}
      <div className="px-4">
        <div className="flex justify-center py-4">
          <div className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm">
            ⭐ 인기 쿠폰 TOP 3
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {[0, 1, 2].map((index) => (
            <TopCouponCard
              key={index}
              deal={bestDeals[index]}
              index={index}
              isLoading={isLoading}
              getDiscountLabel={getDiscountLabel}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotPlace;
