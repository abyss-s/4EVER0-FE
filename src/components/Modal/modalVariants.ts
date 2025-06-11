import { cva } from 'class-variance-authority';

export const overlayVariants = cva('fixed inset-0 z-50 transition-all duration-200', {
  variants: {
    variant: {
      default: 'bg-black/50',
      blur: 'bg-black/50 backdrop-blur-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const contentVariants = cva(
  'fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
  {
    variants: {
      variant: {
        default: 'rounded-lg',
        minimal: 'rounded-lg border-0 shadow-2xl',
        drawer:
          'fixed inset-x-0 bottom-0 top-auto translate-x-0 translate-y-0 rounded-t-lg data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        fullscreen: 'h-screen w-screen rounded-none',
      },
      size: {
        sm: 'max-w-sm',
        default: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        auto: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export const modalVariants = cva('', {
  variants: {
    variant: {
      default: '',
      minimal: '',
      drawer: '',
      fullscreen: '',
    },
    size: {
      sm: '',
      default: '',
      lg: '',
      xl: '',
      auto: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});
