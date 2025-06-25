import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '../ui/skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Tailwind classes to control size/shape',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    className: 'h-4 w-32',
  },
};

export const Circle: Story = {
  args: {
    className: 'h-10 w-10 rounded-full',
  },
};

export const LargeBlock: Story = {
  args: {
    className: 'h-20 w-full',
  },
};
