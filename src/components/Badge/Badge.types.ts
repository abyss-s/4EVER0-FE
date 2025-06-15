import * as React from 'react';
import { VariantProps } from 'class-variance-authority';
import { badgeVariants } from './badgeVariants';

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}
