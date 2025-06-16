import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'destructive',
        'outline',
        'subscription',
        'category',
        'step',
        'ott',
        'music',
        'webtoon',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Playground: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'default',
  },
};

export const SubscriptionBadges: Story = {
  name: '구독 관련 뱃지',
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="step">STEP 1</Badge>
      <Badge variant="category">OTT</Badge>
      <Badge variant="subscription">선택됨</Badge>
      <Badge variant="ott">유튜브 프리미엄</Badge>
      <Badge variant="music">지니뮤직</Badge>
      <Badge variant="webtoon">웹툰/웹소설</Badge>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="subscription">Subscription</Badge>
      <Badge variant="category">Category</Badge>
      <Badge variant="step">Step</Badge>
    </div>
  ),
};
