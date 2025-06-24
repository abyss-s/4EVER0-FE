import { cn } from '@/lib/utils';
import React from 'react';

interface MapLegendBoxProps {
  children: React.ReactNode;
  className?: string;
}

export const MapLegendBox: React.FC<MapLegendBoxProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center gap-1.5 px-3 py-2 h-9 rounded-md bg-white border border-gray-200 text-gray-700 text-sm font-medium shadow-sm dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600',
        className,
      )}
    >
      {children}
    </div>
  );
};
