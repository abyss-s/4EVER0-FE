import type { Meta, StoryObj } from '@storybook/react';
import { PlanSwiper } from '@/components/PlanCard/PlanSwiper';
import type { PlanRecommendation } from '@/types/streaming';

const meta: Meta<typeof PlanSwiper> = {
  title: 'Components/PlanSwiper',
  component: PlanSwiper,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof PlanSwiper>;

const mockPlans: PlanRecommendation[] = [
  {
    id: 1,
    name: '너겟 26',
    price: 26000,
    description: '설명 텍스트',
    data: '6GB',
    voice: '무제한 + 부가통화 300분',
    speed: '400Kbps',
    share_data: '-',
    sms: '무제한',
  },
  {
    id: 2,
    name: '너겟 32',
    price: 32000,
    description: '설명 텍스트',
    data: '10GB',
    voice: '무제한 + 부가통화 300분',
    speed: '400Kbps',
    share_data: '-',
    sms: '무제한',
  },
  {
    id: 3,
    name: '너겟 34',
    price: 34000,
    description: '설명 텍스트',
    data: '15GB',
    voice: '무제한 + 부가통화 300분',
    speed: '400Kbps',
    share_data: '-',
    sms: '무제한',
  },
];

export const Default: Story = {
  args: {
    plans: mockPlans,
    onSelect: (plan) => alert(`${plan.name} 선택됨!`),
  },
};
