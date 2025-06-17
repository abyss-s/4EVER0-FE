import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { VariantProps } from 'class-variance-authority';
import { contentVariants } from '@/components/Popover/popoverVartiants';

export interface PopoverProps extends React.ComponentProps<typeof PopoverPrimitive.Root> {}

export interface PopoverTriggerProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger> {}

// side variant 추가, contentVariants에 정의된 모든 variant 포함
export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>,
    VariantProps<typeof contentVariants> {
  sideOffset?: number;
  side?: 'top' | 'right' | 'bottom' | 'left';
}
