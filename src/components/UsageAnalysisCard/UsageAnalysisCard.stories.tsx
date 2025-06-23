import type { Meta, StoryObj } from '@storybook/react';
import { UsageAnalysisCard } from './UsageAnalysisCard';
import type { UsageAnalysisData } from '@/types/streaming';

const meta: Meta<typeof UsageAnalysisCard> = {
  title: 'Components/UsageAnalysisCard',
  component: UsageAnalysisCard,
};

export default meta;
type Story = StoryObj<typeof UsageAnalysisCard>;

const baseData: Omit<UsageAnalysisData, 'usage_percentage'> = {
  user_id: 1,
  current_plan: '5G 스페셜 요금제',
  current_price: 59000,
  remaining_data: 850,
  remaining_voice: 120,
  remaining_sms: 50,
};

export const Excellent: Story = {
  name: '20% 사용 - 매우 여유 있음',
  args: {
    data: {
      ...baseData,
      usage_percentage: 20,
    },
  },
};

export const Good: Story = {
  name: '50% 사용 - 적정 사용',
  args: {
    data: {
      ...baseData,
      usage_percentage: 50,
    },
  },
};

export const Warning: Story = {
  name: '75% 사용 - 주의 필요',
  args: {
    data: {
      ...baseData,
      usage_percentage: 75,
    },
  },
};

export const Critical: Story = {
  name: '95% 사용 - 요금제 업그레이드 권장',
  args: {
    data: {
      ...baseData,
      usage_percentage: 95,
    },
  },
};
