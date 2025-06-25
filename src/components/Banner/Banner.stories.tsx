import type { Meta, StoryObj } from '@storybook/react-vite';
import { Banner } from './Banner';
import { Button } from '../Button/Button';
import { bannerVariants } from './bannerVariants';
import type { VariantProps } from 'class-variance-authority';

type BannerVariant = VariantProps<typeof bannerVariants>['variant'];
type BannerSize = VariantProps<typeof bannerVariants>['size'];

const meta: Meta<typeof Banner> = {
  title: 'Components/Banner',
  component: Banner,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'red',
        'yellow',
        'white',
        'moonuz',
        'gradient',
        'pinkblue',
        'sunrise',
        'ocean',
        'meadow',
        'twilight',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    layout: {
      control: 'select',
      options: ['default', 'centered', 'split'],
    },
    title: { control: 'text' },
    description: { control: 'text' },
    image: { control: 'text' },
    imageAlt: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Playground: Story = {
  args: {
    title: '🐙 무너와 함께하는 스마트한 혜택!',
    description: 'MZ세대를 위한 맞춤형 요금제와 구독 서비스를 AI로 추천받아보세요!',
    variant: 'primary',
    size: 'default',
    layout: 'default',
    image: 'https://avatars.githubusercontent.com/u/212847508?s=200&v=4',
    actionButton: (
      <Button
        variant="outline"
        size="default"
        className="bg-white/20 border-white/30 text-white hover:bg-white/30"
      >
        자세히 보기
      </Button>
    ),
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      {(['sm', 'default', 'lg'] as BannerSize[]).map((size) => (
        <Banner
          key={size}
          size={size}
          variant="moonuz"
          title={`${size} 사이즈 배너`}
          description="사이즈별 배너 미리보기입니다."
          image="https://avatars.githubusercontent.com/u/212847508?s=200&v=4"
        />
      ))}
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => {
    const variants: BannerVariant[] = [
      'primary',
      'red',
      'yellow',
      'white',
      'moonuz',
      'gradient',
      'pinkblue',
      'sunrise',
      'ocean',
      'meadow',
      'twilight',
    ];

    return (
      <div className="space-y-4">
        {variants.map((variant) => (
          <Banner
            key={variant}
            variant={variant}
            title={`${variant} 배너`}
            description="브랜드/그라데이션 색상을 활용한 배너 디자인입니다."
            image="https://avatars.githubusercontent.com/u/212847508?s=200&v=4"
          />
        ))}
      </div>
    );
  },
};
