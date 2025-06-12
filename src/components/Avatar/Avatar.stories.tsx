import type { Meta, StoryObj } from '@storybook/react';
import { AvatarComponent } from './Avatar';

const meta: Meta<typeof AvatarComponent> = {
  title: 'Components/Avatar',
  component: AvatarComponent,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    fallback: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof AvatarComponent>;

export const Playground: Story = {
  args: {
    src: 'https://www.studiopeople.kr/common/img/default_profile.png',
    fallback: 'CN',
  },
};

export const NoImage: Story = {
  args: {
    src: '',
    fallback: 'AB',
  },
};
