import { cva } from 'class-variance-authority';

export const contentVariants = cva('z-50 rounded-md border p-4 shadow-md', {
  variants: {
    variant: {
      light: 'bg-white border-gray-200 text-gray-900 shadow-lg',
      dark: 'bg-gray-900 border-gray-700 text-gray-100 shadow-black/50',
    },
    side: {
      top: 'origin-bottom-center -translate-y-2',
      right: 'origin-left-center translate-x-2',
      bottom: 'origin-top-center translate-y-2 -translate-x-8',
      left: 'origin-right-center -translate-x-2',
    },
  },
  defaultVariants: {
    variant: 'light',
    side: 'bottom',
  },
});

export const arrowVariants = cva('fill-current', {
  variants: {
    variant: {
      light: 'text-white',
      dark: 'text-gray-900',
    },
  },
  defaultVariants: {
    variant: 'light',
  },
});
