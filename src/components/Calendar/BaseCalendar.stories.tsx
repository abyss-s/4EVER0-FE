// src/stories/BaseCalendar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { BaseCalendar } from './BaseCalendar';
import { useState } from 'react';
import { format } from 'date-fns';

const meta: Meta<typeof BaseCalendar> = {
  title: 'Components/BaseCalendar',
  component: BaseCalendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '모던하고 깔끔한 디자인의 베이스 캘린더 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '캘린더 크기',
    },
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'modern'],
      description: '캘린더 테마',
    },
    showHeader: {
      control: 'boolean',
      description: '헤더 표시 여부',
    },
    showOutsideDays: {
      control: 'boolean',
      description: '다른 월 날짜 표시 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BaseCalendar>;

// 모던 테마 (기본)
export const Modern: Story = {
  args: {
    selectedDate: new Date(),
    variant: 'modern',
    size: 'md',
  },
};

// 미니멀 테마
export const Minimal: Story = {
  args: {
    selectedDate: new Date(),
    variant: 'minimal',
    size: 'md',
  },
};

// 기본 테마
export const Default: Story = {
  args: {
    selectedDate: new Date(),
    variant: 'default',
    size: 'md',
  },
};

// 인터랙티브 모던 캘린더
export const InteractiveModern: Story = {
  render: (args) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

    return (
      <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center">
        <BaseCalendar
          {...args}
          variant="modern"
          selectedDate={selectedDate}
          onDateClick={setSelectedDate}
        />
      </div>
    );
  },
};

// 스탬프/이벤트가 있는 캘린더 예시
// 이벤트 표시만 있는 캘린더
export const WithEventsOnly: Story = {
  args: {
    variant: 'modern',
    selectedDate: new Date(),
    renderDay: (date, isCurrentMonth) => (
      <div className="flex flex-col items-center justify-center h-full relative">
        <span className="relative z-10">{format(date, 'd')}</span>
        {/* 특정 날짜에 이벤트 표시 */}
        {[5, 10, 15, 20, 25].includes(date.getDate()) && isCurrentMonth && (
          <div className="absolute bottom-1 flex gap-0.5">
            <div className="w-1.5 h-1.5 bg-rose-400 rounded-full" />
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
          </div>
        )}
      </div>
    ),
  },
};

// 출석 스탬프만 있는 캘린더
export const WithStampOnly: Story = {
  args: {
    variant: 'modern',
    selectedDate: new Date(),
    renderDay: (date, isCurrentMonth) => (
      <div className="flex flex-col items-center justify-center h-full relative">
        <span className="relative z-20 drop-shadow-lg">{format(date, 'd')}</span>
        {/* 출석 스탬프 */}
        {[3, 8, 12, 18, 22].includes(date.getDate()) && isCurrentMonth && (
          <div className="absolute -inset-2 flex items-center justify-center z-10">
            <img src="/icons/stamp_v1.svg" alt="출석 스탬프" className="w-14 h-14 opacity-95" />
          </div>
        )}
      </div>
    ),
  },
};

// 현재 크기 (WithLargeOverflowStamp와 동일)
export const WithMediumStamp: Story = {
  args: {
    variant: 'modern',
    selectedDate: new Date(),
    renderDay: (date, isCurrentMonth) => (
      <div className="flex flex-col items-center justify-center h-full relative">
        <span className="relative z-20 drop-shadow-lg">{format(date, 'd')}</span>
        {[3, 8, 12, 18, 22].includes(date.getDate()) && isCurrentMonth && (
          <div className="absolute -inset-2 flex items-center justify-center z-10">
            <img src="/icons/stamp_v1.svg" alt="출석 스탬프" className="w-14 h-14 opacity-95" />
          </div>
        )}
      </div>
    ),
  },
};

// 더 큰 크기 (살짝 더 큰 버전)
export const WithLargeStamp: Story = {
  args: {
    variant: 'modern',
    selectedDate: new Date(),
    renderDay: (date, isCurrentMonth) => (
      <div className="flex flex-col items-center justify-center h-full relative">
        <span className="relative z-20 drop-shadow-lg">{format(date, 'd')}</span>
        {[3, 8, 12, 18, 22].includes(date.getDate()) && isCurrentMonth && (
          <div className="absolute -inset-3 flex items-center justify-center z-10">
            <img src="/icons/stamp_v1.svg" alt="출석 스탬프" className="w-16 h-16 opacity-95" />
          </div>
        )}
      </div>
    ),
  },
};

// 이벤트 + 스탬프 조합 (기존 WithEvents 개선)
export const WithEventsAndStamp: Story = {
  args: {
    variant: 'modern',
    selectedDate: new Date(),
    renderDay: (date, isCurrentMonth) => (
      <div className="flex flex-col items-center justify-center h-full relative">
        <span className="relative z-20 drop-shadow-lg">{format(date, 'd')}</span>
        {/* 특정 날짜에 이벤트 표시 */}
        {[5, 10, 15, 20, 25].includes(date.getDate()) && isCurrentMonth && (
          <div className="absolute bottom-1 flex gap-0.5 z-30">
            <div className="w-1.5 h-1.5 bg-rose-400 rounded-full" />
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
          </div>
        )}
        {/* 출석 스탬프 */}
        {[3, 8, 12, 18, 22].includes(date.getDate()) && isCurrentMonth && (
          <div className="absolute -inset-2 flex items-center justify-center z-10">
            <img src="/icons/stamp_v1.svg" alt="출석 스탬프" className="w-14 h-14 opacity-95" />
          </div>
        )}
      </div>
    ),
  },
};

// 큰 크기 모던
export const LargeModern: Story = {
  args: {
    selectedDate: new Date(),
    variant: 'modern',
    size: 'lg',
  },
};

// 비활성화된 날짜들
export const WithDisabledDates: Story = {
  args: {
    selectedDate: new Date(),
    variant: 'modern',
    isDisabled: (date) => {
      // 주말 비활성화 예시
      const day = date.getDay();
      return day === 0 || day === 6;
    },
  },
};

// 작은 크기
export const SmallSize: Story = {
  args: {
    selectedDate: new Date(),
    variant: 'modern',
    size: 'sm',
  },
};

// 헤더 없는 버전
export const NoHeader: Story = {
  args: {
    selectedDate: new Date(),
    variant: 'modern',
    showHeader: false,
  },
};

// 다른 월 날짜 숨김
export const HideOutsideDays: Story = {
  args: {
    selectedDate: new Date(),
    variant: 'modern',
    showOutsideDays: false,
  },
};
