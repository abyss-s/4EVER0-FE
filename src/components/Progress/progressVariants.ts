// progressVariants.ts
import { cva } from 'class-variance-authority';

export const progressVariants = cva(
  'relative w-full overflow-hidden rounded-full transition-all [&>*]:bg-primary',
  {
    variants: {
      variant: {
        default: 'bg-primary/20',
        secondary: 'bg-secondary/30 [&>*]:bg-secondary',
        success: 'bg-green-100 [&>*]:bg-green-500 dark:bg-green-900/30 dark:[&>*]:bg-green-400',
        warning: 'bg-yellow-100 [&>*]:bg-yellow-500 dark:bg-yellow-900/30 dark:[&>*]:bg-yellow-400',
        destructive: 'bg-red-100 [&>*]:bg-red-500 dark:bg-red-900/30 dark:[&>*]:bg-red-400',
        accent: 'bg-accent/30 [&>*]:bg-accent-foreground',
      },
      size: {
        sm: 'h-1',
        default: 'h-2',
        lg: 'h-3',
        xl: 'h-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
