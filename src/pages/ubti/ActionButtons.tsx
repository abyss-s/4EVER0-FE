import React from 'react';
import { motion } from 'framer-motion';
import SharePopover from '../share/SharePopover';
import { IMAGES } from '@/constant/imagePath';
import type { UBTIResultData } from '@/types/ubti';

interface ActionButtonsProps {
  result: UBTIResultData;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ result }) => {
  return (
    <motion.div
      className="flex flex-col gap-4 justify-center items-center pt-8 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      {/* 공유 버튼 */}
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
          content_title={`나는 ${result.ubti_type.emoji} ${result.ubti_type.name}! 타코시그널 테스트 결과를 공유해보세요 💕`}
          shareUrl={window.location.href}
          sharemUrl={window.location.href}
          shareimage={IMAGES.MOONER['mooner-share']}
          sharetitle={`나는 ${result.ubti_type.emoji} ${result.ubti_type.name}!`}
          sharedescription={`타코시그널 테스트로 나의 통신 유형을 알아봤어요! ${result.ubti_type.description}`}
        />
      </motion.div>

      {/* 다시 테스트하기 버튼 */}
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
  );
};
