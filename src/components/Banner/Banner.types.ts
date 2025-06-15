import React from 'react';
import { VariantProps } from 'class-variance-authority';
import { bannerVariants } from './bannerVariants';

export interface BannerProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof bannerVariants> {
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  actionButton?: React.ReactNode;
  onClick?: () => void;
}
