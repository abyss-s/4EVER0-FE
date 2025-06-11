import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from './Progress';
import { progressVariants } from './progressVariants';
import type { VariantProps } from 'class-variance-authority';

type ProgressVariant = VariantProps<typeof progressVariants>['variant'];
type ProgressSize = VariantProps<typeof progressVariants>['size'];

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'success', 'warning', 'destructive', 'accent'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Playground: Story = {
  args: {
    value: 50,
    variant: 'default',
    size: 'default',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      {(
        ['default', 'secondary', 'success', 'warning', 'destructive', 'accent'] as ProgressVariant[]
      ).map((variant) => (
        <div key={variant} className="space-y-2">
          <p className="text-sm font-medium capitalize">{variant}</p>
          <Progress variant={variant} value={65} />
        </div>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      {(['sm', 'default', 'lg', 'xl'] as ProgressSize[]).map((size) => (
        <div key={size} className="space-y-2">
          <p className="text-sm font-medium capitalize">{size}</p>
          <Progress size={size} value={75} />
        </div>
      ))}
    </div>
  ),
};

export const ProgressSteps: Story = {
  render: () => (
    <div className="space-y-4">
      {[0, 25, 50, 75, 100].map((value) => (
        <div key={value} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{value}%</span>
          </div>
          <Progress value={value} />
        </div>
      ))}
    </div>
  ),
};
