// components/Calendar/CommonCalendar.tsx
import { Calendar } from '@/components/ui/calendar';
import { CalendarDay } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type CalendarVariant = 'attendance' | 'uplus';

interface CommonCalendarProps {
  variant: CalendarVariant;
  markedDates?: Date[]; // 도장/혜택 날짜들
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
}

export function CommonCalendar({
  variant,
  markedDates = [],
  selected,
  onSelect,
}: CommonCalendarProps) {
  const [internalSelected, setInternalSelected] = useState<Date | undefined>(selected);

  const handleSelect = (date: Date | undefined) => {
    setInternalSelected(date);
    onSelect?.(date);
  };

  const modifiers = {
    marked: (date: Date) => markedDates.some((d) => d.toDateString() === date.toDateString()),
  };

  const modifiersClassNames = {
    marked:
      variant === 'attendance'
        ? 'bg-green-100 text-green-700 font-semibold'
        : 'bg-yellow-100 text-yellow-800 font-semibold',
  };

  const components = {
    Day: (props: any) => {
      const isMarked = modifiers.marked(props.day);
      const stamp = variant === 'attendance' ? '✅' : '🎁';

      return (
        <div {...props} className={cn(props.className, 'relative')}>
          {props.day.getDate()}
          {isMarked && (
            <span className="absolute bottom-0 right-0 text-[10px] pointer-events-none">
              {stamp}
            </span>
          )}
        </div>
      );
    },
  };

  return (
    <div className="rounded-md border p-4 shadow-sm bg-white w-fit">
      <Calendar
        selected={internalSelected}
        onSelect={handleSelect}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        components={components}
        showOutsideDays
      />
    </div>
  );
}
