import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        share: 'bg-brand-darkblue text-primary-foreground shadow-xs hover:bg-brand-darkblue-hover',
        'gradient-pink':
          'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-xl hover:from-pink-600 hover:to-orange-600 focus-visible:ring-pink-400 focus-visible:ring-offset-2',
        'gradient-purple':
          'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-xl hover:from-purple-600 hover:to-indigo-600 focus-visible:ring-purple-400 focus-visible:ring-offset-2',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        xl: 'h-12 rounded-2xl px-6 py-4 text-base font-bold',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'share',
      size: 'default',
    },
  },
);

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const FocusableButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
    );
  },
);

FocusableButton.displayName = 'FocusableButton';

export { FocusableButton };
