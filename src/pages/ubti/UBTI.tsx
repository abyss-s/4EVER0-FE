import React, { useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IMAGES } from '@/constant/imagePath';
import type { UBTIResultResponse, UBTIResultData } from '@/types/ubti';
import { useMarkdownComponents } from '@/utils/markdownComponents';
import ReactMarkdown from 'react-markdown';
import SharePopover from '../share/SharePopover';
import { Button } from '@/components/Button';

export const UBTIResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 타코 카드플립 애니메이션용 인터페이스
  interface TacoCardType {
    front_image: string;
    back_image: string;
  }

  const [isFlipped, setIsFlipped] = useState(false);
  const [isBaked, setIsBaked] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [result, setResult] = useState<UBTIResultData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ubtiType, setUbtiType] = useState<TacoCardType | null>(null);
  const markdownComponents = useMarkdownComponents();

  const stepMessages = [
    [
      '타코야끼 팬을 달구는 중... 🔥',
      '오늘의 운세를 점치고 있어요 ✨',
      '마법의 재료를 넣고 있어요 🪄',
    ],
    [
      '살살 뒤집어 주는 중! 🥢',
      '타코야끼가 춤을 추고 있어요 💃',
      '완벽한 동그라미가 될 때까지! ⭕',
    ],
    ['황금빛으로 익어가는 중... ✨', '마법이 일어나고 있어요! 🌟', '거의 다 완성되었어요! 🎉'],
    [
      '짠! 당신만의 타코야끼 완성! 💕',
      '운명의 타코야끼가 나타났어요! 🥰',
      '사랑스러운 결과를 확인해보세요! 💖',
    ],
  ];

  // 요금제/구독서비스 바로가기
  const handlePlanClick = (planName: string) => {
    alert(`${planName} 요금제 페이지로 이동합니다! 🚀`);
  };

  const handleServiceClick = (serviceName: string) => {
    alert(`${serviceName} 구독하러 가기! 🎵`);
  };

  const handleBackLick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const state = location.state as UBTIResultResponse | undefined;
    if (state?.data) {
      setResult(state.data);
      setUbtiType({
        front_image: IMAGES.TACO['taco-spicy-front'],
        back_image: IMAGES.TACO['taco-spicy-back'],
      });
    }
    setIsLoading(false);
  }, [location.state]);

  // 메시지 로테이션 (4초)
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % stepMessages[currentStep]?.length || 0);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentStep]);

  // 더 부드러운 애니메이션 시퀀스
  useEffect(() => {
    if (!ubtiType) return;

    const sequence = async () => {
      // 1단계: 뒤집기 준비
      setTimeout(() => setCurrentStep(1), 1000);

      // 2단계: 뒤집기 시작 (더 부드럽게)
      setTimeout(() => {
        setIsFlipped(true);
      }, 2000);

      // 3단계: 굽기 과정
      setTimeout(() => {
        setCurrentStep(2);
        setIsBaked(true);
      }, 4000);

      // 4단계: 완성 준비
      setTimeout(() => setCurrentStep(3), 6000);

      // 5단계: 최종 결과 (더 부드러운 타이밍)
      setTimeout(() => {
        setIsBaked(true);
        setTimeout(() => {
          setIsFlipped(false);
          setIsRevealed(true);
        }, 800);
      }, 6500);

      // 6단계: 결과 표시
      setTimeout(() => setShowResults(true), 9000);
    };

    sequence();
  }, [ubtiType]);

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 flex items-center justify-center">
        <motion.div
          className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 1, -1, 0],
          }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
          >
            🍳
          </motion.div>
          <div className="text-xl text-gray-700 font-medium">타코야끼를 준비하고 있어요...</div>
          <div className="text-sm text-gray-500 mt-2">잠시만 기다려주세요 💕</div>
        </motion.div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-full bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 flex items-center justify-center">
        <motion.div
          className="text-center bg-white/90 p-10 rounded-3xl shadow-2xl border-4 border-pink-200"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 10 }}
        >
          <motion.div
            className="text-6xl mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            😅
          </motion.div>
          <div className="text-xl text-gray-700 font-medium mb-2">앗! 타코야끼가 어디갔지?</div>
          <div className="text-gray-500 pb-3">데이터를 불러올 수 없어요!</div>
          <Button variant="outline" onClick={handleBackLick}>
            홈으로 돌아가기
          </Button>
        </motion.div>
      </div>
    );
  }

  const { ubti_type, summary, recommendation, matching_type } = result;

  return (
    <div className="min-h-full bg-gradient-to-br from-pink-50 via-orange-50 via-yellow-50 to-red-50 relative">
      {/* 애니메이션 배경 요소들 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${20 + Math.random() * 20}px`,
            }}
            animate={{
              y: [-30, -60, -30],
              x: [-10, 10, -10],
              rotate: [0, 360],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          >
            {['💕', '💖', '✨', '🌟', '💫'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      {/* 타코야끼 굽기 섹션 */}
      <div className="relative min-h-full flex flex-col py-2 items-center justify-centers">
        <motion.div className="relative mb-6">
          <img
            src={IMAGES.TACO['taco-signal']}
            alt="타코시그널"
            className="w-[180px] h-auto z-10 relative"
          />
          <motion.div
            className="absolute inset-0 bg-yellow-300/30 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* 메시지 박스 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentStep}-${messageIndex}`}
            className="bg-white/90 backdrop-blur-md rounded-2xl px-4 py-2 shadow-2xl border-2 border-pink-300 relative"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 15 }}
          >
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l-3 border-t-3 border-pink-300 rotate-45" />
            <span className="text-medium font-semibold text-gray-700 block text-center">
              {stepMessages[currentStep]?.[messageIndex] || stepMessages[0][0]}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* 향상된 타코야끼 팬 */}
        <motion.div
          className="relative w-[320px] h-[320px] mb-8"
          animate={{
            rotate: isFlipped ? [0, 3, -3, 0] : 0,
            scale: currentStep >= 2 ? [1, 1.02, 1] : 1,
          }}
          transition={{
            duration: 0.6,
            repeat: isFlipped ? 4 : 0,
            ease: 'easeInOut',
          }}
        >
          <motion.img
            src={IMAGES.TACO['taco-pan']}
            alt="타코야끼 판"
            className="absolute top-0 left-0 w-full h-full object-contain z-0 select-none pointer-events-none"
            style={{
              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))',
            }}
          />

          {/* 요리 효과 */}
          {currentStep >= 1 && (
            <>
              {/* 중앙 큰 증기 */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="text-5xl">💨</span>
              </motion.div>

              {/* 작은 증기들 */}
              <motion.div
                className="absolute top-1/4 right-1/4 z-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <span className="text-2xl">💨</span>
              </motion.div>

              <motion.div
                className="absolute top-1/3 left-1/4 z-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
              >
                <span className="text-xl">💨</span>
              </motion.div>

              {/* 반짝이는 효과들 */}
              <motion.div
                className="absolute top-1/4 right-1/4 z-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              >
                <span className="text-2xl">✨</span>
              </motion.div>

              <motion.div
                className="absolute bottom-1/4 left-1/3 z-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.7, repeat: Infinity, delay: 0.8 }}
              >
                <span className="text-xl">✨</span>
              </motion.div>

              <motion.div
                className="absolute top-1/2 right-1/3 z-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: 1.2 }}
              >
                <span className="text-lg">⭐</span>
              </motion.div>

              {/* 불꽃 효과 */}
              <motion.div
                className="absolute bottom-1/3 left-1/2 z-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.3, repeat: Infinity, delay: 0.7 }}
              >
                <span className="text-xl">🔥</span>
              </motion.div>

              <motion.div
                className="absolute bottom-1/4 right-1/2 z-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: 1.5 }}
              >
                <span className="text-lg">🔥</span>
              </motion.div>

              {/* 요리 도구들 */}
              {currentStep >= 2 && (
                <>
                  <motion.div
                    className="absolute top-1/6 left-1/2 z-5"
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-2xl">🥢</span>
                  </motion.div>

                  <motion.div
                    className="absolute bottom-1/6 right-1/6 z-5"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  >
                    <span className="text-xl">🍳</span>
                  </motion.div>
                </>
              )}

              {/* 맛있는 냄새 효과 */}
              {currentStep >= 3 && (
                <>
                  <motion.div
                    className="absolute top-1/8 left-1/3 z-5"
                    animate={{
                      y: [-10, -30, -10],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <span className="text-lg">😋</span>
                  </motion.div>

                  <motion.div
                    className="absolute top-1/8 right-1/3 z-5"
                    animate={{
                      y: [-5, -25, -5],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{ duration: 2.8, repeat: Infinity, delay: 0.8 }}
                  >
                    <span className="text-base">🤤</span>
                  </motion.div>
                </>
              )}
            </>
          )}

          {/* 타코야끼 그리드 - 더 부드러운 애니메이션 */}
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
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: i * 0.1,
                    type: 'spring',
                    damping: 8,
                    stiffness: 100,
                  }}
                >
                  <ReactCardFlip
                    isFlipped={isFlipped}
                    flipDirection="horizontal"
                    containerStyle={{ width: '66px', height: '66px' }}
                    flipSpeedBackToFront={0.8}
                    flipSpeedFrontToBack={0.8}
                  >
                    <motion.img
                      src={frontImage}
                      alt={`타코-front-${i}`}
                      className="w-[66px] h-[66px] object-contain"
                      whileHover={
                        isCenter && isRevealed
                          ? {
                              scale: 1.15,
                              rotate: [0, 5, -5, 0],
                            }
                          : {}
                      }
                      transition={{ type: 'spring', damping: 10 }}
                    />

                    <motion.img
                      src={backImage}
                      alt={`타코-back-${i}`}
                      className={`w-[66px] h-[66px] object-contain transition-all duration-1000 ${
                        isBaked ? 'opacity-100' : 'opacity-70'
                      }`}
                      animate={
                        isBaked && isCenter
                          ? {
                              filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)'],
                            }
                          : {}
                      }
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </ReactCardFlip>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* 더 예쁜 진행 표시 */}
        <motion.div
          className="flex space-x-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2, 3].map((step) => (
            <motion.div
              key={step}
              className={`relative w-4 h-4 rounded-full transition-all duration-700 ${
                currentStep >= step ? 'bg-gradient-to-r from-pink-400 to-orange-400' : 'bg-gray-200'
              }`}
              animate={
                currentStep === step
                  ? {
                      scale: [1, 1.4, 1],
                      boxShadow: [
                        '0 0 0 0 rgba(236, 72, 153, 0)',
                        '0 0 0 8px rgba(236, 72, 153, 0.2)',
                        '0 0 0 0 rgba(236, 72, 153, 0)',
                      ],
                    }
                  : {}
              }
              transition={{ duration: 1, repeat: currentStep === step ? Infinity : 0 }}
            >
              {currentStep >= step && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 0.6, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 결과 섹션 */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            className="bg-white/95 backdrop-blur-md relative z-10"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', duration: 1, damping: 20 }}
          >
            <div className="max-w-full mx-auto py-16 space-y-10">
              {/* 더 화려한 헤더 */}
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <motion.h1
                  className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-4"
                  animate={{
                    backgroundPosition: ['0%', '100%', '0%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🎉 타코시그널 결과 🎉
                </motion.h1>
                <motion.p
                  className="text-gray-600 text-lg font-semibold"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  운명의 매칭이 완성되었어요! 💘
                </motion.p>
              </motion.div>

              {/* 본인 유형 */}
              <motion.div
                className="relative bg-gradient-to-br from-pink-100 via-red-100 to-orange-100 rounded-3xl shadow-2xl p-10 border-4 border-pink-200 overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', damping: 15 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 20px 40px rgba(236, 72, 153, 0.2)',
                }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-200/30 rounded-full -translate-y-16 translate-x-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-200/30 rounded-full translate-y-12 -translate-x-12" />

                <div className="text-center relative z-10">
                  <motion.div
                    className="text-8xl mb-6"
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {ubti_type.emoji}
                  </motion.div>
                  <h2 className="text-xl font-bold text-pink-800 mb-4">
                    당신은 {ubti_type.name}🐙
                  </h2>
                  <p className="text-gray-700 text-caption-1 leading-relaxed max-w-md mx-auto">
                    {ubti_type.description}
                  </p>
                </div>
              </motion.div>

              {/* 요약 */}
              <motion.div
                className="bg-white rounded-3xl px-4 py-6 shadow-xl border-2 border-orange-200"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, type: 'spring' }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-6">
                  <motion.span
                    className="text-title-1 mr-4"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    📝
                  </motion.span>
                  <h3 className="text-xl font-bold text-orange-700">당신의 특별한 매력</h3>
                </div>
                <ReactMarkdown components={markdownComponents}>{summary}</ReactMarkdown>
              </motion.div>

              {/* 추천 요금제 - 티켓 스타일 */}
              <motion.div
                className="bg-white rounded-3xl p-4 shadow-xl border-2 border-blue-200"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                <div className="flex items-center mb-6">
                  <motion.span
                    className="text-xl mr-4"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    📱
                  </motion.span>
                  <h3 className="text-xl font-bold text-blue-700">맞춤 요금제 티켓</h3>
                </div>

                <div className="grid gap-4">
                  {recommendation.plans.map((plan, index) => (
                    <motion.div
                      key={index}
                      className="relative bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 overflow-hidden"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2)',
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      {/* 티켓 구멍 효과 */}
                      <div className="absolute left-0 top-1/2 w-6 h-6 bg-white rounded-full -translate-x-3 -translate-y-3" />
                      <div className="absolute right-0 top-1/2 w-6 h-6 bg-white rounded-full translate-x-3 -translate-y-3" />
                      <div className="flex flex-col items-end justify-between gap-3">
                        <div className="flex-1">
                          <div className="font-bold text-blue-800 text-lg mb-2">{plan.name}</div>
                          <div className="text-gray-700">{plan.description}</div>
                        </div>
                        <motion.button
                          onClick={() => handlePlanClick(plan.name)}
                          className="bg-blue-600 text-white px-4 py-3 rounded-xl text-caption-1 shadow-lg ml-4"
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: '#1d4ed8',
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          선택하기 🚀
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* 추천 구독 서비스 - 카드 스타일 */}
              <motion.div
                className="bg-white rounded-3xl p-4 shadow-xl border-2 border-green-200"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, type: 'spring' }}
              >
                <div className="flex items-center mb-6">
                  <motion.span
                    className="text-xl mr-4"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  >
                    🎵
                  </motion.span>
                  <h3 className="text-xl font-bold text-green-700">특별 구독 서비스</h3>
                </div>

                <motion.div
                  className="relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border-green-300 overflow-hidden"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 15px 35px rgba(34, 197, 94, 0.2)',
                  }}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-green-200/30 rounded-full -translate-y-10 translate-x-10" />

                  <div className="flex flex-col items-end justify-between relative z-10 gap-3">
                    <div className="flex-1">
                      <div className="font-bold text-green-800 text-title-1 mb-3">
                        {recommendation.subscription.name} ✨
                      </div>
                      <div className="text-gray-700 text-caption-1">
                        {recommendation.subscription.description}
                      </div>
                    </div>
                    <motion.button
                      onClick={() => handleServiceClick(recommendation.subscription.name)}
                      className="bg-green-600 text-white p-3 rounded-xl text-medium shadow-lg ml-6"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: '#059669',
                        boxShadow: '0 10px 25px rgba(34, 197, 94, 0.3)',
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      구독하기 🎶
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>

              {/* 궁합 타입 - 더 로맨틱하게 */}
              <motion.div
                className="relative bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 rounded-3xl shadow-2xl p-6 border-4 border-purple-200 overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: 'spring', damping: 15 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 25px 50px rgba(147, 51, 234, 0.2)',
                }}
              >
                {/* 로맨틱한 배경 효과 */}
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-pink-200/50 text-xl"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        rotate: [0, 180, 360],
                        opacity: [0.3, 0.7, 0.3],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    >
                      💖
                    </motion.div>
                  ))}
                </div>

                <div className="text-center relative z-10">
                  <motion.h2
                    className="text-2xl font-bold text-purple-800 mb-6"
                    animate={{
                      textShadow: [
                        '0 0 0 rgba(147, 51, 234, 0)',
                        '0 0 20px rgba(147, 51, 234, 0.3)',
                        '0 0 0 rgba(147, 51, 234, 0)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    💘 당신과 어울리는 유형
                  </motion.h2>

                  <motion.div
                    className="text-2xl mb-6 relative"
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {matching_type.emoji}

                    {/* 반짝이는 효과 */}
                    <motion.div
                      className="absolute -top-2 -right-2 text-yellow-400 text-2xl"
                      animate={{
                        scale: [0, 1.5, 0],
                        rotate: [0, 180, 360],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    >
                      ✨
                    </motion.div>
                  </motion.div>

                  <motion.h3
                    className="text-xl font-bold text-purple-700 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    {matching_type.name}
                  </motion.h3>

                  <motion.p
                    className="text-gray-700 leading-relaxed text-caption-1 max-w-lg mx-auto mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    {matching_type.description}
                  </motion.p>

                  <motion.div
                    className="inline-block bg-white/70 backdrop-blur-sm rounded-full px-8 py-4 relative"
                    animate={{
                      boxShadow: [
                        '0 0 30px rgba(236, 72, 153, 0.3)',
                        '0 0 50px rgba(236, 72, 153, 0.6)',
                        '0 0 30px rgba(236, 72, 153, 0.3)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.span
                      className="text-pink-600 font-bold text-lg"
                      animate={{
                        color: ['#ec4899', '#f97316', '#ec4899'],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      운명적 궁합! 💕
                    </motion.span>

                    {/* 하트 펄스 효과 */}
                    <motion.div
                      className="absolute -top-1 -right-1 text-red-400 text-xl"
                      animate={{
                        scale: [1, 2.5, 1],
                        opacity: [1, 0.5, 1],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      💗
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* 하단 액션 버튼들 - SharePopover로 교체 */}
              <motion.div
                className="flex flex-col gap-4 justify-center items-center pt-8 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {/* 공유 버튼 - SharePopover를 큰 버튼 안에 포함 */}
                <motion.div
                  className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-4 rounded-2xl font-bold text-base sm:text-lg shadow-xl touch-manipulation flex items-center justify-center gap-3"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 15px 35px rgba(236, 72, 153, 0.4)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <span className="inline-block">📤</span>
                  <span>친구들에게 공유하기</span>
                  <SharePopover
                    content_title={`나는 ${result?.ubti_type.emoji} ${result?.ubti_type.name}! 타코시그널 테스트 결과를 공유해보세요 💕`}
                    shareUrl={window.location.href}
                    sharemUrl={window.location.href}
                    shareimage={IMAGES.MOONER['mooner-share']}
                    sharetitle={`나는 ${result?.ubti_type.emoji} ${result?.ubti_type.name}!`}
                    sharedescription={`타코시그널 테스트로 나의 통신 유형을 알아봤어요! ${result?.ubti_type.description}`}
                  />
                </motion.div>

                {/* 다시 테스트하기 버튼은 그대로 유지 */}
                <motion.button
                  onClick={() => window.location.reload()}
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-4 rounded-2xl font-bold text-base sm:text-lg shadow-xl touch-manipulation"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 15px 35px rgba(147, 51, 234, 0.4)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <span className="inline-block mr-2">🔄</span>
                  다시 테스트하기
                </motion.button>
              </motion.div>

              {/* 작은 하트 애니메이션 */}
              <motion.div
                className="text-center pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <motion.div
                  className="text-2xl font-medium"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  💕 감사합니다! 💕
                </motion.div>
                <p className="text-gray-500 mt-2">오늘도 무너즈와 즐거운 하루 보내세요!</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UBTIResultPage;
