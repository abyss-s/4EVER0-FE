import type { Meta, StoryObj } from '@storybook/react';
import { BaseSwiper } from './BaseSwiper';

// 테스트용 타입 정의 (예: 문자열 슬라이드)
type StringSwiper = typeof BaseSwiper<string>;

const meta: Meta<StringSwiper> = {
  title: 'Components/BaseSwiper',
  component: BaseSwiper,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Swiper를 기반으로 한 공통 슬라이드 컴포넌트입니다. renderItem을 통해 슬라이드 콘텐츠를 렌더링할 수 있습니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<StringSwiper>;

// ✅ 테스트용 데이터 (예: 문자열 배열)
const sampleItems = ['슬라이드 1', '슬라이드 2', '슬라이드 3'];

export const MultipleSlides: Story = {
  render: () => (
    <BaseSwiper
      items={sampleItems}
      renderItem={(item) => (
        <div className="h-40 bg-pink-100 rounded-lg flex items-center justify-center text-xl font-bold">
          {item}
        </div>
      )}
    />
  ),
};

export const SingleSlide: Story = {
  render: () => (
    <BaseSwiper
      items={['단일 슬라이드']}
      renderItem={(item) => (
        <div className="h-40 bg-green-100 rounded-lg flex items-center justify-center text-xl font-bold">
          {item}
        </div>
      )}
    />
  ),
};
