import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/Button';
import { Heart, Star, Play, Coffee } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MainSubscription {
  id: number;
  title: string;
  price: number;
  category: string;
  image_url: string;
}

interface LifeBrand {
  id: number;
  name: string;
  image_url: string;
  description: string;
}

interface SubscriptionData {
  main_subscription?: MainSubscription;
  life_brand?: LifeBrand;
}

interface SubscriptionCardProps {
  data: SubscriptionData;
  onSubscribe?: (subscription: MainSubscription) => void;
  onBrandSelect?: (brand: LifeBrand) => void;
  className?: string;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  data,
  onSubscribe,
  onBrandSelect,
  className,
}) => {
  const { main_subscription, life_brand } = data;

  return (
    <Card
      className={cn(
        'w-full max-w-md bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-sm',
        className,
      )}
    >
      <CardHeader>
        <CardTitle className="text-lg font-bold text-purple-800 flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-500" />
          무너의 추천 유독픽 조합🐙
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 메인 구독 */}
        {main_subscription && (
          <div className="bg-white/70 rounded-lg p-4 border border-purple-100">
            <div className="flex items-center gap-3 mb-3">
              <Play className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-800">메인 구독</span>
            </div>

            <div className="flex items-start gap-3">
              <img
                src={main_subscription.image_url}
                alt={main_subscription.title}
                className="w-12 h-12 rounded-lg object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-subscription.png';
                }}
              />
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{main_subscription.title}</h3>
                <p className="text-sm text-gray-600">{main_subscription.category}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold text-blue-600">
                    {main_subscription.price?.toLocaleString()}원
                  </span>
                  {onSubscribe && (
                    <Button
                      size="sm"
                      onClick={() => onSubscribe(main_subscription)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      구독하러 가기
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {life_brand && (
          <div className="bg-white/70 rounded-lg p-4 border border-green-100">
            <div className="flex items-center gap-3 mb-3">
              <Coffee className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-800">라이프스타일</span>
            </div>

            <div className="flex items-start gap-3">
              <img
                src={life_brand.image_url}
                alt={life_brand.name}
                className="w-12 h-12 rounded-lg object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-brand.png';
                }}
              />
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{life_brand.name}</h3>
                <p className="text-sm text-gray-600">{life_brand.description}</p>
                {onBrandSelect && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onBrandSelect(life_brand)}
                    className="mt-2 border-green-600 text-green-600 hover:bg-green-50"
                  >
                    <Star className="w-3 h-3 mr-1" />
                    하트하기
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="text-center text-sm text-purple-700 bg-purple-100/50 rounded-lg p-3">
          💝 이 조합으로 더욱 풍성한 라이프스타일을 즐겨보세요!
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;
