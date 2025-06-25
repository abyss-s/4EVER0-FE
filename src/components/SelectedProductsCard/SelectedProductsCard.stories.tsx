import type { Meta, StoryObj } from '@storybook/react';
import { SelectedProductsCard } from './SelectedProductsCard';
import type { SubscriptionItem } from '@/types/subscription';
import type { Brand } from '@/types/brand';

const meta: Meta<typeof SelectedProductsCard> = {
  title: 'components/SelectedProductsCard',
  component: SelectedProductsCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '메인 구독 상품 1개와 라이프 혜택 1개를 보여주는 결제 요약 카드입니다. PaymentStep 컴포넌트에서 사용됩니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SelectedProductsCard>;

export const Default: Story = {
  name: '선택한 상품 카드',
  render: () => {
    const selectedMainItems: SubscriptionItem[] = [
      {
        id: 1,
        title: '유튜브 프리미엄',
        image_url: '',
        category: 'OTT',
        price: 13900,
      },
    ];

    const selectedLifeBrands: Brand[] = [
      {
        id: 101,
        title: '스타벅스',
        image_url: '',
        category: '카페/음료',
      },
    ];

    const totalPrice = selectedMainItems[0].price;

    return (
      <SelectedProductsCard
        selectedMainItems={selectedMainItems}
        selectedLifeBrands={selectedLifeBrands}
        totalPrice={totalPrice}
      />
    );
  },
};
