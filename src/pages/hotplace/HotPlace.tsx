import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getTopCoupons, TopCoupon } from '@/apis/coupon/getTopCoupons';
import TopCouponCard from '@/components/Card/TopCouponCard';
import PopupMap from './PopupMap/PopupMap';
import StoreMap from './StoreMap/StoreMap';

const HotPlace = () => {
  const [bestDeals, setBestDeals] = useState<TopCoupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [option, setOption] = useState<'popup' | 'store'>('popup');
  const allBrandIds = [1, 2, 3, 4, 5, 6, 7, 8];

  const [searchParams] = useSearchParams();
  const subscribedBrandIdsParam = searchParams.get('subscribedBrandIds');
  const subscribedBrandIds = subscribedBrandIdsParam
    ? subscribedBrandIdsParam.split(',').map((id) => Number(id))
    : [1, 3, 4]; // <-- 이게 기본값으로 잘 들어감

  const selectedBrandIds: number[] = subscribedBrandIds;

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

  useEffect(() => {
    console.log('selectedBrandIds:', selectedBrandIds);
  }, [subscribedBrandIds]);

  const getDiscountLabel = (deal: TopCoupon) => {
    if (!deal) return '';
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

      <div className="flex justify-center py-4 gap-4">
        <button
          className={`px-4 py-2 rounded-full text-sm ${
            option === 'popup' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setOption('popup')}
        >
          팝업맵 보기
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm ${
            option === 'store' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setOption('store')}
        >
          스토어맵 보기
        </button>
      </div>

      {option === 'popup' ? (
        <PopupMap />
      ) : (
        <StoreMap allBrandIds={allBrandIds} selectedIds={selectedBrandIds} />
      )}

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
