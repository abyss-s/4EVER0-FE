import React, { useRef, useEffect, useCallback, useMemo, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useChatStore } from '@/stores/useChatStore';
import {
  useChatMutation,
  useUBTIMutation,
  useLikesRecommendationMutation,
} from '@/hooks/useChatMutation';
import { useStreamingChat } from '@/hooks/useStreamingChat';

// 컴포넌트 imports
import { UBTIOverlay } from '../UBTIOverlay/UBTIOverlay';
import { ChatHeader } from '../ChatHeader/ChatHeader';
import { ChatMessages } from '../ChatMessages/ChatMessages';
import { ChatInputArea } from '../ChatInputArea/ChatInputArea';

export const ChatContainer: React.FC = () => {
  const [isMunerTone, setIsMunerTone] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isInitializedRef = useRef(false);
  // const navigate = useNavigate();

  const {
    currentPlanRecommendations,
    currentSubscriptionRecommendations,
    currentUBTIStep,
    ubtiInProgress,
    streamingState,
    expectingCards,
    createStreamingHandlers,
    startUBTI,
    resetUBTI,
    resetCards,
    resetStreamingState,
  } = useStreamingChat();

  // Zustand store에서 상태와 액션 분리
  const sessions = useChatStore((state) => state.sessions);
  const currentSessionId = useChatStore((state) => state.currentSessionId);
  const createSession = useChatStore.getState().createSession;
  const addMessage = useChatStore.getState().addMessage;
  const endSession = useChatStore.getState().endSession;

  // Mutations
  const chatMutation = useChatMutation();
  const ubtiMutation = useUBTIMutation();
  const likesRecommendationMutation = useLikesRecommendationMutation();

  // 현재 세션 계산
  const currentSession = useMemo(() => {
    if (!currentSessionId) return null;
    return sessions[currentSessionId] || null;
  }, [sessions, currentSessionId]);

  const messages = useMemo(() => currentSession?.messages || [], [currentSession?.messages]);
  const isSessionEnded = useMemo(
    () => currentSession?.isCompleted || false,
    [currentSession?.isCompleted],
  );

  // 초기화 로직
  const initializeChat = useCallback(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      const newSessionId = createSession();
      addMessage(
        newSessionId,
        '안녕하세요! 😊 저는 LG유플러스의 AI 어시스턴트예요. 궁금한 점이 있으시면 언제든지 물어보세요!',
        'bot',
      );
    }
  }, [createSession, addMessage]);

  // 컴포넌트 마운트 시 초기화
  useEffect(() => {
    if (!currentSessionId) {
      initializeChat();
    }
  }, [currentSessionId, initializeChat]);

  // 자동 스크롤
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length]);

  // 일반 채팅 메시지 전송
  const handleSendMessage = useCallback(
    async (message: string) => {
      // UBTI 진행 중이면 UBTI 답변으로 처리
      if (ubtiInProgress && currentUBTIStep >= 0) {
        const handlers = createStreamingHandlers(message, true);
        if (!handlers) return;

        try {
          await ubtiMutation.mutateAsync({
            sessionId: currentSessionId!,
            message,
            onChunk: handlers.onChunk,
            tone: isMunerTone ? 'muneoz' : 'general',
          });
        } catch (error) {
          console.error('UBTI 답변 에러:', error);
          handlers.onError();
        }
        return;
      }

      // 일반 채팅
      const handlers = createStreamingHandlers(message, false);
      if (!handlers) return;

      try {
        await chatMutation.mutateAsync({
          sessionId: currentSessionId!,
          message,
          onChunk: handlers.onChunk,
          tone: isMunerTone ? 'muneoz' : 'general',
        });
      } catch (error) {
        console.error('채팅 에러:', error);
        handlers.onError();
      }
    },
    [
      createStreamingHandlers,
      chatMutation,
      ubtiMutation,
      currentSessionId,
      ubtiInProgress,
      currentUBTIStep,
      isMunerTone,
    ],
  );

  // UBTI 시작
  const handleUBTIStart = useCallback(async () => {
    startUBTI();

    const message = 'UBTI 분석을 시작해주세요';
    const handlers = createStreamingHandlers(message, true);
    if (!handlers) return;

    try {
      await ubtiMutation.mutateAsync({
        sessionId: currentSessionId!,
        message,
        onChunk: handlers.onChunk,
        tone: isMunerTone ? 'muneoz' : 'general',
      });
    } catch (error) {
      console.error('UBTI 시작 에러:', error);
      handlers.onError();
    }
  }, [createStreamingHandlers, ubtiMutation, currentSessionId, isMunerTone, startUBTI]);

  // 좋아요 추천 시작
  const handleLikesRecommendation = useCallback(async () => {
    const message = '좋아요한 서비스 기반으로 추천해 주세요';
    const handlers = createStreamingHandlers(message, false);
    if (!handlers) return;

    try {
      await likesRecommendationMutation.mutateAsync({
        sessionId: currentSessionId!,
        onChunk: handlers.onChunk,
        tone: isMunerTone ? 'muneoz' : 'general',
      });
    } catch (error) {
      console.error('추천 에러:', error);
      handlers.onError();
    }
  }, [createStreamingHandlers, likesRecommendationMutation, currentSessionId, isMunerTone]);

  // 채팅 초기화
  const resetChat = useCallback(() => {
    if (currentSessionId) {
      endSession(currentSessionId);
    }
    resetUBTI();
    resetCards();
    resetStreamingState(); // 🆕
    const newSessionId = createSession();
    addMessage(newSessionId, '새로운 대화를 시작합니다! 😊 무엇을 도와드릴까요?', 'bot');
  }, [
    currentSessionId,
    endSession,
    resetUBTI,
    resetCards,
    resetStreamingState,
    createSession,
    addMessage,
  ]);
  // 톤 변경
  const handleToneToggle = useCallback((isMuner: boolean) => {
    setIsMunerTone(isMuner);
  }, []);

  // 버튼 상태
  const buttonDisabled = useMemo(
    () =>
      isSessionEnded ||
      chatMutation.isPending ||
      ubtiMutation.isPending ||
      likesRecommendationMutation.isPending,
    [
      isSessionEnded,
      chatMutation.isPending,
      ubtiMutation.isPending,
      likesRecommendationMutation.isPending,
    ],
  );

  // 스트리밍 상태
  const isStreaming = useMemo(
    () => chatMutation.isPending || ubtiMutation.isPending || likesRecommendationMutation.isPending,
    [chatMutation.isPending, ubtiMutation.isPending, likesRecommendationMutation.isPending],
  );

  // 입력 필드 플레이스홀더
  const inputPlaceholder = useMemo(() => {
    if (ubtiInProgress && currentUBTIStep >= 0) {
      return `UBTI 질문 ${currentUBTIStep + 1}/4에 답변해주세요...`;
    }
    return '메시지를 입력하세요...';
  }, [ubtiInProgress, currentUBTIStep]);

  return (
    <div className="flex flex-col relative h-full">
      {/* UBTI 진행 상황 오버레이 */}
      <UBTIOverlay
        ubtiInProgress={ubtiInProgress}
        currentUBTIStep={currentUBTIStep}
        messages={messages}
      />

      {/* 헤더 영역 */}
      <ChatHeader
        ubtiInProgress={ubtiInProgress}
        isMunerTone={isMunerTone}
        onToneToggle={handleToneToggle}
        buttonDisabled={buttonDisabled}
        currentSession={currentSession}
      />

      {/* 메시지 영역 */}
      <ChatMessages
        messages={messages}
        isStreaming={isStreaming}
        streamingState={streamingState} // 🆕
        expectingCards={expectingCards} // 🆕
        currentPlanRecommendations={currentPlanRecommendations}
        currentSubscriptionRecommendations={currentSubscriptionRecommendations}
        messagesEndRef={messagesEndRef}
      />

      {/* 입력 영역 */}
      <ChatInputArea
        ubtiInProgress={ubtiInProgress}
        currentUBTIStep={currentUBTIStep}
        buttonDisabled={buttonDisabled}
        isSessionEnded={isSessionEnded}
        inputPlaceholder={inputPlaceholder}
        onSendMessage={handleSendMessage}
        onUBTIStart={handleUBTIStart}
        onLikesRecommendation={handleLikesRecommendation}
        onResetChat={resetChat}
      />
    </div>
  );
};
