import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@/lib/utils';
import { progressVariants } from './progressVariants';
import type { ProgressProps } from './Progress.types';

export function Progress({
  className,
  value,
  variant,
  size,
  current,
  total,
  showFraction = false,
  ...props
}: ProgressProps) {
  const rawValue =
    current != null && total != null && total > 0
      ? (current / total) * 100
      : typeof value === 'number'
        ? value
        : 0;

  const progressValue =
    typeof rawValue === 'number' && !Number.isNaN(rawValue)
      ? Math.min(Math.max(rawValue, 0), 100)
      : undefined;

  return (
    <div className="relative">
      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn(progressVariants({ variant, size, className }))}
        {...props}
        value={progressValue}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className="h-full w-full flex-1 transition-all"
          style={{ transform: `translateX(-${100 - (progressValue || 0)}%)` }}
        />
      </ProgressPrimitive.Root>

      {showFraction && current !== undefined && total !== undefined && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 px-2 py-0.5 rounded backdrop-blur-sm">
            {current}/{total}
          </span>
        </div>
      )}
    </div>
  );
}
