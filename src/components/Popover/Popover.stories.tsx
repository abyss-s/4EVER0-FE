// src/stories/Popover.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    size: { table: { disable: true } },
    align: { table: { disable: true } },
    showArrow: { table: { disable: true } },
    open: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component: `
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Popover>;

// 기본 토글 스토리
export const Default: Story = {
  render: () => (
    <div className="p-8 flex justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent forceMount className="w-64">
          <p className="mb-2">This is a basic Popover.</p>
          {/* <PopoverClose asChild>
            <Button variant="ghost" size="sm">
              Close
            </Button>
          </PopoverClose> */}
        </PopoverContent>
      </Popover>
    </div>
  ),
};

// 크기 Variant 스토리
export const SizeVariants: Story = {
  name: '크기 Variants',
  render: () => (
    <div className="space-y-4 p-8">
      {(['w-48', 'w-64', 'w-80'] as const).map((width) => (
        <Popover key={width}>
          <PopoverTrigger asChild>
            <Button>{width}</Button>
          </PopoverTrigger>
          <PopoverContent className={`${width}`}>{`width ${width}`}</PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};

// 정렬 Variant 스토리
export const AlignVariants: Story = {
  name: '정렬 Variants',
  render: () => (
    <div className="flex space-x-6 p-8 justify-center">
      {(['start', 'center', 'end'] as const).map((align) => (
        <Popover key={align}>
          <PopoverTrigger asChild>
            <Button>{align}</Button>
          </PopoverTrigger>
          <PopoverContent sideOffset={10} align={align} className="w-64">
            {`aligned ${align}`}
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};

// Form 예시 스토리
export const FormExample: Story = {
  name: 'Form Example',
  render: () => (
    <div className="p-8 flex justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="leading-none font-medium">Dimensions</h4>
              <p className="text-muted-foreground text-sm">Set the dimensions for the layer.</p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="width">Width</Label>
                <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="maxWidth">Max. width</Label>
                <Input id="maxWidth" defaultValue="300px" className="col-span-2 h-8" />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="height">Height</Label>
                <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="maxHeight">Max. height</Label>
                <Input id="maxHeight" defaultValue="none" className="col-span-2 h-8" />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};
