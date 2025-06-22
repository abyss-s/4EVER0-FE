import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getTopCoupons, TopCoupon } from '@/apis/coupon/getTopCoupons';
import TopCouponCard from '@/components/Card/TopCouponCard';
import PopupMap from './PopupMap/PopupMap';
import StoreMap from './StoreMap/StoreMap';
import { Card, CardContent } from '@/components/Card';
import { MapPin, Store, TrendingUp } from 'lucide-react';
import { IMAGES } from '@/constant/imagePath';

const HotPlace = () => {
  const [bestDeals, setBestDeals] = useState<TopCoupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [option, setOption] = useState<'popup' | 'store'>('popup');

  const allBrandIds = [1, 2, 3, 4, 5, 6, 7, 8];

  const [searchParams] = useSearchParams();
  const subscribedBrandIdsParam = searchParams.get('subscribedBrandIds');
  const subscribedBrandIds = subscribedBrandIdsParam
    ? subscribedBrandIdsParam.split(',').map((id) => Number(id))
    : [1, 3, 4];

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
    <div className="pb-20 space-y-4 min-h-full">
      {/* 헤더 섹션 - 마이페이지 스타일 적용 */}
      <div className="px-4">
        <h2 className="title-1 mt-6 flex items-center text-brand-darkblue gap-2">
          <img src={IMAGES.MOONER['mooner-hotplace']} alt="문어 아이콘" className="w-15 h-15" />
          요즘 뜨는핫플레이스를 찾고, <br></br>내 근처 쿠폰을 저장해보세요!
        </h2>

        {/* MZ PICK 배너 */}
        <div className="mt-6 mb-4">
          <Card className="bg-gradient-to-r from-brand-yellow to-brand-red text-white">
            <CardContent className="text-center py-2">
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-bold">요즘 핫한 MZ들의 PICK은?!</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 맵 선택 섹션 */}
      <div className="px-4">
        <h1 className="text-xl font-bold text-brand-darkblue mb-4">지도 보기</h1>
        <div className="grid grid-cols-2 gap-2">
          <Card
            clickable={option !== 'popup'}
            className={option === 'popup' ? 'bg-blue-50 border-blue-200' : ''}
            onClick={() => setOption('popup')}
          >
            <CardContent className="flex flex-col items-center justify-center py-1 gap-2">
              <MapPin className={`w-6 h-6 ${option === 'popup' ? 'text-blue-600' : ''}`} />
              <span
                className={`caption-1 font-medium ${option === 'popup' ? 'text-blue-600' : ''}`}
              >
                팝업맵 보기
              </span>
            </CardContent>
          </Card>

          <Card
            clickable={option !== 'store'}
            className={option === 'store' ? 'bg-blue-50 border-blue-200' : ''}
            onClick={() => setOption('store')}
          >
            <CardContent className="flex flex-col items-center justify-center py-1 gap-2">
              <Store className={`w-6 h-6 ${option === 'store' ? 'text-blue-600' : ''}`} />
              <span
                className={`caption-1 font-medium ${option === 'store' ? 'text-blue-600' : ''}`}
              >
                스토어맵 보기
              </span>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 지도 컨텐츠 */}
      <div className="px-4 pt-2 pb-4">
        <Card>
          <CardContent className="p-0">
            {option === 'popup' ? (
              <PopupMap />
            ) : (
              <StoreMap allBrandIds={allBrandIds} selectedIds={selectedBrandIds} />
            )}
          </CardContent>
        </Card>
      </div>

      {/* 인기 쿠폰 섹션 */}
      <div className="px-4">
        <h1 className="text-xl font-bold text-brand-darkblue mb-4">
          인기 쿠폰 <span className="text-red-400 font-bold">TOP 3</span>
        </h1>

        {/* 쿠폰 리스트 */}
        <div className="flex flex-col gap-4 pt-4">
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
