import React from 'react';
import { ChatBubble } from '../ChatBubble/ChatBubble';
import { TypingIndicator, CardLoadingIndicator } from '../ChatSkeleton';
import { Message } from '@/types/chat';
import { PlanRecommendation, SubscriptionRecommendationsResponse } from '@/types/streaming';
import { StreamingState } from '@/hooks/useStreamingChat';

interface ChatMessagesProps {
  messages: Message[];
  isStreaming: boolean;
  streamingState: StreamingState;
  expectingCards: boolean;
  currentPlanRecommendations: PlanRecommendation[];
  currentSubscriptionRecommendations: SubscriptionRecommendationsResponse['data'] | null;
  messagesEndRef: React.RefObject<HTMLDivElement> | React.MutableRefObject<HTMLDivElement | null>;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isStreaming,
  streamingState,

  currentPlanRecommendations,
  currentSubscriptionRecommendations,
  messagesEndRef,
}) => {
  // 스트리밍 상태에 따른 로딩 컴포넌트 렌더링
  const renderLoadingState = () => {
    switch (streamingState) {
      case 'waiting':
        return <TypingIndicator />;

      case 'receiving_cards':
        // 카드 대기 중 (아바타 한 번만 표시)
        return <CardLoadingIndicator />;

      case 'receiving_text':
        // 텍스트 수신 중에는 기존 ChatBubble을 사용하되 스트리밍 효과만 추가
        return null;

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto pb-4">
      <div className="flex flex-col space-y-2">
        {/* 기존 메시지들 */}
        {messages.map((message: Message, index: number) => {
          const isLastBotMessage = index === messages.length - 1 && message.type === 'bot';
          const isStreamingNow = isStreaming && isLastBotMessage;

          return (
            <ChatBubble
              key={message.id}
              message={message}
              isStreaming={isStreamingNow}
              // 저장된 카드 정보 또는 현재 스트리밍 중인 카드 정보 표시
              planRecommendations={
                message.planRecommendations ||
                (isLastBotMessage && currentPlanRecommendations.length > 0
                  ? currentPlanRecommendations
                  : undefined)
              }
              subscriptionRecommendations={
                message.subscriptionRecommendations ||
                (isLastBotMessage && currentSubscriptionRecommendations
                  ? currentSubscriptionRecommendations
                  : undefined)
              }
            />
          );
        })}

        {/* 스트리밍 상태에 따른 로딩 표시 */}
        {isStreaming && renderLoadingState()}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
