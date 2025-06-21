import React from 'react';
import { motion } from 'framer-motion';
import type { UBTIResultData } from '@/types/ubti';

interface RecommendationCardProps {
  recommendation: UBTIResultData['recommendation'];
  onPlanClick: (planName: string) => void;
  onServiceClick: (serviceName: string) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  onPlanClick,
  onServiceClick,
}) => {
  return (
    <>
      {/* 추천 요금제 */}
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
              <div className="absolute left-0 top-1/2 w-6 h-6 bg-white rounded-full -translate-x-3 -translate-y-3" />
              <div className="absolute right-0 top-1/2 w-6 h-6 bg-white rounded-full translate-x-3 -translate-y-3" />
              <div className="flex flex-col items-end justify-between gap-3">
                <div className="flex-1">
                  <div className="font-bold text-blue-800 text-lg mb-2">{plan.name}</div>
                  <div className="text-gray-700">{plan.description}</div>
                </div>
                <motion.button
                  onClick={() => onPlanClick(plan.name)}
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

      {/* 추천 구독 서비스 */}
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
              onClick={() => onServiceClick(recommendation.subscription.name)}
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
    </>
  );
};
