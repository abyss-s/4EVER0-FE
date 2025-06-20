import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/Button';
import { Heart, Plus, Play, Coffee, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MainSubscription, LifeBrand, SubscriptionRecommendationsData } from '@/types/streaming';

interface SubscriptionCardProps {
  data: SubscriptionRecommendationsData;
  onSubscribe?: (subscription: MainSubscription) => void;
  onBrandSelect?: (brand: LifeBrand) => void;
  className?: string;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = React.memo(
  ({ data, onSubscribe, onBrandSelect, className }) => {
    const { main_subscription, life_brand } = data;

    const handleSubscribeClick = React.useCallback(() => {
      if (main_subscription && onSubscribe) {
        console.log('[DEBUG] Subscribe clicked:', main_subscription);
        onSubscribe(main_subscription);
      }
    }, [main_subscription, onSubscribe]);

    const handleBrandClick = React.useCallback(() => {
      if (life_brand && onBrandSelect) {
        console.log('[DEBUG] Brand clicked:', life_brand);
        onBrandSelect(life_brand);
      }
    }, [life_brand, onBrandSelect]);

    // 라이프 브랜드가 있는지 확인
    const hasLifeBrand = !!life_brand;

    return (
      <Card
        className={cn(
          'w-full max-w-sm bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-purple-200 shadow-sm overflow-hidden',
          className,
        )}
      >
        {/* 헤더 */}
        <div className="px-3 pt-3 pb-2">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-500 flex-shrink-0" />
            <span className="text-sm font-bold text-purple-800 truncate">무너의 추천 조합</span>
            <span className="text-base">🐙</span>
          </div>
        </div>

        <CardContent className="px-3 pb-3 space-y-3">
          <div className="flex flex-col items-center gap-2">
            {/* 메인 구독 */}
            {main_subscription ? (
              <div className="w-full bg-white/80 rounded-lg p-2.5 border border-blue-100">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Play className="w-3 h-3 text-blue-600 flex-shrink-0" />
                  <span className="text-xs font-medium text-blue-700">메인 구독</span>
                </div>

                <div className="flex items-center gap-2">
                  <img
                    src={main_subscription.image_url}
                    alt={main_subscription.title}
                    className="w-12 h-8 rounded object-cover flex-shrink-0"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-subscription.png';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-800 truncate">
                      {main_subscription.title}
                    </h4>
                    <p className="text-xs text-gray-600 truncate">{main_subscription.category}</p>
                    <p className="text-xs font-bold text-blue-600">
                      {main_subscription.price?.toLocaleString()}원
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full bg-gray-100 rounded-lg p-2.5 border border-gray-200">
                <p className="text-xs text-gray-500">메인 구독 없음</p>
              </div>
            )}

            {/* 플러스 아이콘 - 라이프 브랜드가 있을 때만 표시 */}
            {hasLifeBrand && (
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-sm">
                  <Plus className="w-5 h-5 text-white font-bold" />
                </div>
              </div>
            )}

            {/* 라이프 브랜드 - 있을 때만 표시 */}
            {hasLifeBrand && life_brand && (
              <div className="w-full bg-white/80 rounded-lg p-2.5 border border-green-100">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Coffee className="w-3 h-3 text-green-600 flex-shrink-0" />
                  <span className="text-xs font-medium text-green-700">라이프스타일</span>
                </div>

                <div className="flex items-center gap-2">
                  <img
                    src={life_brand.image_url}
                    alt={life_brand.name}
                    className="w-12 h-8 rounded object-cover flex-shrink-0"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-brand.png';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-800 truncate">{life_brand.name}</h4>
                    <p className="text-xs text-gray-600 truncate line-clamp-1">
                      {life_brand.description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="text-center text-xs text-purple-700 bg-purple-100/60 rounded-lg p-2">
            💖 무너가 콕 집은 유독픽! <br />
            지금 바로 경험해보세요.
          </div>

          {/* 액션 버튼들 - 동적 레이아웃 */}
          <div className="w-full">
            {/* 둘 다 있는 경우: 2열 그리드 */}
            {main_subscription && hasLifeBrand && life_brand && onSubscribe && onBrandSelect && (
              <div className="grid grid-cols-2 gap-2">
                <Button
                  size="default"
                  onClick={handleSubscribeClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs py-1.5 h-auto"
                >
                  <Play className="w-3 h-3 mr-1" />
                  구독하러 가기
                </Button>
                <Button
                  size="default"
                  variant="outline"
                  onClick={handleBrandClick}
                  className="border-green-600 text-green-600 hover:bg-green-50 text-xs py-1.5 h-auto"
                >
                  <Bookmark className="w-3 h-3 mr-1" />
                  쿠폰 찜하기
                </Button>
              </div>
            )}

            {/* 메인 구독만 있는 경우: 풀 너비 */}
            {main_subscription &&
              (!hasLifeBrand || !life_brand || !onBrandSelect) &&
              onSubscribe && (
                <Button
                  size="default"
                  onClick={handleSubscribeClick}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 h-auto"
                >
                  <Play className="w-3 h-3 mr-1" />
                  구독하러 가기
                </Button>
              )}

            {/* 라이프 브랜드만 있는 경우: 풀 너비 */}
            {(!main_subscription || !onSubscribe) &&
              hasLifeBrand &&
              life_brand &&
              onBrandSelect && (
                <Button
                  size="default"
                  variant="outline"
                  onClick={handleBrandClick}
                  className="w-full border-green-600 text-green-600 hover:bg-green-50 py-1.5 h-auto"
                >
                  <Bookmark className="w-3 h-3 mr-1" />
                  쿠폰 찜하기
                </Button>
              )}
          </div>
        </CardContent>
      </Card>
    );
  },
);

SubscriptionCard.displayName = 'SubscriptionCard';

export default SubscriptionCard;
