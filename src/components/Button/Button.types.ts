import React from 'react';
import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from './buttonVariants';

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
