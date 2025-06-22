import React from 'react';
import { cn } from '@/lib/utils';

export const CouponFrame = ({
  children,
  isUrgent = false,
  className,
}: {
  children: React.ReactNode;
  isUrgent?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 rounded-xl border p-4 shadow-sm transition-all',
        isUrgent && 'border-destructive',
        className,
      )}
    >
      {children}
    </div>
  );
};
