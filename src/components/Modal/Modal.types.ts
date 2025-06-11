import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { VariantProps } from 'class-variance-authority';
import { contentVariants } from './modalVariants';

export interface ModalProps extends React.ComponentProps<typeof DialogPrimitive.Root> {}

export interface ModalContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof contentVariants> {
  showCloseButton?: boolean;
}

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
