import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface AvatarComponentProps {
  src?: string;
  fallback?: string;
}

export const AvatarComponent = ({ src, fallback = 'CN' }: AvatarComponentProps) => {
  return (
    <Avatar>
      <AvatarImage src={src} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};
