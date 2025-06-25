import type { Meta, StoryObj } from '@storybook/react';
import { getBrandBackgroundColor, getBrandDotColor } from '@/utils/brandColor';
import { cn } from '@/lib/utils';

const brands = [
  '배스킨라빈스',
  'CU',
  '파리바게뜨',
  '메가MGC커피',
  '파파존스',
  '올리브영',
  '스파오',
  '다이소',
];

const meta: Meta = {
  title: 'Design Tokens/Brand Colors',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const BackgroundColors: Story = {
  render: () => (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 p-4">
      {brands.map((brand) => (
        <div
          key={brand}
          className={cn(
            'w-full aspect-square rounded-xl flex items-center justify-center text-white font-bold text-sm',
            getBrandBackgroundColor(brand),
          )}
        >
          {brand}
        </div>
      ))}
    </div>
  ),
};

export const DotColors: Story = {
  render: () => (
    <div className="grid grid-cols-5 gap-4 p-4">
      {brands.map((brand) => (
        <div key={brand} className="flex items-center gap-2">
          <div className={cn('w-4 h-4 rounded-full', getBrandDotColor(brand))} />
          <span className="text-sm">{brand}</span>
        </div>
      ))}
    </div>
  ),
};
