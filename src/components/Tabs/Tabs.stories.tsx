import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Playground: Story = {
  args: {
    items: [
      { value: 'tab1', label: 'Tab1', content: 'Make changes to your content1 here.' },
      { value: 'tab2', label: 'Tab2', content: 'Change your content2 here.' },
    ],
    defaultValue: 'tab1',
  },
};
