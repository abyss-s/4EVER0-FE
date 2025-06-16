import * as React from 'react';
import { VariantProps } from 'class-variance-authority';
import {
  cardVariants,
  cardHeaderVariants,
  cardContentVariants,
  cardFooterVariants,
} from './cardVariants';

export interface CardProps extends React.ComponentProps<'div'>, VariantProps<typeof cardVariants> {}

export interface CardHeaderProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof cardHeaderVariants> {}

export interface CardContentProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof cardContentVariants> {}

export interface CardFooterProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof cardFooterVariants> {}

export interface CardTitleProps extends React.ComponentProps<'h3'> {}

export interface CardDescriptionProps extends React.ComponentProps<'p'> {}

export interface CardActionProps extends React.ComponentProps<'div'> {}
