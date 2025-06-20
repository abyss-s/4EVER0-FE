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

  // useCallback으로 함수 참조
  const updateState = useCallback((updates: Partial<AnimationState>) => {
    setState((prevState) => {
      const newState = { ...prevState, ...updates };

      return newState;
    });
  }, []);

  const resetState = useCallback(() => {
    setState({
      currentStep: 0,
      isFlipped: false,
      isBaked: false,
      isRevealed: false,
      showResults: false,
    });
  }, []);

  return {
    ...state,
    updateState,
    resetState,
  };
};
