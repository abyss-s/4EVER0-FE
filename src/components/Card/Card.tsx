import { cn } from '@/lib/utils';
import {
  cardVariants,
  cardHeaderVariants,
  cardContentVariants,
  cardFooterVariants,
} from './cardVariants';
import type {
  CardProps,
  CardHeaderProps,
  CardContentProps,
  CardFooterProps,
  CardTitleProps,
  CardDescriptionProps,
  CardActionProps,
} from './Card.types';

export function Card({ className, ...props }: CardProps) {
  const { variant, size, clickable, padding, ...rest } = props;
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, size, clickable, padding }), className)}
      {...rest} // 여기에는 HTMLAttributes<'div'>에 해당하는 기본 props만 전달됨
    />
  );
}

export function CardHeader({ className, padding, border, ...props }: CardHeaderProps) {
  return (
    <div
      data-slot="card-header"
      className={cn(cardHeaderVariants({ padding, border }), className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <h3
      data-slot="card-title"
      className={cn('font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p
      data-slot="card-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

export function CardAction({ className, ...props }: CardActionProps) {
  return (
    <div data-slot="card-action" className={cn('absolute top-2 right-2', className)} {...props} />
  );
}

export function CardContent({ className, padding, ...props }: CardContentProps) {
  return (
    <div
      data-slot="card-content"
      className={cn(cardContentVariants({ padding }), className)}
      {...props}
    />
  );
}

export function CardFooter({ className, padding, border, justify, ...props }: CardFooterProps) {
  return (
    <div
      data-slot="card-footer"
      className={cn(cardFooterVariants({ padding, border, justify }), className)}
      {...props}
    />
  );
}
