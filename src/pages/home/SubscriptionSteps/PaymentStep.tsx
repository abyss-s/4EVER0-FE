import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModalStore } from '@/stores/useModalStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/Badge';
import type { SubscriptionItem } from '@/types/subscription';
import type { Brand } from '@/types/brand';

interface PaymentStepProps {
  selectedMainItems: SubscriptionItem[];
  selectedLifeBrands: Brand[];
  isLoggedIn: boolean;
}

export function PaymentStep({
  selectedMainItems,
  selectedLifeBrands,
  isLoggedIn,
}: PaymentStepProps) {
  const totalPrice = selectedMainItems.reduce((sum, item) => sum + item.price, 0);
  const { openModal } = useModalStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      openModal({
        id: 'login-required',
        title: '로그인이 필요해요',
        description: '구독하려면 먼저 로그인해주세요.',
        variant: 'alert',
        showCancel: true,
        showConfirm: true,
        cancelText: '취소',
        confirmText: '로그인하러 가기',
        confirmVariant: 'default',
        onConfirm: () => {
          navigate('/login');
        },
      });
    }
  }, [isLoggedIn, openModal, navigate]);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <Badge variant="step">STEP 3</Badge>
        <h2 className="text-lg font-semibold mt-2">선택 완료</h2>
      </div>

      <Card>
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
              <span className="text-lg font-bold text-pink-600">
                {totalPrice.toLocaleString()}원
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
