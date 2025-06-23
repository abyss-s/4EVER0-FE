import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/Button';
import { useScrollToTop } from '@/hooks/useScrollToTop';

interface ScrollToTopButtonProps {
  scrollRef: React.RefObject<HTMLElement | null>;
}

export const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ scrollRef }) => {
  const { show, scrollToTop } = useScrollToTop(scrollRef);
  const [inputAreaHeight, setInputAreaHeight] = React.useState(156);

  React.useEffect(() => {
    const updateInputAreaHeight = () => {
      const inputArea = document.querySelector('[data-chat-input-area]');
      if (inputArea) {
        const height = inputArea.getBoundingClientRect().height;
        setInputAreaHeight(height);
      }
    };

    updateInputAreaHeight();
    window.addEventListener('resize', updateInputAreaHeight);

    // MutationObserver로 DOM 변화 감지
    const observer = new MutationObserver(updateInputAreaHeight);
    const chatContainer = document.querySelector('[data-chat-container]');

    if (chatContainer) {
      observer.observe(chatContainer, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style'],
      });
    }

    return () => {
      window.removeEventListener('resize', updateInputAreaHeight);
      observer.disconnect();
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed right-6 z-40 transition-all duration-300 ease-in-out"
      style={{ bottom: `${inputAreaHeight}px` }}
    >
      <Button
        variant="outline"
        size="icon"
        className="rounded-full shadow-lg cursor-pointer bg-white border-gray-200 hover:bg-gray-50 hover:border-brand-yellow"
        onClick={scrollToTop}
      >
        <ArrowUp className="w-5 h-5 text-gray-600" />
      </Button>
    </div>
  );
};
