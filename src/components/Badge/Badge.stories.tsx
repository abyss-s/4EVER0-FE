import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { BRAND_CATEGORIES } from '@/types/brand';

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

export const CategoryFilterBadge: Story = {
  render: () => {
    const [selected, setSelected] = useState('전체');
    const categories = [
      '전체',
      '디저트/음료',
      '편의점/쇼핑',
      '카페/음료',
      '베이커리',
      '도서/콘텐츠',
    ];

    return (
      <div className="w-full overflow-x-auto scrollbar-hide">
        <div className="inline-flex gap-2 py-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={cn(
                'flex-shrink-0 whitespace-nowrap shadow-sm transition-colors rounded-full font-medium',
                'text-xs px-4 py-2 border',
                selected === cat
                  ? 'bg-[var(--color-brand-darkblue)] text-white border-[var(--color-brand-darkblue)]'
                  : 'bg-[var(--color-brand-darkblue-light)] text-[var(--color-brand-darkblue)] border-transparent hover:bg-[var(--color-brand-darkblue-hover)/10]',
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    );
  },
  name: '유플투쁠 카테고리 필터 뱃지',
};

export const CategoryFilterStyle: Story = {
  render: () => (
    <div className="w-full overflow-x-auto scrollbar-hide touch-scroll bg-white p-4 rounded-md">
      <div className="flex gap-2 min-w-max">
        {BRAND_CATEGORIES.map((cat, index) => (
          <button
            key={index}
            className={cn(
              'flex-shrink-0 whitespace-nowrap shadow-sm transition-colors rounded-full font-medium',
              'text-xs px-4 py-2 border',
              // 선택된 뱃지처럼 보이게 첫 번째 항목 강조
              index === 0
                ? 'bg-pink-500 text-white border-pink-500'
                : 'bg-white text-pink-700 border-pink-200 hover:bg-pink-50',
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  ),
  name: '유독 카테고리 필터 뱃지',
};
