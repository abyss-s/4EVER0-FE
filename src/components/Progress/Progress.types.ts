import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { VariantProps } from 'class-variance-authority';
import { progressVariants } from './progressVariants';

export interface ProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  current?: number;
  total?: number;
  showFraction?: boolean;
}
