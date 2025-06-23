import type { Meta, StoryObj } from '@storybook/react';
import BillSummaryCard from './BillSummaryCard';
import type { BillSummaryCardProps } from './BillSummaryCard.types';

const meta: Meta<typeof BillSummaryCard> = {
  title: 'Components/BillSummaryCard',
  component: BillSummaryCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '청구 요금 및 데이터 사용량을 보여주는 카드 컴포넌트입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BillSummaryCard>;

const usageData: BillSummaryCardProps['usageData'] = [
  {
    label: '데이터',
    current: 3,
    total: 10,
    variant: 'data',
    displayText: '3.0GB / 10.0GB',
  },
  {
    label: '공유 데이터',
    current: 1,
    total: 5,
    variant: 'sharedData',
    displayText: '1.0GB / 5.0GB',
  },
  {
    label: '통화',
    current: 45,
    total: 100,
    variant: 'call',
    displayText: '45분 / 100분',
  },
  {
    label: '문자',
    current: 25,
    total: 100,
    variant: 'sms',
    displayText: '25건 / 100건',
  },
];

export const Default: Story = {
  args: {
    phoneNumber: '010-1234-5678',
    planName: '5G 라이트 요금제',
    month: '2025년 6월',
    amount: 13900,
    usageData,
    isExpanded: false,
  },
};

export const Expanded: Story = {
  args: {
    phoneNumber: '010-9876-5432',
    planName: 'LTE 데이터 11GB',
    month: '2025년 6월',
    amount: 9900,
    usageData,
    isExpanded: true,
  },
};
