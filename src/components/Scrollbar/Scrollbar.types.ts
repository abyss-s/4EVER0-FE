import * as React from 'react';
import { VariantProps } from 'class-variance-authority';
import { scrollbarVariants } from './scrollbarVariants';

export interface ScrollbarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof scrollbarVariants> {
  children: React.ReactNode;
  orientation?: 'vertical' | 'horizontal' | 'both';
}
