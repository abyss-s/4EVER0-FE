import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import type { SkeletonProps } from '../Skeleton/Skeleton.types';

export function Skeleton({ className, asChild = false, ...props }: SkeletonProps) {
  const Comp = asChild ? Slot : 'div';

  return <Comp className={cn('animate-pulse rounded-md bg-gray-100', className)} {...props} />;
}
