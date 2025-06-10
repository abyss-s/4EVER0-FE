import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { ChatBubble } from '../ChatBubble/ChatBubble';
import { ChatInput } from '../ChatInput/ChatInput';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { useChatStore } from '@/stores/useChatStore';
import {
  useChatMutation,
  useUBTIMutation,
  useLikesRecommendationMutation,
} from '@/hooks/useChatMutation';
import { Message } from '@/types/chat';

export const ChatContainer: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fullResponseRef = useRef('');
  const isInitializedRef = useRef(false);

  // Zustand store에서 상태와 액션 분리
  const sessions = useChatStore((state) => state.sessions);
  const currentSessionId = useChatStore((state) => state.currentSessionId);

  // 액션들을 개별적으로 가져오기
  const createSession = useChatStore.getState().createSession;
  const addMessage = useChatStore.getState().addMessage;
  const updateLastBotMessage = useChatStore.getState().updateLastBotMessage;
  const incrementUsage = useChatStore.getState().incrementUsage;
  const endSession = useChatStore.getState().endSession;

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
  }, []);

  // 컴포넌트 마운트 시 한 번만 실행
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

  // 공통 스트리밍 로직
  const processStreamingMessage = useCallback(
    (_message: string, userMessage: string) => {
      if (!currentSessionId || isSessionEnded) return;

      // 사용 횟수 체크
      const canContinue = incrementUsage(currentSessionId);
      if (!canContinue) {
        addMessage(currentSessionId, '채팅 세션이 종료되었습니다. (최대 3회 사용)', 'bot');
        return;
      }

      // 사용자 메시지 추가
      addMessage(currentSessionId, userMessage, 'user');

      // 빈 봇 메시지 생성
      addMessage(currentSessionId, '', 'bot');
      fullResponseRef.current = '';

      return {
        onChunk: (chunk: string) => {
          fullResponseRef.current += chunk;
          updateLastBotMessage(currentSessionId, fullResponseRef.current);
        },
        onError: () => {
          updateLastBotMessage(currentSessionId, '요청 처리 중 오류가 발생했습니다.');
        },
      };
    },
    [currentSessionId, isSessionEnded],
  );

  // 일반 채팅 메시지 전송
  const handleSendMessage = useCallback(
    async (message: string) => {
      const handlers = processStreamingMessage(message, message);
      if (!handlers) return;

      try {
        await chatMutation.mutateAsync({
          sessionId: currentSessionId!,
          message,
          onChunk: handlers.onChunk,
        });
      } catch (error) {
        console.error('채팅 에러:', error);
        handlers.onError();
      }
    },
    [processStreamingMessage, chatMutation, currentSessionId],
  );

  // UBTI 시작
  const handleUBTIStart = useCallback(async () => {
    const message = 'UBTI 분석을 시작해주세요!';
    const handlers = processStreamingMessage(message, message);
    if (!handlers) return;

    try {
      await ubtiMutation.mutateAsync({
        sessionId: currentSessionId!,
        message,
        onChunk: handlers.onChunk,
      });
    } catch (error) {
      console.error('UBTI 에러:', error);
      handlers.onError();
    }
  }, [processStreamingMessage, ubtiMutation, currentSessionId]);

  // 좋아요 추천 시작
  const handleLikesRecommendation = useCallback(async () => {
    const message = '좋아요한 서비스 기반으로 추천해 주세요!';
    const handlers = processStreamingMessage(message, message);
    if (!handlers) return;

    try {
      await likesRecommendationMutation.mutateAsync({
        sessionId: currentSessionId!,
        onChunk: handlers.onChunk,
      });
    } catch (error) {
      console.error('추천 에러:', error);
      handlers.onError();
    }
  }, [processStreamingMessage, likesRecommendationMutation, currentSessionId]);

  const resetChat = useCallback(() => {
    if (currentSessionId) {
      endSession(currentSessionId);
    }
    const newSessionId = createSession();
    addMessage(newSessionId, '새로운 대화를 시작합니다! 😊 무엇을 도와드릴까요?', 'bot');
  }, [currentSessionId]);

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

  // 사용량 표시
  const usageDisplay = useMemo(
    () => (currentSession ? `${currentSession.usageCount}/3` : '0/3'),
    [currentSession?.usageCount],
  );

  return (
    <Card className="w-full max-w-md mx-auto h-[560px] flex flex-col border-0">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>무너즈 챗봇 v.1</span>
          <span className="text-sm font-normal text-muted-foreground">
            남은 채팅 횟수: {usageDisplay}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col space-y-2">
          {messages.map((message: Message, index: number) => (
            <ChatBubble
              key={message.id}
              message={message}
              isStreaming={
                (chatMutation.isPending ||
                  ubtiMutation.isPending ||
                  likesRecommendationMutation.isPending) &&
                index === messages.length - 1 &&
                message.type === 'bot'
              }
            />
          ))}

          <div ref={messagesEndRef} />
        </div>
      </CardContent>

      <CardFooter className="flex flex-col space-y-4 p-4 border-t">
        <div className="flex justify-between w-full space-x-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleUBTIStart}
            disabled={buttonDisabled}
          >
            UBTI 분석받기
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleLikesRecommendation}
            disabled={buttonDisabled}
          >
            서비스 추천받기
          </Button>
        </div>

        <ChatInput onSendMessage={handleSendMessage} disabled={buttonDisabled} />

        {isSessionEnded && (
          <Button onClick={resetChat} className="w-full">
            새 대화 시작하기
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
