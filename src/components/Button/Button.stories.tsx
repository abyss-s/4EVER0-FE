import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { buttonVariants } from './buttonVariants';
import type { VariantProps } from 'class-variance-authority';

type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
type ButtonSize = VariantProps<typeof buttonVariants>['size'];

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
        'login',
        'missionStatus',
      ],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon', 'badge'],
    },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(
        [
          'default',
          'destructive',
          'outline',
          'secondary',
          'ghost',
          'link',
          'login',
          'missionStatus',
        ] as ButtonVariant[]
      ).map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      {(['sm', 'default', 'lg', 'icon', 'badge'] as ButtonSize[]).map((size) => (
        <Button key={size} size={size}>
          {size === 'icon' ? '⭐️' : size}
        </Button>
      ))}
    </div>
  ),
};

export const MissionStatus: Story = {
  render: () => (
    <div className="flex gap-3">
      <Button variant="missionStatus" size="badge">
        진행 중
      </Button>
      <Button variant="missionStatus" size="badge">
        이미 수령
      </Button>
      <Button variant="missionStatusCom" size="badge">
        🪙 수령하기
      </Button>
    </div>
  ),
};

export const MapButtons: Story = {
  render: () => (
    <div className="flex gap-3">
      <Button variant="map" size="default">
        <span>📍</span>
        <span>내 위치로 찾기&ensp;</span>
      </Button>
      <Button variant="map" size="default">
        <span>🗺️</span>
        <span>전체 보기</span>
      </Button>
    </div>
  ),
};
