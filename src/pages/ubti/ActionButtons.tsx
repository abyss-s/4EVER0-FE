import React from 'react';
import { motion } from 'framer-motion';
import SharePopover from '../share/SharePopover';
import { FocusableButton } from '@/components/Popover/FocusableButton';
import { IMAGES } from '@/constant/imagePath';
import { useUserProfile } from '@/stores/useUserProfile';
import type { UBTIResultData } from '@/types/ubti';

interface ActionButtonsProps {
  result: UBTIResultData;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ result }) => {
  const { data: profile } = useUserProfile();
  // 로그인한 검사자의 사용자 이름 가져오기
  const userName = profile?.name || '무너즈';
  // 공유용 URL 생성 - 사용자 이름을 쿼리 파라미터로 포함
  const shareUrl = `${window.location.origin}/share/${result.ubti_type.id}?user=${encodeURIComponent(userName)}`;

  return (
    <motion.div
      className="flex flex-col gap-4 justify-center items-center pt-8 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      {/* 공유 버튼 */}
      <motion.div
        className="w-full sm:w-auto"
        whileHover={{
          scale: 1.05,
          boxShadow: '0 15px 35px rgba(236, 72, 153, 0.4)',
        }}
        whileTap={{ scale: 0.95 }}
      >
        <SharePopover
          missionId={1}
          content_title={`${userName}님은 ${result.ubti_type.emoji} ${result.ubti_type.name}! 타코시그널 테스트 결과를 공유해보세요 💕`}
          shareUrl={shareUrl}
          sharemUrl={shareUrl}
          shareimage={IMAGES.MOONER['mooner-share']}
          sharetitle={`${userName}님은 ${result.ubti_type.emoji} ${result.ubti_type.name}!`}
          sharedescription={`타코시그널 테스트로 ${userName}님의 통신 유형을 알아봤어요! ${result.ubti_type.description}`}
        />
      </motion.div>

      {/* 다시 테스트하기 버튼 */}
      <motion.div
        className="w-full sm:w-auto"
        whileHover={{
          scale: 1.05,
          boxShadow: '0 15px 35px rgba(147, 51, 234, 0.4)',
        }}
        whileTap={{ scale: 0.95 }}
      >
        <FocusableButton
          onClick={() => window.location.reload()}
          variant="gradient-purple"
          size="xl"
          className="w-full touch-manipulation"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <motion.span
            className="inline-block text-xl mr-2"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            🔄
          </motion.span>
          <span>다시 테스트하기</span>
        </FocusableButton>
      </motion.div>

      {/* 키보드 접근성 안내 */}
      <motion.div
        className="text-center text-xs text-gray-500 mt-2 opacity-75"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        transition={{ delay: 1.5 }}
      >
        <p>💡 키보드 Tab키로 버튼 이동, Enter/Space로 선택 가능</p>
        <p className="mt-1">🔗 공유 링크를 통해 친구들도 테스트할 수 있어요!</p>
      </motion.div>
    </motion.div>
  );
};
