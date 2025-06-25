import { useState, useEffect } from 'react';

export const useMessageRotation = (currentStep: number, stepMessages: string[][]) => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % (stepMessages[currentStep]?.length || 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [currentStep, stepMessages]);

  return messageIndex;
};
