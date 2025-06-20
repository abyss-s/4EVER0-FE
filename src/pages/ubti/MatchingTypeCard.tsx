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
          {matchingType.emoji}

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
  );
};
