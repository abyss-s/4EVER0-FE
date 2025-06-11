import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '../ui/alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Playground: Story = {
  args: {
    variant: 'default',
    children: 'Heads up! You can add components to your app using the CLI.',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Your session has expired. Please log in again.',
  },
};
