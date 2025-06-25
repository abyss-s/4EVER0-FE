import { cn } from '@/lib/utils';
import { ExclamationTriangleIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import { HTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { alertVariants } from '../Alert/alertVariants';

interface AlertProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  title: string;
  description?: string;
}

export function Alert({
  title,
  description,
  variant = 'default',
  className,
  ...props
}: AlertProps) {
  const isDestructive = variant === 'destructive';

  return (
    <div className={cn(alertVariants({ variant }), className)} {...props}>
      <div className="flex gap-2 items-start">
        {isDestructive ? (
          <ExclamationTriangleIcon className="mt-0.5 h-5 w-5 text-red-500" />
        ) : (
          <InfoCircledIcon className="mt-0.5 h-5 w-5 text-muted-foreground" />
        )}
        <div>
          <h4 className="font-semibold text-s">{title}</h4>
          {description && <p className="text-xs mt-1">{description}</p>}
        </div>
      </div>
    </div>
  );
}
