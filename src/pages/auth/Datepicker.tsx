import * as React from 'react';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

function formatDate(date: Date | undefined) {
  if (!date) return '';
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
function isValidDate(date: Date | undefined) {
  if (!date) return false;
  return !isNaN(date.getTime());
}

interface Calendar28Props {
  value: Date | null;
  onChange: (date: Date | null) => void;
  label?: string;
  placeholder?: string;
}

export function Calendar28({
  value,
  onChange,
  label = '생년월일',
  placeholder = 'June 01, 2025',
}: Calendar28Props) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>(value ?? undefined);
  const [inputValue, setInputValue] = React.useState(formatDate(value ?? undefined));

  React.useEffect(() => {
    console.log('Popover open:', open);
  }, [open]);

  React.useEffect(() => {
    setInputValue(formatDate(value ?? undefined));
    setMonth(value ?? undefined);
  }, [value]);

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
            const date = new Date(e.target.value);
            setInputValue(e.target.value);
            if (isValidDate(date)) {
              onChange(date);
              setMonth(date);
            } else {
              onChange(null);
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
              selected={value ?? undefined}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                onChange(date ?? null);
                setInputValue(formatDate(date ?? undefined));
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
