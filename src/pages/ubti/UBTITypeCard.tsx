import React from 'react';
import { motion } from 'framer-motion';
import type { UBTIResultData } from '@/types/ubti';

interface UBTITypeCardProps {
  ubtiType: UBTIResultData['ubti_type'];
}

export const UBTITypeCard: React.FC<UBTITypeCardProps> = ({ ubtiType }) => {
  return (
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
          {ubtiType.emoji}
        </motion.div>
        <h2 className="text-xl font-bold text-pink-800 mb-4">당신은 {ubtiType.name}🐙</h2>
        <p className="text-gray-700 text-caption-1 leading-relaxed max-w-md mx-auto">
          {ubtiType.description}
        </p>
      </div>
    </motion.div>
  );
};
