import { useEffect, useRef, useCallback } from 'react';

interface AnimationStepStates {
  currentStep?: number;
  isFlipped?: boolean;
  isBaked?: boolean;
  isRevealed?: boolean;
  showResults?: boolean;
}

export const useUBTIAnimationSequence = (
  updateState: (states: AnimationStepStates) => void,
  shouldStart: boolean = false,
) => {
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const hasStarted = useRef(false);
  const isRunning = useRef(false);

  // 타이머 정리 함수
  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];
    isRunning.current = false;
  }, []);

  // 애니메이션 시퀀스 시작
  const startAnimation = useCallback(() => {
    if (hasStarted.current || isRunning.current) {
      return;
    }

    console.log('🎬 애니메이션 시퀀스 시작!');
    hasStarted.current = true;
    isRunning.current = true;

    // 모든 타이머를 한 번에 설정
    const timers = [
      setTimeout(() => {
        updateState({ currentStep: 1 });
      }, 1000),

      setTimeout(() => {
        updateState({ isFlipped: true });
      }, 2000),

      setTimeout(() => {
        updateState({ currentStep: 2, isBaked: true });
      }, 4000),

      setTimeout(() => {
        updateState({ currentStep: 3 });
      }, 6000),

      setTimeout(() => {
        updateState({ isFlipped: false, isRevealed: true });
      }, 6500),

      setTimeout(() => {
        updateState({ showResults: true });
        isRunning.current = false;
      }, 9000),
    ];

    timersRef.current = timers;
  }, [updateState]);

  useEffect(() => {
    if (shouldStart && !hasStarted.current) {
      const startTimer = setTimeout(() => {
        startAnimation();
      }, 100);

      return () => clearTimeout(startTimer);
    }
  }, [shouldStart, startAnimation]);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

  const resetAndRestart = useCallback(() => {
    clearAllTimers();
    hasStarted.current = false;
    isRunning.current = false;

    setTimeout(() => {
      startAnimation();
    }, 200);
  }, [clearAllTimers, startAnimation]);

  return { clearAllTimers, resetAndRestart };
};
