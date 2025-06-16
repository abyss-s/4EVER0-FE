import type { Meta, StoryObj } from '@storybook/react';
import { Scrollbar } from './Scrollbar';

const meta: Meta<typeof Scrollbar> = {
  title: 'Components/Scrollbar',
  component: Scrollbar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'auto'],
    },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Scrollbar>;

const longText = `
Jokester began sneaking into the castle in the middle of the night and leaving jokes all over...
Jokester began sneaking into the castle in the middle of the night and leaving jokes all over...
Jokester began sneaking into the castle in the middle of the night and leaving jokes all over...
Jokester began sneaking into the castle in the middle of the night and leaving jokes all over...
Jokester began sneaking into the castle in the middle of the night and leaving jokes all over...
Jokester began sneaking into the castle in the middle of the night and leaving jokes all over...
(반복 20줄 이상)
`;

export const Playground: Story = {
  args: {
    children: longText,
    size: 'default',
  },
};
