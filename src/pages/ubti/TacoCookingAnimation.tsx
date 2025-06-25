import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactCardFlip from 'react-card-flip';
import { IMAGES } from '@/constant/imagePath';

interface TacoCookingAnimationProps {
  currentStep: number;
  messageIndex: number;
  isFlipped: boolean;
  isBaked: boolean;
  isRevealed: boolean;
  ubtiType: {
    front_image: string;
    back_image: string;
  } | null;
  stepMessages: string[][];
}

export const TacoCookingAnimation: React.FC<TacoCookingAnimationProps> = ({
  currentStep,
  messageIndex,
  isFlipped,
  isBaked,
  isRevealed,
  ubtiType,
}) => {
  return (
    <div className="relative min-h-full flex flex-col py-2 items-center justify-centers">
      {/* 타코시그널 로고 */}
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
          <span className="text-medium font-semibold text-gray-700 block text-center"></span>
        </motion.div>
      </AnimatePresence>

      {/* 타코야끼 팬 */}
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

        {/* 요리 효과들 - 기존과 동일 */}
        {currentStep >= 1 && (
          <>
            {/* 증기 효과 */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span className="text-5xl">💨</span>
            </motion.div>

            <motion.div
              className="absolute top-1/4 right-1/4 z-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <span className="text-2xl">💨</span>
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

            {/* 불꽃 효과 */}
            <motion.div
              className="absolute bottom-1/3 left-1/2 z-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.3, repeat: Infinity, delay: 0.7 }}
            >
              <span className="text-xl">🔥</span>
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

        {/* 타코야끼 그리드 - 동적 이미지 로직 개선 */}
        <div className="absolute top-[14%] left-[16%] w-[68%] h-[68%] grid grid-cols-3 grid-rows-3 place-items-center z-10">
          {[...Array(9)].map((_, i) => {
            const isCenter = i === 4;

            // 동적 이미지 선택 로직 개선
            const frontImage = (() => {
              if (isRevealed) {
                if (isCenter && ubtiType?.front_image) {
                  // 중앙에 실제 UBTI 타입 이미지 사용
                  return ubtiType.front_image;
                } else {
                  // 주변에는 기본 이미지
                  return IMAGES.TACO['taco-sub-front'];
                }
              } else {
                // 아직 공개되지 않음
                return IMAGES.TACO['taco-main-front'];
              }
            })();

            const backImage = (() => {
              if (isBaked) {
                if (isCenter && ubtiType?.back_image) {
                  // 중앙에 실제 UBTI 타입 이미지 사용

                  return ubtiType.back_image;
                } else {
                  // 주변에는 기본 이미지
                  return IMAGES.TACO['taco-sub-back'];
                }
              } else {
                // 아직 구워지지 않음
                return IMAGES.TACO['taco-main-back'];
              }
            })();

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
                    // 이미지 로드 에러 시 기본 앞면
                    onError={(e) => {
                      e.currentTarget.src = IMAGES.TACO['taco-main-front'];
                    }}
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
                    // 이미지 로드 에러 시 기본 뒷면
                    onError={(e) => {
                      e.currentTarget.src = IMAGES.TACO['taco-main-back'];
                    }}
                  />
                </ReactCardFlip>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* 진행 표시 */}
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
  );
};
