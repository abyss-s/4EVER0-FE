import { useEffect, useRef } from 'react';

interface AnimationStepStates {
  currentStep?: number;
  isFlipped?: boolean;
  isBaked?: boolean;
  isRevealed?: boolean;
  showResults?: boolean;
}

const setTimeoutsInSequence = (callbacks: (() => void)[], delays: number[]): NodeJS.Timeout[] => {
  const timers: NodeJS.Timeout[] = [];

  callbacks.forEach((callback, index) => {
    const timer = setTimeout(callback, delays[index]);
    timers.push(timer);
  });

  return timers;
};

const clearTimeouts = (timers: NodeJS.Timeout[]) => {
  timers.forEach((timer) => clearTimeout(timer));
};

export const useUBTIAnimationSequence = (updateState: (states: AnimationStepStates) => void) => {
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    const callbacks = [
      () => updateState({ currentStep: 1 }),
      () => updateState({ isFlipped: true }),
      () => updateState({ currentStep: 2, isBaked: true }),
      () => updateState({ currentStep: 3 }),
      () => updateState({ isFlipped: false, isRevealed: true }),
      () => updateState({ showResults: true }),
    ];

    const delays = [1000, 2000, 4000, 6000, 6500, 9000];

    timersRef.current = setTimeoutsInSequence(callbacks, delays);

    return () => {
      clearTimeouts(timersRef.current);
    };
  }, [updateState]);

  const clearAllTimers = () => {
    clearTimeouts(timersRef.current);
  };

  return { clearAllTimers };
};
