import React from 'react';
import ChatBubble from './ChatBubble';
import { TypingIndicator, CardLoadingIndicator } from './ChatSkeleton';
import { Message } from '@/types/chat';
import { PlanRecommendation, SubscriptionRecommendationsData } from '@/types/streaming';
import { StreamingState } from '@/hooks/useStreamingChat';

interface ChatMessagesProps {
  messages: Message[];
  isStreaming: boolean;
  streamingState: StreamingState;
  expectingCards: boolean;
  currentPlanRecommendations: PlanRecommendation[];
  currentSubscriptionRecommendations: SubscriptionRecommendationsData | null;
  messagesEndRef: React.RefObject<HTMLDivElement> | React.MutableRefObject<HTMLDivElement | null>;
}

export const ChatMessages: React.FC<ChatMessagesProps> = React.memo(
  ({ messages, isStreaming, streamingState, messagesEndRef }) => {
    // 최신 봇 메시지 ID 계산
    const latestBotMessageId = React.useMemo(() => {
      const botMessages = messages.filter((msg) => msg.type === 'bot');
      return botMessages.length > 0 ? botMessages[botMessages.length - 1].id : null;
    }, [messages]);

    // 스트리밍 상태에 따른 로딩 컴포넌트 렌더링
    const renderLoadingState = React.useCallback(() => {
      switch (streamingState) {
        case 'waiting':
          return <TypingIndicator />;

        case 'receiving_cards':
          // 카드 대기 중
          return <CardLoadingIndicator />;

        case 'receiving_text':
          // 텍스트 수신 중에는 기존 ChatBubble을 사용하되 스트리밍 효과만 추가
          return null;

        default:
          return null;
      }
    }, [streamingState]);

    return (
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="flex flex-col space-y-2">
          {/* 기존 메시지들 */}
          {messages.map((message: Message, index: number) => {
            const isLastMessage = index === messages.length - 1;
            const isLastBotMessage = isLastMessage && message.type === 'bot';
            const isStreamingNow = isStreaming && isLastBotMessage;

            // 최신 봇 메시지인지 확인
            const isLatestBotMessage = message.type === 'bot' && message.id === latestBotMessageId;

            return (
              <ChatBubble
                key={message.id || `msg-${index}`}
                message={message}
                isStreaming={isStreamingNow}
                isLatestBotMessage={isLatestBotMessage} // 새로운 prop 전달
              />
            );
          })}

          {/* 스트리밍 상태에 따른 로딩 표시 */}
          {isStreaming && renderLoadingState()}

          <div ref={messagesEndRef} />
        </div>
      </div>
    );
  },
);

ChatMessages.displayName = 'ChatMessages';
