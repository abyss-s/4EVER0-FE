import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import TopNav from './TopNav';
import BottomNav from './BottomNav';

const meta: Meta = {
  title: 'Layout/LayoutWithNav',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'TopNav과 BottomNav를 포함한 단일 페이지 레이아웃 예시입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    return (
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={
              <section className="relative min-h-[100dvh] w-full bg-background text-foreground">
                <div className="mx-auto w-full max-w-full sm:max-w-[600px] bg-background pt-[56px] pb-[56px]">
                  <TopNav />
                  <main
                    className="px-4 sm:px-6 py-4 overflow-y-auto"
                    style={{
                      height: 'calc(100dvh - 112px)',
                      WebkitOverflowScrolling: 'touch',
                      overscrollBehavior: 'contain',
                    }}
                  >
                    <div className="text-center text-sm text-gray-500">
                      여기는 Outlet 자리입니다. <br />
                      상단 TopNav, 하단 BottomNav가 함께 포함된 전체 레이아웃을 시연합니다.
                    </div>
                  </main>
                  <BottomNav />
                </div>
              </section>
            }
          />
        </Routes>
      </MemoryRouter>
    );
  },
};

export const TopNavOnly: Story = {
  name: 'TopNav',
  render: () => (
    <MemoryRouter>
      <div className="relative h-[100dvh] bg-white">
        <TopNav />
      </div>
    </MemoryRouter>
  ),
};

export const BottomNavOnly: Story = {
  name: 'BottomNav',
  render: () => (
    <MemoryRouter>
      <div className="relative h-[100dvh] bg-white">
        <BottomNav />
      </div>
    </MemoryRouter>
  ),
};
