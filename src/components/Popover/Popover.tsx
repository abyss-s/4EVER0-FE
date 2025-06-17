import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';
import { contentVariants, arrowVariants } from '@/components/Popover/popoverVartiants';
import type { PopoverProps, PopoverContentProps } from '@/components/Popover/Popover.types';

const PopoverRoot = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverPortal = PopoverPrimitive.Portal;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, variant = 'light', sideOffset = 4, children, ...props }, ref) => (
  <PopoverPortal>
    <PopoverPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(contentVariants({ variant, className }))}
      {...props}
    >
      {children}
      <PopoverPrimitive.Arrow className={cn(arrowVariants({ variant }))} />
    </PopoverPrimitive.Content>
  </PopoverPortal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export function Popover({ children, ...props }: PopoverProps) {
  return <PopoverRoot {...props}>{children}</PopoverRoot>;
}

export { PopoverRoot, PopoverTrigger, PopoverContent };
