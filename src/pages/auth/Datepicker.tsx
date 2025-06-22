import * as React from 'react';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Calendar28Props {
  value: string; // YYYY-MM-DD
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export function Calendar28({
  value,
  onChange,
  label = '생년월일',
  placeholder = '예: 2025-06-01',
}: Calendar28Props) {
  const [open, setOpen] = React.useState(false);
  const parsedDate = value ? new Date(value) : undefined;

  const [month, setMonth] = React.useState<Date | undefined>(parsedDate);
  const [inputValue, setInputValue] = React.useState(value);

  React.useEffect(() => {
    setInputValue(value);
    setMonth(parsedDate);
  }, [value]);

  const toDateString = (date: Date) => {
    const offsetMs = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offsetMs).toISOString().substring(0, 10);
  };

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1 flex items-center gap-2 text-slate-700 font-medium">
        <CalendarIcon className="w-4 h-4 text-slate-700" />
        {label}
      </Label>
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={inputValue}
          placeholder={placeholder}
          className="bg-background pr-10 h-12"
          onChange={(e) => {
            setInputValue(e.target.value);
            const newDate = new Date(e.target.value);
            if (!isNaN(newDate.getTime())) {
              const formatted = toDateString(newDate);
              onChange(formatted);
              setMonth(newDate);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="absolute top-1/2 right-2 w-10 h-10 -translate-y-1/2 flex items-center justify-center rounded"
            >
              <CalendarIcon className="w-8 h-8 text-slate-700" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0 border-gray-200 z-[1000]"
            align="end"
            alignOffset={-10}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={parsedDate}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                if (date) {
                  const formatted = toDateString(date);
                  setInputValue(formatted);
                  onChange(formatted);
                  setOpen(false);
                }
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
