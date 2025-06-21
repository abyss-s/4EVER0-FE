import React from 'react';
import { motion } from 'framer-motion';
import type { UBTIResultData } from '@/types/ubti';

interface MatchingTypeCardProps {
  matchingType: UBTIResultData['matching_type'];
}

export const MatchingTypeCard: React.FC<MatchingTypeCardProps> = ({ matchingType }) => {
  return (
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
      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200/30 text-xl"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
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
              '0 0 15px rgba(147, 51, 234, 0.2)',
              '0 0 0 rgba(147, 51, 234, 0)',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          💕 나와 찰떡궁합인 타입
        </motion.h2>

        {/* API에서 받은 이미지가 있으면 이미지 사용, 없으면 이모지 사용 */}
        {matchingType.image_url ? (
          <motion.div
            className="mb-6 flex justify-center relative"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <img
              src={matchingType.image_url}
              alt={matchingType.name}
              className="w-24 h-24 object-contain rounded-2xl shadow-lg"
              onError={(e) => {
                // 이미지 로드 실패 시 이모지로 대체
                e.currentTarget.style.display = 'none';
                const emojiElement = e.currentTarget.nextElementSibling as HTMLElement;
                if (emojiElement) {
                  emojiElement.style.display = 'block';
                }
              }}
            />
            <motion.div
              className="text-6xl hidden absolute inset-0 flex items-center justify-center" // 기본적으로 숨김
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {matchingType.emoji}
            </motion.div>

            <motion.div
              className="absolute -top-2 -right-2 text-yellow-400 text-xl"
              animate={{
                scale: [0, 1.2, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              ✨
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            className="text-6xl mb-6 relative"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {matchingType.emoji}

            <motion.div
              className="absolute -top-2 -right-2 text-yellow-400 text-xl"
              animate={{
                scale: [0, 1.2, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              ✨
            </motion.div>
          </motion.div>
        )}

        <motion.h3
          className="text-xl font-bold text-purple-700 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {matchingType.name}
        </motion.h3>

        <motion.p
          className="text-gray-700 leading-relaxed text-caption-1 max-w-lg mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {matchingType.description}
        </motion.p>

        <motion.div
          className="inline-block bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 relative"
          animate={{
            boxShadow: [
              '0 0 20px rgba(236, 72, 153, 0.2)',
              '0 0 30px rgba(236, 72, 153, 0.4)',
              '0 0 20px rgba(236, 72, 153, 0.2)',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.span
            className="text-pink-600 font-bold text-lg"
            animate={{
              color: ['#ec4899', '#f97316', '#ec4899'],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            찰떡궁합 베프 💖
          </motion.span>

          <motion.div
            className="absolute -top-1 -right-1 text-red-400 text-lg"
            animate={{
              scale: [1, 1.8, 1],
              opacity: [1, 0.6, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💗
          </motion.div>
        </motion.div>

        <motion.p
          className="text-sm text-purple-600 mt-4 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          이런 친구들이랑 대화하면 완전 재밌을거야! 💬✨
        </motion.p>
      </div>
    </motion.div>
  );
};
