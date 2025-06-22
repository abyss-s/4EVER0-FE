import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUserSubscriptions } from '@/apis/subscription/getUserSubscriptions';
import { getMainSubscriptions } from '@/apis/subscription/getMainSubscriptions';
import { Card, CardContent } from '@/components/Card';
import { Package } from 'lucide-react';
import { formatPrice } from '@/utils/priceUtils';
import LoadingMooner from '@/pages/common/LoadingMooner';
import Empty from '@/pages/common/Empty';
import { IMAGES } from '@/constant/imagePath';

const Subscriptions: React.FC = () => {
  const { data: userSubscriptions = [], isLoading: loadingUser } = useQuery({
    queryKey: ['userSubscriptions'],
    queryFn: fetchUserSubscriptions,
  });

  const { data: mainRes, isLoading: loadingMain } = useQuery({
    queryKey: ['mainSubscriptions'],
    queryFn: getMainSubscriptions,
  });

  const mainSubscriptions = mainRes?.data ?? [];

  const [shouldShowLoading, setShouldShowLoading] = useState(false);

  useEffect(() => {
    if (loadingUser || loadingMain) {
      const timer = setTimeout(() => setShouldShowLoading(true), 2000);
      return () => clearTimeout(timer);
    } else {
      setShouldShowLoading(false);
    }
  }, [loadingUser, loadingMain]);

  if ((loadingUser || loadingMain) && shouldShowLoading) {
    return <LoadingMooner />;
  }
  const merged = userSubscriptions.map((sub) => {
    const matched = mainSubscriptions.find((m) => m.title === sub.main_title);
    return {
      ...sub,
      image_url: matched?.image_url ?? '',
    };
  });

  return (
    <div className="p-4">
      <div className="text-center flex flex-col items-center gap-1">
        <Package className="w-8 h-8" />
        <div className="text-xl mb-6">구독상품 목록</div>
      </div>
      {merged.length === 0 ? (
        <Empty
          imageSrc={IMAGES.MOONER['mooner-sad']}
          altText="슬픈 무너"
          message="현재 보유한 구독상품이 없어요"
          buttonText="구독상품 PICK 하러가기"
          buttonLink="/home"
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 w-full">
          {merged.map((sub) => (
            <Card key={sub.id} variant="subscription" clickable className="relative w-full">
              <CardContent className="p-3 pt-0  text-center">
                {sub.image_url && (
                  <img
                    src={sub.image_url}
                    alt={sub.main_title}
                    className="w-32 h-32 object-contain mx-auto"
                  />
                )}
                <h3 className="font-medium text-sm mb-1">{sub.main_title.split('+')[0].trim()}</h3>{' '}
                <p className="text-xs text-gray-600 mb-2">{sub.brand_title}</p>
                <div className="text-pink-600 font-semibold text-sm">{formatPrice(sub.price)}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
