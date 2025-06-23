import type { Meta, StoryObj } from '@storybook/react';
import PromotionalBanner from './PromotionalBanner';

const meta: Meta<typeof PromotionalBanner> = {
  title: 'Components/PromotionalBanner',
  component: PromotionalBanner,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
### 📢 PromotionalBanner

- 자동 슬라이드, 좌우 버튼, 정지/재생 가능한 반응형 배너입니다.
- 클릭 시 navigate()를 통해 원하는 경로로 이동할 수 있습니다.
`,
      },
    },
  },
  argTypes: {
    navigate: {
      description: '클릭 시 실행할 라우팅 함수 (예: navigate("/chatbot"))',
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof PromotionalBanner>;

export const Default: Story = {
  name: '기본 배너',
  render: () => (
    <div className="max-w-screen-sm mx-auto mt-4">
      <PromotionalBanner navigate={(path) => alert(`이동: ${path}`)} />
    </div>
  ),
};
