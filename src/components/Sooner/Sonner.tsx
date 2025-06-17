import { useTheme } from 'next-themes';
import { Toaster as SonnerToaster, toast as sonnerToast, ToasterProps } from 'sonner';

const Sooner = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <SonnerToaster
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: 'text-lg font-semibold leading-none tracking-tight',
        },
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Sooner, sonnerToast };
