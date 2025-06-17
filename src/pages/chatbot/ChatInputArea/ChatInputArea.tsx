import React from 'react';
import { ChatInput } from '../ChatInput/ChatInput';
import { PremiumFeatureButton } from '../ChatContainer/PremiumFeatureButton';
import { Button } from '@/components/Button';

interface ChatInputAreaProps {
  ubtiInProgress: boolean;
  currentUBTIStep: number;
  buttonDisabled: boolean;
  isSessionEnded: boolean;
  inputPlaceholder: string;
  onSendMessage: (message: string) => void;
  onUBTIStart: () => void;
  onLikesRecommendation: () => void;
  onResetChat: () => void;
}

export const ChatInputArea: React.FC<ChatInputAreaProps> = ({
  ubtiInProgress,
  buttonDisabled,
  isSessionEnded,
  inputPlaceholder,
  onSendMessage,
  onUBTIStart,
  onLikesRecommendation,
  onResetChat,
}) => {
  return (
    <div className="bottom-0 left-0 right-0 flex flex-col space-y-3 bg-white py-3 border-t border-gray-300">
      {/* 기능 버튼들 */}
      {!ubtiInProgress && (
        <div className="flex justify-between w-full space-x-2">
          <PremiumFeatureButton
            className="flex-1"
            onClick={onUBTIStart}
            disabled={buttonDisabled}
            featureName="UBTI 분석"
          >
            UBTI 분석하기
          </PremiumFeatureButton>
          <PremiumFeatureButton
            className="flex-1"
            onClick={onLikesRecommendation}
            disabled={buttonDisabled}
            featureName="서비스 추천"
          >
            서비스 추천받기
          </PremiumFeatureButton>
        </div>
      )}

      {/* 입력창 */}
      <ChatInput
        onSendMessage={onSendMessage}
        disabled={buttonDisabled}
        placeholder={inputPlaceholder}
      />

      {/* 새 대화 시작 버튼 */}
      {isSessionEnded && (
        <Button onClick={onResetChat} className="w-full">
          새 대화 시작하기
        </Button>
      )}
    </div>
  );
};
