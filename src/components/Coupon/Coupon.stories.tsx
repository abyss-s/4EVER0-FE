import type { Meta, StoryObj } from '@storybook/react';
import { Coupon } from './Coupon';

const meta: Meta<typeof Coupon> = {
  title: 'Components/Coupon',
  component: Coupon,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Coupon>;

export const Owned: Story = {
  args: {
    type: 'owned',
    brandName: '배스킨라빈스',
    description: '파인트 4천원 할인',
    dateRange: '2025.06.01 ~ 2025.06.30',
    imageUrl: '/images/moonoz-hello.png',
  },
};

export const Liked: Story = {
  args: {
    type: 'liked',
    brandName: '스타벅스',
    description: '아메리카노 할인권',
    dateRange: '2025.06.01 ~ 2025.06.30',
    imageUrl: '/images/moonoz-hello.png',
  },
};

export const HotUrgent: Story = {
  args: {
    type: 'hot',
    brandName: '롯데렌터카',
    description: '45% 할인 쿠폰',
    dateRange: '2025.06.01 ~ 2025.06.30',
    imageUrl: '/images/moonoz-hello.png',
    isUrgent: true,
  },
};
