import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUserSubscriptions } from '@/apis/subscription/getUserSubscriptions';
import { getMainSubscriptions } from '@/apis/subscription/getMainSubscriptions';
import { Card, CardContent } from '@/components/Card';
import { Package } from 'lucide-react';
import { formatPrice } from '@/utils/priceUtils';

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

  if (loadingUser || loadingMain) return <p className="p-4">로딩 중...</p>;

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
        <p className="text-sm text-gray-500">구독 중인 상품이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 w-full">
          {merged.map((sub) => (
            <Card key={sub.id} variant="subscription" clickable className="relative w-full">
              <CardContent className="p-3 pt-0  text-center">
                {sub.image_url && (
                  <img
                    src={sub.image_url}
                    alt={sub.main_title}
                    className="w-30 h-30 object-contain mx-auto mb-2"
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
