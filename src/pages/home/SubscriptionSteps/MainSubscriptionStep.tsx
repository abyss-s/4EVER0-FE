import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/Badge';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import type { SubscriptionItem } from '@/types/subscription';

interface MainSubscriptionStepProps {
  mainSubscriptions: SubscriptionItem[];
  selectedMainItems: SubscriptionItem[];
  onToggleSubscription: (item: SubscriptionItem) => void;
  loading: boolean;
}

export function MainSubscriptionStep({
  mainSubscriptions,
  selectedMainItems,
  onToggleSubscription,
  loading,
}: MainSubscriptionStepProps) {
  const getCategoryVariant = (category: string) => {
    switch (category.toLowerCase()) {
      case 'ott':
        return 'ott';
      case '뮤직':
        return 'music';
      case '웹툰':
      case '웹툰/웹소설':
        return 'webtoon';
      default:
        return 'category';
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <Badge variant="step">STEP 1</Badge>
        <h2 className="text-lg font-semibold mt-2">메인상품 선택하기</h2>
        <p className="text-sm text-gray-600 mt-1">
          유독 Pick은 메인상품과 라이프상품 2가지 혜택을 선택하는 상품입니다.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-6s">로딩 중...</div>
      ) : (
        <div className="space-y-3">
          {mainSubscriptions.map((item) => {
            const isSelected = selectedMainItems.find((sub) => sub.id === item.id);
            return (
              <Card
                key={item.id}
                className={cn(
                  'cursor-pointer transition-all border border-gray-50',
                  isSelected ? 'ring-2 ring-pink-500 bg-pink-50' : 'hover:shadow-md',
                )}
                onClick={() => onToggleSubscription(item)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-12 h-12 object-contain rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <Badge variant={getCategoryVariant(item.category)} size="sm">
                          {item.category}
                        </Badge>
                        {isSelected && (
                          <div className="w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <h3 className="font-medium text-sm mb-1">{item.title}</h3>
                      <p className="text-xs text-gray-600 mb-2">+ 라이프 상품 구독혜택</p>
                      <div className="text-right">
                        <span className="text-pink-600 font-semibold">
                          {item.price.toLocaleString()}원
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
