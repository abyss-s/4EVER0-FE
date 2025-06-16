import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover, PopoverTrigger, PopoverContent } from './Popover';
import type { VariantProps } from 'class-variance-authority';
import { contentVariants } from './popoverVartiants';
import { FocusableButton } from '@/components/Popover/FocusableButton';

type PopoverVariant = VariantProps<typeof contentVariants>['variant'];

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '라딕스 Popover 기반의 팝오버 컴포넌트입니다. 다크모드 및 일반 모드용 variant를 지원합니다.',
      },
    },
  },
  argTypes: {
    defaultOpen: {
      control: 'boolean',
      description: '팝오버의 기본 열림 상태를 설정합니다.',
    },
    // variant는 PopoverContent에 전달되는 prop이므로 여기서 제거
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

interface PlaygroundArgs {
  defaultOpen?: boolean;
  variant?: PopoverVariant;
}

export const Playground: StoryObj<typeof Popover> = {
  args: {
    defaultOpen: false,
    // variant는 PopoverRoot에 없는 prop이라 바로 못 넣음
  },
  render: (args: PlaygroundArgs) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <FocusableButton>Open Popover</FocusableButton>
      </PopoverTrigger>
      {/* variant는 여기서 명시적 전달 */}
      <PopoverContent variant={args.variant ?? 'light'}>
        <div>팝오버 내용</div>
      </PopoverContent>
    </Popover>
  ),
};

export const DarkPopover: Story = {
  parameters: {
    docs: {
      description: {
        story: '다크모드 스타일의 팝오버 예시입니다. 배경이 어두운 곳에서 사용하기 적합합니다.',
      },
    },
  },
  render: () => (
    <div className="bg-gray-800 p-10">
      <Popover>
        <PopoverTrigger asChild>
          <FocusableButton>Open Dark Popover</FocusableButton>
        </PopoverTrigger>
        <PopoverContent variant="dark">
          <div>다크모드 팝오버 내용입니다.</div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const WithCustomContent: Story = {
  parameters: {
    docs: {
      description: {
        story: '팝오버 내에 이미지, 텍스트 등 커스텀 콘텐츠를 넣는 예시입니다.',
      },
    },
  },
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <FocusableButton>Custom Content Popover</FocusableButton>
      </PopoverTrigger>
      <PopoverContent variant="light" sideOffset={8}>
        <div className="flex flex-col items-center space-y-2">
          <img src="/images/sample-avatar.png" alt="Avatar" className="w-16 h-16 rounded-full" />
          <p className="text-center text-sm">사용자 정보 또는 기타 내용을 넣을 수 있습니다.</p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'light, dark 두 가지 variant 팝오버를 나란히 보여줍니다.',
      },
    },
  },
  render: () => (
    <div className="flex gap-6">
      {/* 라이트 모드 팝오버 */}
      <Popover>
        <PopoverTrigger asChild>
          <FocusableButton variant="outline">Light Variant</FocusableButton>
        </PopoverTrigger>
        <PopoverContent variant="light" className="w-80">
          {/* 제목 */}
          <h3 className="mb-3 text-lg font-semibold">사진 목록</h3>

          {/* 사진 목록 + 더보기 버튼 */}
          <div className="flex items-center gap-2 mb-4">
            <img
              src="/images/sample1.jpg"
              alt="Sample 1"
              className="h-16 w-16 rounded-md object-cover"
            />
            <img
              src="/images/sample2.jpg"
              alt="Sample 2"
              className="h-16 w-16 rounded-md object-cover"
            />
            <img
              src="/images/sample3.jpg"
              alt="Sample 3"
              className="h-16 w-16 rounded-md object-cover"
            />
            {/* 더보기 버튼 */}
            <button
              aria-label="더보기"
              className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition"
              type="button"
            >
              …
            </button>
          </div>

          {/* 버튼 */}
          <FocusableButton className="w-full" variant="default" size="sm">
            확인
          </FocusableButton>
        </PopoverContent>
      </Popover>

      {/* 다크 모드 팝오버 */}
      <Popover>
        <PopoverTrigger asChild>
          <FocusableButton variant="outline">Dark Variant</FocusableButton>
        </PopoverTrigger>
        <PopoverContent variant="dark" className="w-80">
          {/* 제목 */}
          <h3 className="mb-3 text-lg font-semibold text-gray-100">사진 목록</h3>

          {/* 사진 목록 + 더보기 버튼 */}
          <div className="flex items-center gap-2 mb-4">
            <img
              src="/images/sample1.jpg"
              alt="Sample 1"
              className="h-16 w-16 rounded-md object-cover"
            />
            <img
              src="/images/sample2.jpg"
              alt="Sample 2"
              className="h-16 w-16 rounded-md object-cover"
            />
            <img
              src="/images/sample3.jpg"
              alt="Sample 3"
              className="h-16 w-16 rounded-md object-cover"
            />
            {/* 더보기 버튼 */}
            <button
              aria-label="더보기"
              className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 transition"
              type="button"
            >
              …
            </button>
          </div>

          {/* 버튼 */}
          <FocusableButton className="w-full" variant="default" size="sm">
            확인
          </FocusableButton>
        </PopoverContent>
      </Popover>
    </div>
  ),
};
