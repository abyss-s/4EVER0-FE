import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface AvatarComponentProps {
  src?: string;
  alt?: string;
  fallback?: string;
}

export const AvatarComponent = ({
  src,
  alt = '아바타 이미지',
  fallback = 'CN',
}: AvatarComponentProps) => {
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};
