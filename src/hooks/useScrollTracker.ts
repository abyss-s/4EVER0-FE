import { useEffect } from 'react';
import { useScrollStore } from '@/stores/useScrollStore';

export const useScrollTracker = (ref: React.RefObject<HTMLElement | null>) => {
  const setY = useScrollStore((s) => s.setY);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      setY(el.scrollTop);
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [ref, setY]);
};
