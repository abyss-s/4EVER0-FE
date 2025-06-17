import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatStore } from '@/stores/useChatStore';
import { useModalStore } from '@/stores/useModalStore';
import { useAuthStore } from '@/stores/useAuthStore';
import {
  PlanRecommendation,
  SubscriptionRecommendationsResponse,
  StreamingResponse,
} from '@/types/streaming';
import { UBTIQuestion } from '@/types/chat';

// 스트리밍 상태 타입 추가
export type StreamingState =
  | 'idle'
  | 'waiting'
  | 'receiving_cards'
  | 'receiving_text'
  | 'completed';

export const useStreamingChat = () => {
  const { isLoggedIn } = useAuthStore();
  const { openModal } = useModalStore();
  const navigate = useNavigate();
  const fullResponseRef = useRef('');

  // 카드 상태
  const [currentPlanRecommendations, setCurrentPlanRecommendations] = useState<
    PlanRecommendation[]
  >([]);
  const [currentSubscriptionRecommendations, setCurrentSubscriptionRecommendations] = useState<
    SubscriptionRecommendationsResponse['data'] | null
  >(null);

  // UBTI 상태
  const [currentUBTIStep, setCurrentUBTIStep] = useState<number>(-1);
  const [ubtiInProgress, setUbtiInProgress] = useState(false);

  // 스트리밍 상태
  const [streamingState, setStreamingState] = useState<StreamingState>('idle');
  const [expectingCards, setExpectingCards] = useState(false);

  // Zustand 액션들
  const currentSessionId = useChatStore((state) => state.currentSessionId);
  const currentSession = useChatStore((state) =>
    state.currentSessionId ? state.sessions[state.currentSessionId] : null,
  );
  const addMessage = useChatStore.getState().addMessage;
  const updateLastBotMessage = useChatStore.getState().updateLastBotMessage;
  const updateLastBotMessageWithCards = useChatStore.getState().updateLastBotMessageWithCards;
  const incrementUsage = useChatStore.getState().incrementUsage;

  // JSON 파싱 함수
  const parseStreamingResponse = useCallback((chunk: string): StreamingResponse | null => {
    try {
      const trimmed = chunk.trim();
      if (!trimmed || trimmed === '[DONE]') return null;
      return JSON.parse(trimmed);
    } catch (error) {
      return null;
    }
  }, []);

  // UBTI 응답 파싱 // TODO: 수정 필요
  const parseAndDisplayUBTIResponse = useCallback(
    (response: string) => {
      try {
        const ubtiData: UBTIQuestion = JSON.parse(response);

        if (ubtiData.question && typeof ubtiData.step === 'number') {
          setCurrentUBTIStep(ubtiData.step);

          const simpleMessage = `💭 질문 ${ubtiData.step + 1}: ${ubtiData.question}`;

          if (currentSessionId) {
            updateLastBotMessage(currentSessionId, simpleMessage);
          }

          if (ubtiData.step >= 3) {
            console.log('UBTI 4단계 완료');
            setTimeout(() => {
              setUbtiInProgress(false);
              setCurrentUBTIStep(-1);
              if (currentSessionId) {
                addMessage(
                  currentSessionId,
                  '🎉 UBTI 분석이 완료되었습니다! 결과 페이지로 이동합니다...',
                  'bot',
                );
              }
              navigate('/ubti');
            }, 5000);
          }

          return true;
        }
      } catch (error) {
        console.log('JSON 파싱 실패, 일반 텍스트로 처리:', error);
      }
      return false;
    },
    [currentSessionId, updateLastBotMessage, navigate, addMessage],
  );

  // 공통 스트리밍 처리 로직 (스트리밍 상태 추가)
  const createStreamingHandlers = useCallback(
    (userMessage: string, isUBTI: boolean = false) => {
      if (!currentSessionId || currentSession?.isCompleted) return null;

      // 로그인 체크 (기존과 동일)
      if (!isLoggedIn) {
        const canContinue = incrementUsage(currentSessionId);
        if (!canContinue) {
          openModal({
            id: 'chat-limit-modal',
            title: '채팅 횟수가 제한되었습니다!',
            description:
              '비회원은 5회까지 채팅을 이용할 수 있습니다.\n로그인하고 더 많은 기능을 이용하세요.',
            variant: 'default',
            size: 'sm',
            showClose: false,
            showCancel: false,
            showConfirm: true,
            confirmText: '로그인하기',
            confirmVariant: 'default',
            closeOnOverlayClick: false,
            closeOnEscape: false,
            onConfirm: () => {
              navigate('/login');
            },
          });
          return null;
        }
      }

      // 메시지 초기화
      addMessage(currentSessionId, userMessage, 'user');
      addMessage(currentSessionId, '', 'bot');
      fullResponseRef.current = '';

      // 상태 초기화
      setCurrentPlanRecommendations([]);
      setCurrentSubscriptionRecommendations(null);
      setStreamingState('waiting'); // 대기 상태로 설정
      setExpectingCards(userMessage.includes('추천') || userMessage.includes('요금제')); // 카드 예상 여부

      return {
        onChunk: (chunk: string) => {
          console.log('Received chunk:', chunk);

          const parsedResponse = parseStreamingResponse(chunk);

          if (parsedResponse) {
            console.log('Parsed JSON response:', parsedResponse);

            switch (parsedResponse.type) {
              case 'plan_recommendations':
                console.log('요금제 추천 받음:', parsedResponse.plans);
                setCurrentPlanRecommendations(parsedResponse.plans);
                setStreamingState('receiving_cards'); // 카드 수신 중
                updateLastBotMessageWithCards(
                  currentSessionId,
                  fullResponseRef.current,
                  parsedResponse.plans,
                  currentSubscriptionRecommendations || undefined,
                );
                break;

              case 'subscription_recommendations':
                console.log('구독 추천 받음:', parsedResponse.data);
                setCurrentSubscriptionRecommendations(parsedResponse.data);
                setStreamingState('receiving_cards'); // 카드 수신 중
                updateLastBotMessageWithCards(
                  currentSessionId,
                  fullResponseRef.current,
                  currentPlanRecommendations.length > 0 ? currentPlanRecommendations : undefined,
                  parsedResponse.data,
                );
                break;

              case 'message_start':
                console.log('메시지 시작');
                setStreamingState('receiving_text'); // 텍스트 수신 시작
                fullResponseRef.current = '';
                break;

              case 'message_chunk':
                fullResponseRef.current += parsedResponse.content;
                setStreamingState('receiving_text'); // 텍스트 수신 중
                updateLastBotMessageWithCards(
                  currentSessionId,
                  fullResponseRef.current,
                  currentPlanRecommendations.length > 0 ? currentPlanRecommendations : undefined,
                  currentSubscriptionRecommendations || undefined,
                );
                break;

              case 'message_end':
                console.log('메시지 완료');
                setStreamingState('completed'); // 완료 상태
                updateLastBotMessageWithCards(
                  currentSessionId,
                  fullResponseRef.current,
                  currentPlanRecommendations.length > 0 ? currentPlanRecommendations : undefined,
                  currentSubscriptionRecommendations || undefined,
                );
                // 완료 후 상태 리셋
                setTimeout(() => {
                  setStreamingState('idle');
                  setExpectingCards(false);
                }, 1000);
                break;
            }
          } else {
            // JSON이 아닌 일반 텍스트 처리
            if (chunk.trim()) {
              fullResponseRef.current += chunk;
              setStreamingState('receiving_text');

              if (isUBTI) {
                const isParsed = parseAndDisplayUBTIResponse(fullResponseRef.current);
                if (!isParsed) {
                  updateLastBotMessage(currentSessionId, fullResponseRef.current);
                }
              } else {
                updateLastBotMessageWithCards(
                  currentSessionId,
                  fullResponseRef.current,
                  currentPlanRecommendations.length > 0 ? currentPlanRecommendations : undefined,
                  currentSubscriptionRecommendations || undefined,
                );
              }
            }
          }
        },
        onError: () => {
          setStreamingState('idle'); // 에러 시 idle로 리셋
          setExpectingCards(false);
          updateLastBotMessage(currentSessionId, '요청 처리 중 오류가 발생했습니다.');
          setCurrentPlanRecommendations([]);
          setCurrentSubscriptionRecommendations(null);
          if (isUBTI) {
            setUbtiInProgress(false);
            setCurrentUBTIStep(-1);
          }
        },
      };
    },
    [
      currentSessionId,
      currentSession,
      isLoggedIn,
      openModal,
      navigate,
      parseAndDisplayUBTIResponse,
      updateLastBotMessage,
      updateLastBotMessageWithCards,
      addMessage,
      incrementUsage,
      parseStreamingResponse,
      currentPlanRecommendations,
      currentSubscriptionRecommendations,
    ],
  );

  // UBTI 관련 함수들 (기존과 동일)
  const startUBTI = useCallback(() => {
    setUbtiInProgress(true);
    setCurrentUBTIStep(0);
  }, []);

  const resetUBTI = useCallback(() => {
    setUbtiInProgress(false);
    setCurrentUBTIStep(-1);
  }, []);

  // 카드 상태 초기화
  const resetCards = useCallback(() => {
    setCurrentPlanRecommendations([]);
    setCurrentSubscriptionRecommendations(null);
  }, []);

  // 스트리밍 상태 초기화
  const resetStreamingState = useCallback(() => {
    setStreamingState('idle');
    setExpectingCards(false);
  }, []);

  return {
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
    parseAndDisplayUBTIResponse,
  };
};
