import { cn } from '@/lib/utils';
import { badgeVariants } from './badgeVariants';
import type { BadgeProps } from './Badge.types';

export function Badge({ className, variant, size, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {children}
    </div>
  );
}
