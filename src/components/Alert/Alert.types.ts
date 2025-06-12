import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { alertVariants } from './alertVariants';

export interface AlertProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  asChild?: boolean;
}
