import type { Meta, StoryObj } from '@storybook/react';
import PromotionalBanner from './PromotionalBanner';

const meta: Meta<typeof PromotionalBanner> = {
  title: 'Components/PromotionalBanner',
  component: PromotionalBanner,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '자동 슬라이드, 재생/정지, 좌우 이동 및 클릭 가능한 배너 컴포넌트입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PromotionalBanner>;

export const Default: Story = {
  render: () => (
    <div className="max-w-screen-sm mx-auto mt-4">
      <PromotionalBanner navigate={(path) => alert(`이동: ${path}`)} />
    </div>
  ),
};
