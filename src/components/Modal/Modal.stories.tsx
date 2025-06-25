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

type ModalSize = VariantProps<typeof contentVariants>['size'];

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '다양한 유형의 모달 컴포넌트입니다. 기본 모달, 확인 모달, 폼 모달 등 다양한 패턴을 지원합니다.',
      },
    },
  },
  argTypes: {
    defaultOpen: {
      control: 'boolean',
      description: '모달의 기본 열림 상태를 설정합니다.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

interface PlaygroundArgs {
  defaultOpen?: boolean;
}

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 모달 예시입니다. X 버튼과 취소/저장 버튼이 모두 있는 일반적인 패턴입니다.',
      },
    },
  },
  render: (args: PlaygroundArgs) => (
    <Modal {...args}>
      <ModalTrigger asChild>
        <Button>Open Modal</Button>
      </ModalTrigger>
      <ModalContent variant="default" size="default">
        <ModalHeader>
          <ModalTitle>Edit Profile</ModalTitle>
          <ModalDescription>모달 설명을 여기다 적음</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Save changes</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
  args: {
    defaultOpen: false,
  },
};

export const ConfirmationModal: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '확인 모달입니다. 중요한 액션에 대한 확인을 받을 때 사용하며, X 버튼 없이 명시적인 선택만 가능합니다.',
      },
    },
  },
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </ModalTrigger>
      <ModalContent variant="default" size="sm" showClose={false}>
        <ModalHeader>
          <ModalTitle>Delete Account</ModalTitle>
          <ModalDescription>
            계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없으며 모든 데이터가 영구적으로 삭제됩니다.
          </ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete Account</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const AlertModal: Story = {
  parameters: {
    docs: {
      description: {
        story: '알림 모달입니다. 정보 전달 목적으로 사용하며, X 버튼 없이 확인 버튼만 제공합니다.',
      },
    },
  },
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Show Alert</Button>
      </ModalTrigger>
      <ModalContent variant="default" size="sm" showClose={false}>
        <ModalHeader>
          <ModalTitle>Success</ModalTitle>
          <ModalDescription>
            작업이 성공적으로 완료되었습니다. 이메일로 확인 메시지를 발송했습니다.
          </ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <Button className="w-full">OK</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const InformationModal: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '정보 표시 모달입니다. 내용을 읽고 X 버튼으로 닫을 수 있으며, 별도의 액션 버튼은 없습니다.',
      },
    },
  },
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="outline">View Terms</Button>
      </ModalTrigger>
      <ModalContent variant="default" size="lg">
        <ModalHeader>
          <ModalTitle>Terms of Service</ModalTitle>
          <ModalDescription>
            서비스 이용약관을 확인해주세요. 궁금한 점이 있으시면 고객센터로 문의하세요.
          </ModalDescription>
        </ModalHeader>
        <div className="max-h-96 overflow-y-auto py-4">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="font-semibold mb-2">1. Service Usage</h3>
              <p>
                This service is provided for legitimate business purposes only. Users must comply
                with all applicable laws and regulations.
              </p>
            </section>
          </div>
        </div>
        {/* X 버튼으로만 닫을 수 있는 모달 - 푸터 없음 */}
      </ModalContent>
    </Modal>
  ),
};

export const AllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: '다양한 크기의 모달을 보여줍니다. sm, default, lg, xl 크기를 지원합니다.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(['sm', 'default', 'lg', 'xl'] as ModalSize[]).map((size) => (
        <Modal key={size}>
          <ModalTrigger asChild>
            <Button variant="outline">Size: {size}</Button>
          </ModalTrigger>
          <ModalContent size={size}>
            <ModalHeader>
              <ModalTitle>Modal Size: {size}</ModalTitle>
              <ModalDescription>
                이 모달은 {size} 크기로 설정되어 있습니다. 콘텐츠에 따라 적절한 크기를 선택하세요.
              </ModalDescription>
            </ModalHeader>
            <div className="py-4">
              <p>
                Content scales with the {size} size. This helps you choose the right size for your
                content.
              </p>
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
