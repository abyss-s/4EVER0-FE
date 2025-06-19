'use client';

import React, { useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { useLocation } from 'react-router-dom';
import { IMAGES } from '@/constant/imagePath';
import type { UBTIResultResponse, UBTIResultData } from '@/types/ubti';

export const UBTIResultPage: React.FC = () => {
  const location = useLocation();

  // 타코 카드플립 애니메이션용 인터페이스 (컴포넌트 내부)
  interface TacoCardType {
    front_image: string;
    back_image: string;
  }

  // 카드 플립 애니메이션 상태
  const [isFlipped, setIsFlipped] = useState(false);
  const [isBaked, setIsBaked] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  // 데이터 로딩 상태 (기존 브랜치 유지)
  const [result, setResult] = useState<UBTIResultData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ubtiType, setUbtiType] = useState<TacoCardType | null>(null);

  useEffect(() => {
    const state = location.state as UBTIResultResponse | undefined;
    if (state?.data) {
      setResult(state.data);
      // 타코 플립용 이미지 설정
      setUbtiType({
        front_image: IMAGES.TACO['taco-spicy-front'], // API 코드에 따라 매핑 필요
        back_image: IMAGES.TACO['taco-spicy-back'], // API 코드에 따라 매핑 필요
      });
    }
    setIsLoading(false);
  }, [location.state]);

  // 카드 플립 애니메이션 효과 (dev 브랜치에서 가져온 요소)
  useEffect(() => {
    if (!ubtiType) return;

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
  }, [ubtiType]);

  if (isLoading) {
    return <div className="text-center mt-10 text-gray-500">로딩 중입니다...</div>;
  }

  if (!result) {
    return (
      <div className="text-center mt-10 text-gray-600">결과 데이터를 불러오지 못했습니다.</div>
    );
  }

  const { ubti_type, summary, recommendation, matching_type } = result;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start p-4">
      {/* 카드플립 애니메이션 섹션 (dev 브랜치에서 가져온 요소) */}
      <img
        src={IMAGES.TACO['taco-signal']}
        alt="타코시그널"
        className="w-[140px] h-auto mt-0 mb-2 z-10"
      />
      <span className="text-lg font-semibold leading-tight mb-3">당신의 타코야끼 유형은?</span>

      <div className="relative w-[300px] h-[300px] overflow-hidden border-none mb-8">
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
                ? ubtiType?.front_image || IMAGES.TACO['taco-wasab-front']
                : IMAGES.TACO['taco-sub-front']
              : IMAGES.TACO['taco-main-front'];

            const backImage = isBaked
              ? isCenter
                ? ubtiType?.back_image || IMAGES.TACO['taco-wasab-back']
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

      {/* 결과 표시 섹션 (기존 브랜치 유지) */}
      <div className="max-w-2xl w-full space-y-6">
        {/* 본인 유형 */}
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-purple-800">
            나의 유형: {ubti_type.emoji} {ubti_type.name}
          </h2>
          <p className="text-gray-700 mt-2">{ubti_type.description}</p>
        </div>

        {/* 요약 */}
        <div className="bg-white border rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold text-indigo-700">요약</h3>
          <p className="text-gray-800 mt-2">{summary}</p>
        </div>

        {/* 추천 요금제 */}
        <div className="bg-white border rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold text-blue-700">추천 요금제</h3>
          <ul className="list-disc list-inside text-gray-800 mt-2 space-y-2">
            {recommendation.plans.map(
              (plan: UBTIResultData['recommendation']['plans'][0], index: number) => (
                <li key={index}>
                  <strong>{plan.name}</strong>: {plan.description}
                </li>
              ),
            )}
          </ul>
        </div>

        {/* 추천 구독 서비스 */}
        <div className="bg-white border rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold text-green-700">추천 구독 서비스</h3>
          <p className="text-gray-800 mt-2">
            <strong>{recommendation.subscription.name}</strong>:{' '}
            {recommendation.subscription.description}
          </p>
        </div>

        {/* 나랑 잘 맞는 유형 */}
        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-indigo-800">
            잘 맞는 유형: {matching_type.emoji} {matching_type.name}
          </h2>
          <p className="text-gray-700 mt-2">{matching_type.description}</p>
        </div>
      </div>
    </div>
  );
};

export default UBTIResultPage;
