import { useEffect, useRef, useCallback } from 'react';

interface AnimationState {
  currentStep: number;
  isFlipped: boolean;
  isBaked: boolean;
  isRevealed: boolean;
  showResults: boolean;
}

export const useUBTIAnimationSequence = (
  updateState: (states: Partial<AnimationState>) => void,
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
      console.log(
        '🚫 애니메이션 이미 시작됨 - hasStarted:',
        hasStarted.current,
        'isRunning:',
        isRunning.current,
      );
      return;
    }

    console.log('🎬 애니메이션 시퀀스 시작!');
    hasStarted.current = true;
    isRunning.current = true;

    // 모든 타이머를 한 번에 설정
    const timers = [
      // 1초 후: 첫 번째 단계
      setTimeout(() => {
        console.log('📍 Step 1 - 팬 달구기');
        updateState({ currentStep: 1 });
      }, 1000),

      // 3초 후: 뒤집기
      setTimeout(() => {
        console.log('📍 Step 2 - 뒤집기');
        updateState({ isFlipped: true });
      }, 3000),

      // 5초 후: 굽기 + 2단계
      setTimeout(() => {
        console.log('📍 Step 3 - 굽기');
        updateState({ currentStep: 2, isBaked: true });
      }, 5000),

      // 7초 후: 3단계
      setTimeout(() => {
        console.log('📍 Step 4 - 완료');
        updateState({ currentStep: 3 });
      }, 7000),

      // 8초 후: 공개
      setTimeout(() => {
        console.log('📍 Step 5 - 공개');
        updateState({ isFlipped: false, isRevealed: true });
      }, 8000),

      // 10초 후: 결과 표시
      setTimeout(() => {
        console.log('📍 Step 6 - 결과 표시');
        updateState({ showResults: true });
        isRunning.current = false;
      }, 10000),
    ];

    timersRef.current = timers;
  }, [updateState]);

  useEffect(() => {
    console.log('👀 useEffect 체크 - shouldStart:', shouldStart, 'hasStarted:', hasStarted.current);

    if (shouldStart && !hasStarted.current) {
      // 약간의 딜레이 후 시작
      const startTimer = setTimeout(() => {
        startAnimation();
      }, 500);

      return () => {
        clearTimeout(startTimer);
      };
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
