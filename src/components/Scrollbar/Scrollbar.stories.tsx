import type { Meta, StoryObj } from '@storybook/react';
import { Scrollbar } from './Scrollbar';

const meta: Meta<typeof Scrollbar> = {
  title: 'Components/Scrollbar',
  component: Scrollbar,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    children: { control: 'text' },
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
    className: '',
  },
};

export const SmallScrollArea: Story = {
  render: () => <Scrollbar className="h-[100px] w-[300px]">{longText}</Scrollbar>,
};

export const LargeScrollArea: Story = {
  render: () => <Scrollbar className="h-[300px] w-[500px]">{longText}</Scrollbar>,
};
