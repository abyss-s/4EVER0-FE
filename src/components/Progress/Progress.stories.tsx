import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from './Progress';
import type { VariantProps } from 'class-variance-authority';
import { progressVariants } from './progressVariants';

type ProgressSize = VariantProps<typeof progressVariants>['size'];

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        // s
        'data',
        'call',
        'sharedData',
        'sms',
        'mission',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    current: {
      control: { type: 'number', min: 0, max: 20, step: 1 },
    },
    total: {
      control: { type: 'number', min: 1, max: 20, step: 1 },
    },
    showFraction: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Playground: Story = {
  args: {
    current: 5,
    total: 10,
    variant: 'mission',
    size: 'default',
    showFraction: true,
  },
};

export const PlanVariants: Story = {
  name: '요금제용 진행도',
  render: () => (
    <div className="space-y-6 p-6">
      <h3 className="text-lg font-semibold">요금제 사용량</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>데이터 사용량</span>
            <span>4GB / 8GB</span>
          </div>
          <Progress variant="data" value={72} />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>통화 시간</span>
            <span>무제한 + 부가통화 300분</span>
          </div>
          <Progress variant="call" value={85} />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>공유데이터</span>
            <span>테더링+쉐어링 55GB</span>
          </div>
          <Progress variant="sharedData" value={75} />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>문자 발송</span>
            <span>180개 / 200개</span>
          </div>
          <Progress variant="sms" value={90} />
        </div>
      </div>
    </div>
  ),
};

export const MissionProgress: Story = {
  name: '미션 진행도',
  render: () => (
    <div className="space-y-6 p-6">
      <h3 className="text-lg font-semibold">미션 진행도</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">MoonoZ 친구와 함께하기</p>
          <Progress variant="mission" size="lg" current={7} total={10} showFraction={true} />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Hot플 컨텐츠 친구에게 공유</p>
          <Progress variant="mission" size="lg" current={3} total={5} showFraction={true} />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">UBTI 결과 친구에게 공유</p>
          <Progress variant="mission" size="lg" current={4} total={6} showFraction={true} />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">출석 연속 25일 달성</p>
          <Progress variant="mission" size="lg" current={6} total={8} showFraction={true} />
        </div>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 p-6">
      <h3 className="text-lg font-semibold mb-4">모든 Variants</h3>
      <div className="space-y-4">
        {[
          { variant: 'default', label: 'Default' },
          { variant: 'secondary', label: 'Secondary' },
          { variant: 'data', label: '데이터' },
          { variant: 'call', label: '음성통화' },
          { variant: 'sharedData', label: '공유데이터' },
          { variant: 'sms', label: '문자메시지' },
          { variant: 'mission', label: '미션 진행도' },
        ].map((item) => (
          <div key={item.variant} className="space-y-2">
            <p className="text-sm font-medium">{item.label}</p>
            <Progress
              variant={item.variant as VariantProps<typeof progressVariants>['variant']}
              value={65}
            />
          </div>
        ))}
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      {(['sm', 'default', 'lg', 'xl'] as ProgressSize[]).map((size) => (
        <div key={size} className="space-y-2">
          <p className="text-sm font-medium capitalize">{size}</p>
          <Progress size={size} variant="mission" current={3} total={5} showFraction={true} />
        </div>
      ))}
    </div>
  ),
};

export const WithoutFraction: Story = {
  name: '분수 표시가 없는 버전',
  render: () => (
    <div className="space-y-4">
      <Progress variant="mission" current={7} total={10} showFraction={false} />
      <Progress variant="data" value={65} />
      <Progress variant="call" value={85} />
    </div>
  ),
};
