import { useState, useEffect, useCallback } from 'react';

interface HighlightPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

export const useTutorialHighlight = () => {
  const [highlightPosition, setHighlightPosition] = useState<HighlightPosition | null>(null);

  const highlightElement = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) {
      console.warn(`Element with id "${elementId}" not found`);
      return;
    }

    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    setHighlightPosition({
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft,
      width: rect.width,
      height: rect.height,
    });
  }, []);

  const clearHighlight = useCallback(() => {
    setHighlightPosition(null);
  }, []);

  // 화면 크기 변경 시 위치 재계산
  useEffect(() => {
    const handleResize = () => {
      // 현재 하이라이트된 요소가 있다면 위치 재계산
      if (highlightPosition) {
        // 마지막으로 하이라이트된 요소를 다시 찾아서 업데이트
        // 이를 위해 현재 하이라이트된 요소의 ID를 추적해야 함
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [highlightPosition]);

  return {
    highlightPosition,
    highlightElement,
    clearHighlight,
  };
};
