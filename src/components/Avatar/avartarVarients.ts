import { cva } from 'class-variance-authority';

export const avatarVariants = cva('rounded-full', {
  variants: {
    size: {
      sm: 'w-6 h-6',
      md: 'w-10 h-10',
      lg: 'w-14 h-14',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
