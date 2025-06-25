import React from 'react';
import { Button } from '@/components/Button';
import { Lock } from 'lucide-react';
import { useAuthStore } from '@/stores/useAuthStore';
import { cn } from '@/lib/utils';

interface PremiumFeatureButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  variant?: 'default' | 'outline' | 'destructive' | 'secondary';
  featureName: string;
}

export const PremiumFeatureButton: React.FC<PremiumFeatureButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className,
  variant = 'outline',
  featureName,
}) => {
  const { isLoggedIn } = useAuthStore();

  const handleClick = () => {
    if (!isLoggedIn) return;
    onClick();
  };

  const isDisabled = disabled || !isLoggedIn;

  return (
    <Button
      variant={variant}
      className={cn(
        'flex-1 h-10 px-2 text-sm leading-none flex items-center justify-center gap-0 whitespace-nowrap overflow-hidden',
        className,
        !isLoggedIn && 'opacity-70',
      )}
      onClick={handleClick}
      disabled={isDisabled}
      title={!isLoggedIn ? `${featureName}은 로그인이 필요한 기능입니다` : undefined}
    >
      {!isLoggedIn && <Lock className="w-4 h-4 mr-1" />}
      {children}
    </Button>
  );
};
