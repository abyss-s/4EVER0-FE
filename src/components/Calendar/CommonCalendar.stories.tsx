// stories/CommonCalendar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { CommonCalendar } from '@/components/Calendar';

const meta: Meta<typeof CommonCalendar> = {
  component: CommonCalendar,
  title: 'Components/CommonCalendar',
};
export default meta;

type Story = StoryObj<typeof CommonCalendar>;
export const Default: Story = {
  args: {
    variant: 'uplus',
  },
};
