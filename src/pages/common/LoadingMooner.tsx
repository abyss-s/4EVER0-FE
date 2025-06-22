import React, { useEffect, useState } from 'react';
import { IMAGES } from '@/constant/imagePath';

const loadingSteps = [
  { imageUrl: IMAGES.MOONER.rotation_1, title: '로딩 중...' },
  { imageUrl: IMAGES.MOONER.rotation_2, title: '잠시만 기다려주세요' },
  { imageUrl: IMAGES.MOONER.rotation_3, title: '데이터 불러오는 중...' },
  { imageUrl: IMAGES.MOONER.rotation_4, title: '조금만 기다려주세요!' },
];

interface LoadingMoonerProps {
  animated?: boolean;
}

const LoadingMooner: React.FC<LoadingMoonerProps> = ({ animated = true }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!animated) return;

    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % loadingSteps.length);
    }, 250);
    return () => clearInterval(interval);
  }, [animated]);

  const current = loadingSteps[step];

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <img
        src={animated ? current.imageUrl : IMAGES.MOONER['rotation_1']}
        alt={current.title}
        className="w-50 h-auto"
      />
      <p className="mt-4 text-m text-gray-600">{current.title}</p>
    </div>
  );
};

export default LoadingMooner;
