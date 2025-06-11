import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/Button';
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from './Modal';
import type { VariantProps } from 'class-variance-authority';
import { contentVariants } from './modalVariants';

type ModalVariant = VariantProps<typeof contentVariants>['variant'];
type ModalSize = VariantProps<typeof contentVariants>['size'];

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    defaultOpen: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

interface PlaygroundArgs {
  defaultOpen?: boolean;
}

export const Playground: Story = {
  render: (args: PlaygroundArgs) => (
    <Modal {...args}>
      <ModalTrigger asChild>
        <Button>Open Modal</Button>
      </ModalTrigger>
      <ModalContent variant="default" size="default">
        <ModalHeader>
          <ModalTitle>Modal Title</ModalTitle>
          <ModalDescription>
            This is a modal description. You can add any content here.
          </ModalDescription>
        </ModalHeader>
        <div className="grid gap-4 py-4">
          <p>Modal content goes here...</p>
        </div>
        <ModalFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Save changes</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {[
        { variant: 'default', label: 'Default' },
        { variant: 'minimal', label: 'Minimal' },
        { variant: 'drawer', label: 'Drawer' },
      ].map((item) => (
        <Modal key={item.variant}>
          <ModalTrigger asChild>
            <Button variant="outline">{item.label}</Button>
          </ModalTrigger>
          <ModalContent variant={item.variant as ModalVariant}>
            <ModalHeader>
              <ModalTitle>{item.label} Modal</ModalTitle>
              <ModalDescription>
                This is a {item.label.toLowerCase()} variant modal.
              </ModalDescription>
            </ModalHeader>
            <div className="py-4">
              <p>Content for {item.label} modal...</p>
            </div>
            <ModalFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Confirm</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(['sm', 'default', 'lg', 'xl'] as ModalSize[]).map((size) => (
        <Modal key={size}>
          <ModalTrigger asChild>
            <Button variant="outline">Size: {size}</Button>
          </ModalTrigger>
          <ModalContent size={size}>
            <ModalHeader>
              <ModalTitle>Size: {size}</ModalTitle>
              <ModalDescription>This modal has size variant: {size}</ModalDescription>
            </ModalHeader>
            <div className="py-4">
              <p>Content scales with the {size} size...</p>
            </div>
            <ModalFooter>
              <Button>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ))}
    </div>
  ),
};

export const FormModal: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Create Account</Button>
      </ModalTrigger>
      <ModalContent variant="default" size="lg">
        <ModalHeader>
          <ModalTitle>Create your account</ModalTitle>
          <ModalDescription>Enter your information to create a new account.</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Create Account</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const ConfirmationModal: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="destructive">Delete Item</Button>
      </ModalTrigger>
      <ModalContent variant="minimal" size="sm">
        <ModalHeader>
          <ModalTitle>Are you sure?</ModalTitle>
          <ModalDescription>
            This action cannot be undone. This will permanently delete the item.
          </ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};
