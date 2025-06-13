import { useState, useMemo } from 'react';
import {
  addMonths,
  subMonths,
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from 'date-fns';

export interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  color?: string;
}

export const useCalendar = (initialDate: Date = new Date()) => {
  const [currentMonth, setCurrentMonth] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialDate);

  const monthDays = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const goToPrevMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDate(today);
  };

  const getMonthYear = () => {
    return format(currentMonth, 'yyyy년 MM월');
  };

  return {
    currentMonth,
    selectedDate,
    monthDays,
    setSelectedDate,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    getMonthYear,
  };
};
