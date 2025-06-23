import type { Meta, StoryObj } from '@storybook/react';
import { MouseTooltip } from './MouseTooltip';

const meta: Meta<typeof MouseTooltip> = {
  title: 'Components/MouseTooltip',
  component: MouseTooltip,
  parameters: {
    docs: {
      description: {
        component: '마우스를 올리면 해당 위치 근처에 툴팁이 표시되는 컴포넌트입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MouseTooltip>;

export const Default: Story = {
  render: () => (
    <div className="flex justify-center items-center h-[300px]">
      <MouseTooltip content="무너팁이에요! 👋">
        <div className="px-4 py-2 bg-pink-100 text-pink-900 rounded cursor-pointer">
          여기에 마우스를 올려보세요
        </div>
      </MouseTooltip>
    </div>
  ),
};
