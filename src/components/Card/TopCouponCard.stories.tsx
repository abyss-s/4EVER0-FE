import type { Meta, StoryObj } from '@storybook/react';
import TopCouponCard from './TopCouponCard';
import { TopCoupon } from '@/apis/coupon/getTopCoupons';

const mockCoupon: TopCoupon & { imageUrl: string } = {
  id: 1,
  title: '전자책 무제한 구독',
  description: '리디셀렉트 구독 시 전자책 무제한 열람 가능',
  brand: '리디셀렉트',
  discountType: 'PERCENT',
  discountValue: 100,
  startDate: '2025-06-01',
  endDate: '2025-06-30',
  likes: 999,
  imageUrl:
    'https://www.lguplus.com/static-pogg/pc-contents/images/pogg/20231121-020043-951-PctUjiST.png',
};

const meta: Meta<typeof TopCouponCard> = {
  title: 'COMPONENTS/Card/TopCouponCard',
  component: TopCouponCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TopCouponCard>;

export const Default: Story = {
  args: {
    deal: mockCoupon,
    index: 0,
    isLoading: false,
    getDiscountLabel: (deal: TopCoupon) =>
      deal.discountType === 'PERCENT'
        ? `${deal.discountValue}% 할인`
        : `${deal.discountValue.toLocaleString()}원 할인`,
  },
};

export const Loading: Story = {
  args: {
    deal: undefined,
    index: 1,
    isLoading: true,
    getDiscountLabel: () => '',
  },
};
