import { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/Button';
import { sonnerToast, Sooner } from '@/components/Sooner';

const meta: Meta<typeof Button> = {
  title: 'COMPONENTS/Sooner',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const ShowSoonerToast: Story = {
  render: () => (
    <>
      <Sooner position="top-center" />
      <Button onClick={() => sonnerToast('로그아웃되었습니다.')}>로그아웃 테스트</Button>
    </>
  ),
};

export const CustomSooner: Story = {
  name: 'Toast + Close (텍스트+닫기버튼)',
  render: () => (
    <>
      <Sooner position="top-center" />
      <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={() =>
            sonnerToast.custom((t) => (
              <div className="w-full flex justify-center px-4">
                <div className="bg-white border border-gray-200 rounded-md shadow-md px-4 py-3 flex items-center gap-3 animate-fadeIn max-w-md w-full">
                  <div className="text-sm text-gray-800">로그아웃되었어요.</div>
                  <button
                    onClick={() => sonnerToast.dismiss(t)}
                    className="ml-auto text-xs text-gray-400 hover:text-gray-600"
                  >
                    닫기
                  </button>
                </div>
              </div>
            ))
          }
          variant="default"
        >
          BUTTON
        </Button>
      </div>
    </>
  ),
};
