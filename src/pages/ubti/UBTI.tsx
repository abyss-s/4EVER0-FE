'use client';

import React, { useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { IMAGES } from '@/constant/imagePath';

interface UbtiType {
  image_url: string;
  image_back_url?: string;
  code: string;
  name: string;
  emoji: string;
  description: string;
}

const UBTI: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isBaked, setIsBaked] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [ubtiType, setUbtiType] = useState<UbtiType | null>(null);

  // useEffect(() => {
  //   const fetchUBTI = async () => {
  //     try {
  //       const res = await fetch('/api/ubti/result');
  //       const json = await res.json();
  //       setUbtiType(json.data.ubti_type);
  //     } catch (err) {
  //       console.error('UBTI API 에러:', err);
  //     }
  //   };
  //
  // fetchUBTI();

  useEffect(() => {
    // 👉 테스트용 더미 데이터
    setUbtiType({
      code: 'TK-Berry',
      name: '꾸안꾸 소셜타코',
      emoji: '🍓',
      description: 'SNS, 채팅, 숏폼 다 하는 FOMO 끝판왕!',
      image_url: IMAGES.TACO['taco-spicy-front'],
      image_back_url: IMAGES.TACO['taco-spicy-back'],
    });

    const flipTimer = setTimeout(() => setIsFlipped(true), 2000); // 2초 뒤 뒤집기 시작
    const bakeTimer = setTimeout(() => setIsBaked(true), 4000); // 4초 뒤 구워짐 표시
    const revealTimer = setTimeout(() => {
      setIsBaked(true);
      setTimeout(() => {
        setIsFlipped(false); // 다시 앞면으로
        setIsRevealed(true); // 앞면도 교체됨
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
      <span className="text-lg font-semibold leading-tight mb-3">당신의 타코야끼 유형은?</span>

      <div className="relative w-[300px] h-[300px] overflow-hidden border-none">
        <img
          src={IMAGES.TACO['taco-pan']}
          alt="타코야끼 판"
          className="absolute top-0 left-0 w-full h-full object-contain z-0 select-none pointer-events-none"
        />

        <div className="absolute top-[14%] left-[16%] w-[68%] h-[68%] grid grid-cols-3 grid-rows-3 place-items-center z-10">
          {[...Array(9)].map((_, i) => {
            const isCenter = i === 4;

            const frontImage = isRevealed
              ? isCenter
                ? ubtiType?.image_url || IMAGES.TACO['taco-wasab-front']
                : IMAGES.TACO['taco-sub-front']
              : IMAGES.TACO['taco-main-front'];

            const backImage = isBaked
              ? isCenter
                ? ubtiType?.image_back_url || IMAGES.TACO['taco-wasab-back']
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
        당신의 타코야끼(요금제) 유형을
        <br />
        알아보세요!
      </div>
    </div>
  );
};

export default UBTI;
