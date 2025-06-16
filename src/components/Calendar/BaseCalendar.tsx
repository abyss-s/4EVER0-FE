// src/components/calendar/BaseCalendar.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { ICONS } from '@/constant/iconPath';

export interface BaseCalendarProps {
  /** 해당 날짜가 출석일인지 판단 */
  markedDates?: (date: Date) => boolean;
  /** 현재 표시할 월 */
  currentMonth?: Date;
  /** 월 변경 콜백 */
  onMonthChange?: (date: Date) => void;
  /** 선택된 날짜 */
  selectedDate?: Date;
  /** 날짜 클릭 콜백 */
  onDateClick?: (date: Date) => void;
  /** 커스텀 날짜 렌더러 */
  renderDay?: (
    date: Date,
    isCurrentMonth: boolean,
    isSelected: boolean,
    isToday: boolean,
  ) => React.ReactNode;
  /** 비활성화할 날짜 판별 함수 */
  isDisabled?: (date: Date) => boolean;
  /** 캘린더 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 헤더 표시 여부 */
  showHeader?: boolean;
  /** 다른 월 날짜 표시 여부 */
  showOutsideDays?: boolean;
  /** 캘린더 테마 */
  variant?: 'default' | 'minimal' | 'modern';
}

export const BaseCalendar: React.FC<BaseCalendarProps> = ({
  currentMonth: controlledMonth,
  onMonthChange,
  selectedDate,
  onDateClick,
  renderDay,
  isDisabled = () => false,
  size = 'md',
  showHeader = true,
  showOutsideDays = true,
  variant = 'modern',
  markedDates,
}) => {
  const [internalMonth, setInternalMonth] = useState(new Date());

  const currentMonth = controlledMonth || internalMonth;
  const setCurrentMonth = (date: Date) => {
    if (onMonthChange) {
      onMonthChange(date);
    } else {
      setInternalMonth(date);
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateClick = (date: Date) => {
    if (isDisabled(date)) return;
    onDateClick?.(date);
  };

  // 캘린더에 표시할 모든 날짜들 계산
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  // 크기별 스타일
  const sizeStyles = {
    sm: {
      container: 'text-sm',
      day: 'h-8 w-8 text-xs',
      header: 'text-sm px-4 py-3',
      dayHeader: 'h-8 text-xs',
      padding: 'p-3',
    },
    md: {
      container: 'text-base',
      day: 'h-11 w-11 text-sm',
      header: 'text-base px-5 py-4',
      dayHeader: 'h-10 text-sm',
      padding: 'p-4',
    },
    lg: {
      container: 'text-lg',
      day: 'h-14 w-14 text-base',
      header: 'text-lg px-6 py-5',
      dayHeader: 'h-12 text-base',
      padding: 'p-5',
    },
  };

  // 테마별 스타일
  const variantStyles = {
    default: {
      container: 'bg-background border border-border rounded-lg shadow-sm',
      header: 'border-b border-border',
      dayButton: 'hover:bg-accent hover:text-accent-foreground',
      selectedDay: 'bg-primary text-primary-foreground hover:bg-primary/90',
      todayDay: 'bg-accent text-accent-foreground font-medium',
    },
    minimal: {
      container: 'bg-background rounded-xl',
      header: 'border-b border-border/50',
      dayButton: 'hover:bg-muted/50',
      selectedDay: 'bg-foreground text-background hover:bg-foreground/90',
      todayDay: 'bg-muted text-foreground font-medium',
    },
    modern: {
      container:
        'bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg shadow-black/5',
      header: 'border-b border-gray-200/50',
      dayButton: 'hover:bg-gray-100/80 hover:scale-105 transition-all duration-200',
      selectedDay: 'bg-gray-900 text-white hover:bg-gray-800 scale-105 shadow-md',
      todayDay: 'bg-blue-50 text-blue-600 font-semibold ring-2 ring-blue-200/50',
    },
  };

  const styles = sizeStyles[size];
  const themeStyles = variantStyles[variant];

  // 기본 날짜 렌더러
  const defaultRenderDay = (
    date: Date,
    isCurrentMonth: boolean,
    isSelected: boolean,
    isToday: boolean,
  ) => (
    <div className="flex flex-col items-center justify-center h-full relative">
      <span
        className={`
        relative z-20 drop-shadow-lg
        ${isSelected ? 'font-bold' : ''}
        ${isToday ? 'text-blue-600' : ''}
      `}
      >
        {format(date, 'd')}
      </span>
      {markedDates?.(date) && isCurrentMonth && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <img
            src={ICONS.STAMP_V1}
            alt="출석 스탬프"
            className="w-[54px] h-[54px] opacity-95 object-contain pointer-events-none"
            style={{
              minWidth: '54px',
              minHeight: '54px',
              maxWidth: '54px',
              maxHeight: '54px',
            }}
          />
        </div>
      )}
    </div>
  );

  // 요일 한글 변환
  const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className={`${themeStyles.container} ${styles.container}`}>
      {/* 헤더 */}
      {showHeader && (
        <div className={`flex items-center justify-between ${themeStyles.header} ${styles.header}`}>
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrevMonth}
            className="h-9 w-9 p-0 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <h2 className="font-bold text-gray-900 tracking-tight">
            {format(currentMonth, 'yyyy년 M월', { locale: ko })}
          </h2>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleNextMonth}
            className="h-9 w-9 p-0 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* 캘린더 본체 */}
      <div className={styles.padding}>
        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 mb-2">
          {dayLabels.map((day, index) => (
            <div
              key={day}
              className={`
                flex items-center justify-center font-medium text-gray-500
                ${index === 0 ? 'text-red-500' : ''} 
                ${index === 6 ? 'text-blue-500' : ''}
                ${styles.dayHeader}
              `}
            >
              {day}
            </div>
          ))}
        </div>

        {/* 날짜들 */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((date, index) => {
            const isCurrentMonthDate = isSameMonth(date, currentMonth);
            const isTodayDate = isToday(date);
            const isSelected =
              selectedDate && format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
            const disabled = isDisabled(date);
            const shouldShow = showOutsideDays || isCurrentMonthDate;
            const dayOfWeek = date.getDay();

            if (!shouldShow) {
              return <div key={index} className={styles.day} />;
            }

            return (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                disabled={disabled}
                className={`
                  ${styles.day} rounded-xl font-medium
                  flex items-center justify-center relative
                  transition-all duration-200 ease-out
                  ${
                    disabled
                      ? 'cursor-not-allowed opacity-30'
                      : `cursor-pointer ${themeStyles.dayButton}`
                  }
                  ${isSelected ? themeStyles.selectedDay : ''}
                  ${isTodayDate && !isSelected ? themeStyles.todayDay : ''}
                  ${
                    !isCurrentMonthDate
                      ? 'text-gray-300 opacity-40'
                      : dayOfWeek === 0
                        ? 'text-red-600'
                        : dayOfWeek === 6
                          ? 'text-blue-600'
                          : 'text-gray-700'
                  }
                  ${isCurrentMonthDate && !disabled && !isSelected ? 'hover:shadow-sm' : ''}
                `}
              >
                {renderDay
                  ? renderDay(date, isCurrentMonthDate, isSelected || false, isTodayDate)
                  : defaultRenderDay(date, isCurrentMonthDate, isSelected || false, isTodayDate)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
