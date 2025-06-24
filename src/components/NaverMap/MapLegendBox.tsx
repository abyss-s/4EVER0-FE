import React from 'react';
import { cn } from '@/lib/utils';

interface MapLegendBoxProps {
  children: React.ReactNode;
  className?: string;
}

export const MapLegendBox: React.FC<MapLegendBoxProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'bg-white border border-gray-200 text-gray-700 rounded-md text-sm font-medium shadow-sm px-4 py-2 transition-shadow dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600',
        className,
      )}
    >
      {children}
    </div>
  );
};
