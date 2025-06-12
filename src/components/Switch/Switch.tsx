import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const switchVariants = cva(
  'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'data-[state=checked]:bg-slate-900 data-[state=unchecked]:bg-slate-200',
        brand:
          'data-[state=checked]:bg-[#25394b] data-[state=unchecked]:bg-slate-200 hover:data-[state=checked]:bg-[#1f2f3e]',
        positive: 'data-[state=checked]:bg-[#22c55e] data-[state=unchecked]:bg-slate-200',
        cautionary: 'data-[state=checked]:bg-[#eab308] data-[state=unchecked]:bg-slate-200',
        negative: 'data-[state=checked]:bg-[#ef4444] data-[state=unchecked]:bg-slate-200',
        red: 'data-[state=checked]:bg-[#dd4640] data-[state=unchecked]:bg-slate-200 hover:data-[state=checked]:bg-[#c83d39]',
        yellow:
          'data-[state=checked]:bg-[#f4de75] data-[state=unchecked]:bg-slate-200 hover:data-[state=checked]:bg-[#e2cc64]',
      },
      size: {
        sm: 'h-4 w-7',
        default: 'h-6 w-11',
        lg: 'h-8 w-14',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const switchThumbVariants = cva(
  'pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform',
  {
    variants: {
      size: {
        sm: 'h-3 w-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0',
        default: 'h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
        lg: 'h-6 w-6 data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchVariants> {
  label?: string;
  description?: string;
  error?: string;
}

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  ({ className, variant, size, label, description, error, ...props }, ref) => {
    const id = React.useId();

    if (label || description || error) {
      return (
        <div className="flex flex-col gap-2">
          <div className="flex items-center space-x-2">
            <SwitchPrimitives.Root
              id={id}
              className={cn(switchVariants({ variant, size }), className)}
              {...props}
              ref={ref}
            >
              <SwitchPrimitives.Thumb className={cn(switchThumbVariants({ size }))} />
            </SwitchPrimitives.Root>
            {label && (
              <label
                htmlFor={id}
                className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
              </label>
            )}
          </div>
          {description && <p className="text-sm text-slate-500 ml-0">{description}</p>}
          {error && <p className="text-sm text-[#ef4444] ml-0">{error}</p>}
        </div>
      );
    }

    return (
      <SwitchPrimitives.Root
        className={cn(switchVariants({ variant, size }), className)}
        {...props}
        ref={ref}
      >
        <SwitchPrimitives.Thumb className={cn(switchThumbVariants({ size }))} />
      </SwitchPrimitives.Root>
    );
  },
);

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch, switchVariants };
