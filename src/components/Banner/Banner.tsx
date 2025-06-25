import { cn } from '@/lib/utils';
import { bannerVariants } from './bannerVariants';
import type { BannerProps } from './Banner.types';

export function Banner({
  className,
  variant,
  size,
  layout,
  title,
  description,
  image,
  imageAlt,
  actionButton,
  onClick,
  ...props
}: BannerProps) {
  return (
    <div
      className={cn(bannerVariants({ variant, size, layout, className }))}
      onClick={onClick}
      {...props}
    >
      <div className="absolute inset-0 bg-black/10 pointer-events-none dark:bg-black/20" />
      {image && (
        <div
          className={cn(
            'relative z-10 flex-shrink-0',
            layout === 'split' ? 'order-2 md:order-1' : 'mr-6',
            layout === 'centered' && 'mb-4 mr-0',
          )}
        >
          <img
            src={image}
            alt={imageAlt || title}
            className={cn(
              'object-cover rounded-lg',
              layout === 'split'
                ? 'w-full h-32 md:h-40'
                : layout === 'centered'
                  ? 'w-20 h-20 md:w-24 md:h-24 mx-auto'
                  : 'w-16 h-16 md:w-20 md:h-20',
            )}
          />
        </div>
      )}
      <div
        className={cn(
          'relative z-10 flex-1 min-w-0',
          layout === 'split' ? 'order-1 md:order-2' : '',
          layout === 'centered' ? 'text-center' : '',
        )}
      >
        <h2
          className={cn(
            'font-bold leading-tight mb-2 tracking-tight',
            size === 'sm'
              ? 'text-lg'
              : size === 'lg'
                ? 'text-2xl md:text-3xl'
                : 'text-xl md:text-2xl',
            'drop-shadow-sm',
          )}
        >
          {title}
        </h2>

        {description && (
          <p
            className={cn(
              'opacity-90 leading-relaxed mb-4 last:mb-0',
              size === 'sm'
                ? 'text-sm'
                : size === 'lg'
                  ? 'text-base md:text-lg'
                  : 'text-sm md:text-base',
              'drop-shadow-sm',
              'whitespace-pre-line',
            )}
          >
            {description}
          </p>
        )}
        {actionButton && (
          <div className={cn('mt-4', layout === 'centered' ? 'flex justify-center' : '')}>
            {actionButton}
          </div>
        )}
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16 pointer-events-none dark:bg-white/10" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/15 rounded-full translate-y-12 -translate-x-12 pointer-events-none dark:bg-white/8" />
      <div className="absolute top-1/2 right-8 w-16 h-16 bg-[var(--color-brand-darkblue-light)]/5 rounded-full pointer-events-none dark:bg-[var(--color-brand-yellow)]/20" />
    </div>
  );
}
