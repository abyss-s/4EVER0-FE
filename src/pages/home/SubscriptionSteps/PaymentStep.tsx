import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModalStore } from '@/stores/useModalStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/Badge';
import type { SubscriptionItem } from '@/types/subscription';
import type { Brand } from '@/types/brand';
import { SelectedProductsCard } from '@/components/SelectedProductsCard/SelectedProductsCard';

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
      <div className="flex justify-center">
        <SelectedProductsCard
          selectedMainItems={selectedMainItems}
          selectedLifeBrands={selectedLifeBrands}
          totalPrice={totalPrice}
        />
      </div>
    </div>
  );
}
