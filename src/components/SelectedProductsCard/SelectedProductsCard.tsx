import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { SubscriptionItem } from '@/types/subscription';
import { Brand } from '@/types/brand';

interface SelectedProductsCardProps {
  selectedMainItems: SubscriptionItem[];
  selectedLifeBrands: Brand[];
  totalPrice: number;
}

export const SelectedProductsCard = ({
  selectedMainItems,
  selectedLifeBrands,
  totalPrice,
}: SelectedProductsCardProps) => {
  return (
    <Card variant="elevated" className="w-full mx-auto px-4">
      <CardHeader>
        <CardTitle className="text-base">선택한 상품</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium text-sm mb-2">메인 구독 상품</h4>
          <div className="space-y-2">
            {selectedMainItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm p-2 bg-gray-50 rounded">
                <span>{item.title}</span>
                <span className="font-medium">{item.price.toLocaleString()}원</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-sm mb-2">라이프 혜택</h4>
          <div className="flex flex-wrap gap-1">
            {selectedLifeBrands.map((brand) => (
              <Badge key={brand.id} variant="category" size="sm">
                {brand.title}
              </Badge>
            ))}
          </div>
        </div>

        <div className="border-t pt-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold">총 금액</span>
            <span className="text-lg font-bold text-pink-600">{totalPrice.toLocaleString()}원</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
