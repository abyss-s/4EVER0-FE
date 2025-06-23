import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: {
    docs: {
      description: {
        component: '사용자의 현재 진행 상태를 단계별로 시각화해주는 스텝 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const stepOrder = ['STEP 1', 'STEP 2', 'STEP 3'];

export const Default: Story = {
  args: {
    stepOrder: ['STEP 1', 'STEP 2', 'STEP 3'],
    currentStep: 'STEP 1',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 스텝퍼 - 첫 번째 단계가 현재 단계로 표시됩니다.',
      },
    },
  },
};

export const Step1: Story = {
  args: {
    stepOrder,
    currentStep: 'STEP 1',
  },
};

export const Step2: Story = {
  args: {
    stepOrder,
    currentStep: 'STEP 2',
  },
};

export const Step3: Story = {
  args: {
    stepOrder,
    currentStep: 'STEP 3',
  },
};
