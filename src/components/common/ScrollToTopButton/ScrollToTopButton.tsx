import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/Button';
import { useScrollToTop } from '@/hooks/useScrollToTop';

interface ScrollToTopButtonProps {
  scrollRef: React.RefObject<HTMLElement | null>;
}

export const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ scrollRef }) => {
  const { show, scrollToTop } = useScrollToTop(scrollRef);

  if (!show) return null;

  return (
    <div className="fixed bottom-[200px] right-8 z-50">
      <Button
        variant="login"
        size="icon"
        className="rounded-full shadow-lg cursor-pointer"
        onClick={scrollToTop}
      >
        <ArrowUp className="w-5 h-5" />
      </Button>
    </div>
  );
};
