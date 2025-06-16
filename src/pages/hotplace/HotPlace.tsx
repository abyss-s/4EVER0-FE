import { useEffect, useState } from 'react';
import NaverMap from '@/components/NaverMap/NaverMap';
import { getTopCoupons, TopCoupon } from '@/apis/coupon/getTopCoupons';

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

  const getBadgeColor = (brand: string) => {
    if (brand.includes('넷플릭스') || brand.includes('왓챠')) return 'bg-indigo-500';
    if (brand.includes('예스24') || brand.includes('리디')) return 'bg-green-500';
    return 'bg-red-500';
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

      {/* BEST 혜택 3위 */}
      <div className="px-4">
        <div className="flex justify-center mb-4">
          <div className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm">
            ⭐ BEST 혜택 3위
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((index) => {
            const deal = bestDeals[index];
            const showSkeleton = isLoading || !deal;

            return (
              <div key={index} className="bg-white rounded-xl shadow-md p-2 relative">
                {/* 순위 배지 */}
                <div
                  className={`absolute -top-2 -left-2 w-8 h-8 rounded-full text-white text-sm flex items-center justify-center font-bold z-10 ${
                    index === 0 ? 'bg-red-500' : index === 1 ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}
                >
                  {index + 1}위
                </div>

                {/* 이미지 */}
                <img
                  src={`/images/deal-${index + 1}.png`}
                  alt="deal"
                  className="w-full h-24 object-cover rounded-md mb-2"
                />

                {showSkeleton ? (
                  <>
                    <div className="h-[2rem] mb-2 bg-gray-100 rounded-sm animate-pulse" />
                    <div className="h-[1rem] bg-gray-100 rounded-sm animate-pulse" />
                    <div className="flex justify-between text-xs mt-2">
                      <span className="w-1/2 h-3 bg-gray-200 rounded animate-pulse" />
                      <span className="w-1/3 h-3 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="font-bold text-xs mb-1 line-clamp-2">{deal.title}</h3>
                    <p className="text-gray-600 text-xs mb-2 line-clamp-2">{deal.description}</p>
                    <div className="flex justify-between text-xs">
                      <span className="text-red-500 font-bold">{getDiscountLabel(deal)}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-white ${getBadgeColor(deal.brand)}`}
                      >
                        {deal.brand}
                      </span>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HotPlace;
