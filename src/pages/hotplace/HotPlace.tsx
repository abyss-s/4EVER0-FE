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

      {/*인기 쿠폰 TOP 3*/}
      <div className="px-4">
        <div className="flex justify-center mb-4">
          <div className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm">
            ⭐ 인기 쿠폰 TOP 3
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {[0, 1, 2].map((index) => {
            const deal = bestDeals[index];
            const showSkeleton = isLoading || !deal;

            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md px-4 py-3 flex flex-row items-start gap-4 relative"
              >
                <div
                  className={`absolute -top-3 -left-3 w-10 h-10 rounded-full text-white text-sm flex items-center justify-center font-bold shadow-md ${
                    index === 0 ? 'bg-red-500' : index === 1 ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}
                >
                  {index + 1}위
                </div>

                <div className="flex flex-col items-center w-28 pt-4">
                  {showSkeleton ? (
                    <div className="w-20 h-4 bg-gray-200 mb-2 rounded animate-pulse" />
                  ) : (
                    <p className="text-sm font-bold text-center mb-2">{deal.brand}</p>
                  )}

                  <img
                    src={`/images/deal-${index + 1}.png`}
                    alt="deal"
                    className="w-full h-20 object-cover rounded-md"
                  />
                </div>

                <div className="flex-1 pt-4">
                  {showSkeleton ? (
                    <>
                      <div className="h-4 mb-2 bg-gray-200 rounded-sm animate-pulse w-3/4" />
                      <div className="h-3 mb-2 bg-gray-100 rounded-sm animate-pulse w-full" />
                      <div className="h-3 bg-gray-100 rounded-sm animate-pulse w-1/2" />
                    </>
                  ) : (
                    <>
                      <h3 className="font-bold text-base mb-1">{deal.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{deal.description}</p>
                      <span className="text-red-500 text-sm font-bold">
                        {getDiscountLabel(deal)}
                      </span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HotPlace;
