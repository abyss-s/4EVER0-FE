import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IMAGES } from '@/constant/imagePath';

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  submessage?: string;
  type?: 'cooking' | 'processing' | 'loading';
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible,
  message = '타코야끼를 굽고 있어요...',
  submessage = '조금만 기다려주세요 💕',
  type = 'cooking',
}) => {
  const getIcon = () => {
    switch (type) {
      case 'cooking':
        return '🍳';
      case 'processing':
        return (
          <img src={IMAGES.TACO['taco-secret']} alt="타코물음표" className="w-16 h-auto mx-auto" />
        );
      case 'loading':
      default:
        return '🔄';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
          <motion.div
            className="relative bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-pink-200 p-6 mx-4 max-w-sm w-full"
            style={{
              marginBottom: 'env(keyboard-inset-height, 0px)',
              transform: 'translateY(-10vh)',
            }}
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 15 }}
          >
            <div className="text-center">
              <motion.div
                className="text-4xl mb-4"
                animate={{
                  rotate: type === 'loading' ? 360 : [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { repeat: Infinity, duration: type === 'loading' ? 2 : 3 },
                  scale: { repeat: Infinity, duration: 2 },
                }}
              >
                {getIcon()}
              </motion.div>

              {/* 메시지 */}
              <motion.h3
                className="text-lg font-semibold text-gray-800 mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {message}
              </motion.h3>

              <motion.p
                className="text-sm text-gray-600 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {submessage}
              </motion.p>

              {/* 동적 Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-pink-400 to-orange-400 h-full rounded-full"
                  initial={{ width: '0%', x: '-100%' }}
                  animate={{
                    width: '100%',
                    x: ['0%', '100%', '0%'],
                  }}
                  transition={{
                    width: { duration: 2, ease: 'easeOut' },
                    x: {
                      repeat: Infinity,
                      duration: 1.5,
                      ease: 'easeInOut',
                      delay: 2,
                    },
                  }}
                />
              </div>
            </div>

            {/* 귀여운 장식 요소들 */}
            <div className="absolute -top-2 -right-2">
              <motion.div
                className="text-yellow-400 text-xl"
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
            </div>

            <div className="absolute -bottom-2 -left-2">
              <motion.div
                className="text-pink-400 text-lg"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                💗
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// 컴팩트한 인라인 로딩 컴포넌트 (카드 내부용)
export const InlineLoading: React.FC<{
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ message = '로딩중...', size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-2xl p-4',
    md: 'text-3xl p-6',
    lg: 'text-4xl p-8',
  };

  return (
    <div className="text-center">
      <motion.div
        className={`mb-4 ${sizeClasses[size]}`}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
      >
        🔄
      </motion.div>
      <p className="text-gray-600 font-medium">{message}</p>
    </div>
  );
};
