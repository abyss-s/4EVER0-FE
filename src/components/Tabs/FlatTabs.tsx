import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface FlatTabsProps {
  tabs: string[];
  defaultTab?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const FlatTabs = ({ tabs, defaultTab, value, onChange, className }: FlatTabsProps) => {
  const isControlled = value !== undefined;

  const [selected, setSelected] = useState(defaultTab ?? tabs[0]);

  useEffect(() => {
    if (isControlled) {
      setSelected(value!);
    }
  }, [value, isControlled]);

  const handleClick = (tab: string) => {
    if (!isControlled) {
      setSelected(tab);
    }
    onChange?.(tab);
  };

  return (
    <div className={cn('flex border-b border-gray-200', className)}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleClick(tab)}
          className={cn(
            'flex-1 text-center py-2 text-xl transition-all duration-200 outline-none',
            selected === tab
              ? 'font-bold text-brand-darkblue'
              : 'font-medium text-gray-400 border-b-2 border-transparent',
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
