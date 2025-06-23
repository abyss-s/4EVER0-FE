import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const stepOrder = ['STEP 1', 'STEP 2', 'STEP 3'];

export const Default: Story = {
  args: {
    stepOrder: ['STEP 1', 'STEP 2', 'STEP 3'],
    currentStep: 'STEP 1',
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
