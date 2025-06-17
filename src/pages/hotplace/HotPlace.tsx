import { useEffect, useState } from 'react';
import NaverMap from '@/components/NaverMap/NaverMap';
import { getTopCoupons, TopCoupon } from '@/apis/coupon/getTopCoupons';
import TopCouponCard from '@/components/Card/TopCouponCard';

const HotPlace = () => {
  const [bestDeals, setBestDeals] = useState<TopCoupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const result = await getTopCoupons();
        setBestDeals(result);
      } catch (error) {
        console.error('🔥 쿠폰 API 호출 실패:', error);
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
    <div className="max-w-md mx-auto bg-pink-50 min-h-screen">
      {/* 상단 지도 영역 */}
      <div className="relative p-12">
        <div className="flex justify-center m-4">
          <div className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm">
            ⭐ 요즘 핫한 MZ들의 PICK은?!
          </div>
        </div>

        <div className="relative h-[340px] rounded-xl overflow-hidden border-4 border-yellow-400">
          <NaverMap />

          <div className="absolute right-4 top-4 space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-yellow-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                9
              </div>
              <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded">📃 쿠폰</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                3
              </div>
              <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded">📌 핫플</span>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-white">👤</span>
          </div>
        </div>
      </div>

      {/* 인기 쿠폰 TOP 3 */}
      <div className="px-4">
        <div className="flex justify-center mb-4">
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
