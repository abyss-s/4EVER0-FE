import type { Meta, StoryObj } from '@storybook/react';
import { ScrollToTopButton } from './ScrollToTopButton';
import { useEffect, useRef } from 'react';
import { useScrollStore } from '@/stores/useScrollStore';

const meta: Meta<typeof ScrollToTopButton> = {
  title: 'Components/ScrollToTopButton',
  component: ScrollToTopButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '스크롤 위치가 일정 이상일 때 상단으로 올라가는 버튼을 보여주는 컴포넌트입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ScrollToTopButton>;

export const Default: Story = {
  render: () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const setY = useScrollStore((s) => s.setY);

    useEffect(() => {
      const el = scrollRef.current;
      if (!el) return;

      const handleScroll = () => {
        setY(el.scrollTop);
      };

      el.addEventListener('scroll', handleScroll);
      return () => el.removeEventListener('scroll', handleScroll);
    }, [setY]);

    return (
      <div className="relative h-[500px] overflow-y-auto border rounded" ref={scrollRef}>
        <div className="space-y-4 p-4">
          {Array.from({ length: 100 }).map((_, i) => (
            <p key={i} className="text-sm">
              Lorem ipsum dolor sit amet. #{i + 1}
            </p>
          ))}
        </div>

        <ScrollToTopButton scrollRef={scrollRef} />
      </div>
    );
  },
};
