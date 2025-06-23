import type { Meta, StoryObj } from '@storybook/react';
import { UsageAnalysisCard } from './UsageAnalysisCard';
import type { UsageAnalysisData } from '@/types/streaming';

const meta: Meta<typeof UsageAnalysisCard> = {
  title: 'Components/UsageAnalysisCard',
  component: UsageAnalysisCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
📊 **UsageAnalysisCard**

- 사용자의 요금제 정보와 데이터/음성/SMS 사용량을 분석하여 시각적으로 표시합니다.
- 사용률에 따라 원형 프로그래스바 색상과 권장사항 메시지가 달라집니다.
- 예시:
  - 20%: 여유 있음
  - 50%: 적정 사용
  - 75%: 주의 필요
  - 95%: 요금제 업그레이드 권장
        `,
      },
    },
  },
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
