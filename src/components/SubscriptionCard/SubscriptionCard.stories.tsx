import type { Meta, StoryObj } from '@storybook/react';
import SubscriptionCard from './SubscriptionCard';
import { LifeBrand, MainSubscription } from '@/types/streaming';

const meta: Meta<typeof SubscriptionCard> = {
  title: 'Components/SubscriptionCard',
  component: SubscriptionCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
💡 **SubscriptionCard**

- 메인 구독 서비스와 라이프 브랜드 쿠폰을 함께 보여주는 추천 카드입니다.
- 다양한 조합(메인만, 라이프만, 둘 다)에 대응하며, 유저 액션에 따라 버튼을 제공합니다.

### 🔘 지원 시나리오
- 메인 구독만 있을 경우 → '구독하러 가기' 버튼
- 라이프 브랜드만 있을 경우 → '쿠폰 찜하기' 버튼
- 둘 다 있을 경우 → 버튼 두 개 나란히 표시
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SubscriptionCard>;

const mockMainSubscription = {
  id: 1,
  title: '넷플릭스',
  category: 'OTT',
  price: 13900,
  image_url: 'https://via.placeholder.com/80x40?text=Netflix',
};

const mockLifeBrand = {
  id: 1,
  name: '스타벅스 아메리카노',
  description: '매일 아침 커피 한잔의 여유',
  image_url: 'https://via.placeholder.com/80x40?text=Starbucks',
};

const onSubscribe = (s: MainSubscription) => alert(`구독하러 가기: ${s.title}`);
const onBrandSelect = (b: LifeBrand) => alert(`쿠폰 찜하기: ${b.name}`);

export const FullCombo: Story = {
  name: '메인 + 라이프 조합',
  args: {
    data: {
      main_subscription: mockMainSubscription,
      life_brand: mockLifeBrand,
    },
    onSubscribe,
    onBrandSelect,
  },
};

export const OnlyMain: Story = {
  name: '메인 구독만',
  args: {
    data: {
      main_subscription: mockMainSubscription,
      life_brand: undefined,
    },
    onSubscribe,
  },
};

export const OnlyLife: Story = {
  name: '라이프 브랜드만',
  args: {
    data: {
      main_subscription: undefined,
      life_brand: mockLifeBrand,
    },
    onBrandSelect,
  },
};
