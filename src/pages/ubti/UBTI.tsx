'use client';

import React, { useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { IMAGES } from '@/constant/imagePath';

const UBTI: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isBaked, setIsBaked] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const flipTimer = setTimeout(() => setIsFlipped(true), 2000); // 2초 뒤 flip 시작
    const bakeTimer = setTimeout(() => setIsBaked(true), 4000); // 4초에 이미지 교체
    const revealTimer = setTimeout(() => {
      setIsBaked(true);
      setTimeout(() => {
        setIsFlipped(false); // 5초에 다시 앞면으로
        setIsRevealed(true); // 앞면 이미지도 교체
      }, 1000);
    }, 4000);

    return () => {
      clearTimeout(flipTimer);
      clearTimeout(bakeTimer);
      clearTimeout(revealTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start p-4">
      <img
        src={IMAGES.TACO['taco-signal']}
        alt="타코시그널"
        className="w-[140px] h-auto mt-0 mb-2 z-10"
      />
      <span className="text-lg font-semibold leading-tight">당신의 타코야끼 유형은?</span>

      <div className="relative w-[300px] h-[300px] overflow-hidden border-none">
        <img
          src={IMAGES.TACO['taco-pan']}
          alt="타코야끼 판"
          className="absolute top-0 left-0 w-full h-full object-contain z-0 block select-none pointer-events-none"
        />

        <div className="absolute top-[14%] left-[16%] w-[68%] h-[68%] grid grid-cols-3 grid-rows-3 place-items-center z-10">
          {[...Array(9)].map((_, i) => {
            const isCenter = i === 4;

            // 앞면 이미지 (전환 반영됨)
            const frontImage = isRevealed
              ? isCenter
                ? IMAGES.TACO['taco-wasab-front']
                : IMAGES.TACO['taco-sub-front']
              : IMAGES.TACO['taco-main-front'];

            // 뒷면 이미지 (굽기 상태 반영됨)
            const backImage = isBaked
              ? isCenter
                ? IMAGES.TACO['taco-wasab-back']
                : IMAGES.TACO['taco-sub-back']
              : IMAGES.TACO['taco-main-back'];

            return (
              <ReactCardFlip
                key={i}
                isFlipped={isFlipped}
                flipDirection="horizontal"
                containerStyle={{ width: '66px', height: '66px' }}
              >
                {/* 앞면 */}
                <img
                  src={frontImage}
                  alt={`타코-front-${i}`}
                  className="w-[66px] h-[66px] object-contain transition-opacity duration-700"
                />

                {/* 뒷면 */}
                <img
                  src={backImage}
                  alt={`타코-back-${i}`}
                  className={`w-[66px] h-[66px] object-contain transition-opacity duration-700 ${
                    isBaked ? 'opacity-100' : 'opacity-70'
                  }`}
                />
              </ReactCardFlip>
            );
          })}
        </div>
      </div>

      <div className="bg-[#fff8e1] border border-yellow-400 mt-8 px-6 py-4 rounded-md text-center font-semibold text-gray-800">
        당신의 타코(요금제) 유형을
        <br />
        알아보세요!
      </div>
    </div>
  );
};

export default UBTI;
