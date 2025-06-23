import type { Meta, StoryObj } from '@storybook/react';
import CouponBarcodeModal from './CouponBarcodeModal';

const meta: Meta<typeof CouponBarcodeModal> = {
  title: 'Components/Modal/CouponBarcodeModal',
  component: CouponBarcodeModal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CouponBarcodeModal>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => alert('닫기'),
    brandName: '배스킨라빈스',
    barcodeValue: '8801234567890',
  },
};
