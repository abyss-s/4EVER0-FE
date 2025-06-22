import React, { useEffect, useState } from 'react';
import { IMAGES } from '@/constant/imagePath';

const loadingSteps = [
  { imageUrl: IMAGES.MOONER.rotation_1, title: '로딩 중...', alt: '문어가 빙글 도는 이미지 1' },
  {
    imageUrl: IMAGES.MOONER.rotation_2,
    title: '잠시만 기다려주세요',
    alt: '문어가 회전하는 중간 상태',
  },
  {
    imageUrl: IMAGES.MOONER.rotation_3,
    title: '데이터 불러오는 중...',
    alt: '문어가 빠르게 도는 모습',
  },
  {
    imageUrl: IMAGES.MOONER.rotation_4,
    title: '조금만 기다려주세요!',
    alt: '문어가 마지막 회전 중',
  },
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

  const current = animated ? loadingSteps[step] : loadingSteps[0];

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <img src={current.imageUrl} alt={current.alt} title={current.title} className="w-50 h-auto" />
      <p className="mt-4 text-m text-gray-600">{current.title}</p>
    </div>
  );
};

export default LoadingMooner;
