import { cva } from 'class-variance-authority';

export const overlayVariants = cva('fixed inset-0 z-50 bg-black/50 backdrop-blur-sm', {
  variants: {
    variant: {
      default: '',
      blur: 'backdrop-blur-md',
    },
  },
});

export const contentVariants = cva(
  'fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
  {
    variants: {
      variant: {
        default: 'rounded-lg',
        minimal: 'rounded-lg border-0 shadow-2xl',
        drawer:
          'fixed inset-x-0 bottom-0 top-auto translate-x-0 translate-y-0 rounded-t-lg data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        alert: 'rounded-lg shadow-xl',
      },
      size: {
        sm: 'max-w-sm',
        default: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
