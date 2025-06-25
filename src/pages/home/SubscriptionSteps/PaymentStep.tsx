import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModalStore } from '@/stores/useModalStore';
import { Badge } from '@/components/Badge';
import type { SubscriptionItem } from '@/types/subscription';
import type { Brand } from '@/types/brand';
import { SelectedProductsCard } from '@/components/SelectedProductsCard/SelectedProductsCard';
import { cn } from '@/lib/utils';

interface PaymentStepProps {
  selectedMainItems: SubscriptionItem[];
  selectedLifeBrands: Brand[];
  isLoggedIn: boolean;
  isProcessing?: boolean;
  onSubscribe: () => void;
}

export function PaymentStep({
  selectedMainItems,
  selectedLifeBrands,
  isLoggedIn,
  isProcessing,
  onSubscribe,
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
      <div className="pt-4">
        <button
          disabled={isProcessing}
          onClick={onSubscribe}
          className={cn(
            'w-full py-3 rounded-lg font-semibold text-white transition',
            isProcessing ? 'bg-gray-300 cursor-not-allowed' : 'bg-pink-500 hover:bg-pink-600',
          )}
        >
          {isProcessing ? '처리 중...' : '구독 완료하기'}
        </button>
      </div>
    </div>
  );
}
