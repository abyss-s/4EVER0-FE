import { useState, useCallback } from 'react';

interface AnimationState {
  currentStep: number;
  isFlipped: boolean;
  isBaked: boolean;
  isRevealed: boolean;
  showResults: boolean;
}

export const useAnimationState = () => {
  const [state, setState] = useState<AnimationState>({
    currentStep: 0,
    isFlipped: false,
    isBaked: false,
    isRevealed: false,
    showResults: false,
  });

  const updateState = useCallback((updates: Partial<AnimationState>) => {
    setState((prevState) => ({
      ...prevState,
      ...updates,
    }));
  }, []);

  return {
    ...state,
    updateState,
  };
};
