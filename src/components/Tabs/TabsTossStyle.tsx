import { useState } from 'react';
import { cn } from '@/lib/utils';

interface TossTabsProps {
  tabs: string[];
  defaultTab?: string;
  onChange?: (value: string) => void;
}

export const TossTabs = ({ tabs, defaultTab, onChange }: TossTabsProps) => {
  const [selected, setSelected] = useState(defaultTab ?? tabs[0]);

  const handleClick = (tab: string) => {
    setSelected(tab);
    onChange?.(tab);
  };

  return (
    <div className="flex border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleClick(tab)}
          className={cn(
            'flex-1 text-center py-2 text-base transition-all outline-none',
            selected === tab
              ? 'text-brand-darkblue font-bold border-b-2 border-brand-darkblue'
              : 'text-gray-400 font-medium border-b-2 border-transparent',
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
