import type { Meta, StoryObj } from '@storybook/react';
import { FlatTabs } from './FlatTabs';
import { useState } from 'react';

const meta: Meta<typeof FlatTabs> = {
  title: 'Components/TossTabs',
  component: FlatTabs,
  tags: ['autodocs'],
  argTypes: {
    defaultTab: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof FlatTabs>;

export const Playground: Story = {
  render: (args) => {
    const [selected, setSelected] = useState(args.defaultTab ?? args.tabs[0]);

    return (
      <div>
        <FlatTabs {...args} onChange={setSelected} />
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-700">
            선택된 탭: <strong>{selected}</strong>
          </p>
        </div>
      </div>
    );
  },
  args: {
    tabs: ['출석', '유플투쁠', '미션'],
    defaultTab: '출석',
  },
};
