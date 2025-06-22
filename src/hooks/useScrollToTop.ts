import { useScrollStore } from '@/stores/useScrollStore';

export const useScrollToTop = (ref: React.RefObject<HTMLElement | null>) => {
  const y = useScrollStore((s) => s.y);

  const show = y > 200;

  const scrollToTop = () => {
    const el = ref?.current;
    if (el) {
      el.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return { show, scrollToTop };
};
