import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatStore } from '@/stores/useChatStore';
import { useModalStore } from '@/stores/useModalStore';
import { useAuthStore } from '@/stores/useAuthStore';
import {
  PlanRecommendation,
  SubscriptionRecommendationsData,
  SubscriptionItem,
  MainSubscriptionWithType,
  LifeBrandWithType,
  StreamingResponse,
  UsageAnalysisData,
} from '@/types/streaming';
import type { UBTIStreamingMessage } from '@/types/streaming';

// 스트리밍 상태 타입
export type StreamingState =
  | 'idle'
  | 'waiting'
  | 'receiving_cards'
  | 'receiving_text'
  | 'completed'
  | 'ubti_loading'
  | 'likes_loading';

export const useStreamingChat = () => {
  const { isLoggedIn } = useAuthStore();
  const { openModal } = useModalStore();
  const navigate = useNavigate();
  const fullResponseRef = useRef('');
  const [currentUBTIQuestionText, setCurrentUBTIQuestionText] = useState<string | null>(null);
  const [ubtiReadyToSubmit, setUbtiReadyToSubmit] = useState(false);

  // 카드 데이터를 스트리밍 세션 동안 유지하는 ref 추가
  const cardDataRef = useRef<{
    plans: PlanRecommendation[];
    subscriptions: SubscriptionRecommendationsData | null;
    usageAnalysis: UsageAnalysisData | null;
  }>({
    plans: [],
    subscriptions: null,
    usageAnalysis: null,
  });

  // 질문 텍스트 추출을 위한 패턴들
  const questionPatterns = [
    /질문\s*\d*\s*[:.]\s*(.+?)(?=\n|$)/i,
    /Q\d*[:.]\s*(.+?)(?=\n|$)/i,
    /\d+\.\s*(.+\?)/i,
    /(.+\?)/i,
    /다음 중.+선택해주세요/i,
    /어떤.+생각하시나요/i,
    /당신은.+어떻게/i,
  ];

  // 요금제 카드 상태
  const [currentPlanRecommendations, setCurrentPlanRecommendations] = useState<
    PlanRecommendation[]
  >([]);

  // 구독 카드 상태
  const [currentSubscriptionRecommendations, setCurrentSubscriptionRecommendations] =
    useState<SubscriptionRecommendationsData | null>(null);

  // UBTI 상태
  const [currentUBTIStep, setCurrentUBTIStep] = useState<number>(-1);
  const [ubtiInProgress, setUbtiInProgress] = useState(false);

  // 사용량 분석 상태
  const [currentUsageAnalysis, setCurrentUsageAnalysis] = useState<UsageAnalysisData | null>(null);

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

  // 배열을 기존 객체 형태로 변환하는 헬퍼 함수 (type 필드 제거)
  const convertSubscriptionArrayToObject = useCallback(
    (subscriptions: SubscriptionItem[]): SubscriptionRecommendationsData => {
      const result: SubscriptionRecommendationsData = {};

      subscriptions.forEach((item) => {
        if (item.type === 'main_subscription') {
          // MainSubscription 타입에 맞게 변환
          const { ...mainSubData } = item as MainSubscriptionWithType;
          result.main_subscription = {
            ...mainSubData,
            title: mainSubData.title || '',
            price: mainSubData.price || 0,
            category: mainSubData.category || '',
            image_url: mainSubData.image_url || '',
          };
        } else if (item.type === 'life_brand') {
          // LifeBrand 타입에 맞게 변환
          const { ...lifeBrandData } = item as LifeBrandWithType;
          result.life_brand = {
            ...lifeBrandData,
            name: lifeBrandData.name || '',
            image_url: lifeBrandData.image_url || '',
            description: lifeBrandData.description || '',
          };
        }
      });

      return result;
    },
    [],
  );

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

  const extractQuestionFromText = useCallback(
    (text: string): string | null => {
      for (const pattern of questionPatterns) {
        const match = text.match(pattern);
        if (match && match[1]) {
          return match[1].trim();
        }
      }

      // 질문 키워드가 포함된 경우 전체 텍스트 반환
      if (text.includes('질문') || text.includes('?') || text.includes('선택해주세요')) {
        return text.trim();
      }

      return null;
    },
    [questionPatterns],
  );

  // UBTI 응답 파싱
  const parseAndDisplayUBTIResponse = useCallback(
    (chunk: string) => {
      try {
        const parsed: UBTIStreamingMessage = JSON.parse(chunk);

        if (parsed.type === 'question_start') {
          return true;
        }

        if (parsed.type === 'question_content') {
          setCurrentUBTIStep(parsed.step);
          setCurrentUBTIQuestionText(parsed.question);
          return true;
        }

        if (parsed.type === 'question_end') {
          return true;
        }

        if (parsed.type === 'questions_complete') {
          console.log('[DEBUG] 질문 모두 완료, 결과 준비');
          setCurrentUBTIQuestionText(null);
          setUbtiReadyToSubmit(true);
          return true;
        }
      } catch (error) {
        // 일반 텍스트에서 질문 추출 로직 추가
        const extractedQuestion = extractQuestionFromText(chunk);
        if (extractedQuestion) {
          setCurrentUBTIQuestionText(extractedQuestion);

          // 단계 추출도 시도
          const stepMatch = chunk.match(/(\d+)/);
          if (stepMatch) {
            const step = parseInt(stepMatch[1]) - 1; // 0-based
            setCurrentUBTIStep(step);
          }
          return true;
        }
      }
      return false;
    },
    [currentSessionId, updateLastBotMessage, addMessage, navigate],
  );

  // ref를 사용한 메시지 저장
  const updateMessageWithAllData = useCallback(
    (
      content: string,
      plans?: PlanRecommendation[],
      subscriptions?: SubscriptionRecommendationsData,
      usageAnalysis?: UsageAnalysisData, // 👈 추가
    ) => {
      if (!currentSessionId) return;

      // 새로운 카드 데이터가 있으면 ref 업데이트
      if (plans) {
        cardDataRef.current.plans = plans;
      }
      if (subscriptions) {
        cardDataRef.current.subscriptions = subscriptions;
      }
      if (usageAnalysis) {
        cardDataRef.current.usageAnalysis = usageAnalysis;
      }

      // 항상 ref의 최신 데이터 사용
      const currentPlans =
        cardDataRef.current.plans.length > 0 ? cardDataRef.current.plans : undefined;
      const currentSubscriptions = cardDataRef.current.subscriptions;
      const currentUsageAnalysis = cardDataRef.current.usageAnalysis;

      updateLastBotMessageWithCards(
        currentSessionId,
        content,
        currentPlans,
        currentSubscriptions || undefined,
        currentUsageAnalysis || undefined,
      );
    },
    [currentSessionId, updateLastBotMessageWithCards],
  );

  // 공통 스트리밍 처리 로직
  const createStreamingHandlers = useCallback(
    (userMessage: string, isUBTI: boolean = false, isLikes: boolean = false) => {
      if (!currentSessionId || currentSession?.isCompleted) return null;

      // 로그인 체크
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

      // 카드 데이터 ref 초기화
      cardDataRef.current = {
        plans: [],
        subscriptions: null,
        usageAnalysis: null,
      };

      // 상태 초기화
      setCurrentPlanRecommendations([]);
      setCurrentSubscriptionRecommendations(null);
      setCurrentUsageAnalysis(null);

      // 각 기능별 로딩 상태 설정
      if (isUBTI) {
        setStreamingState('ubti_loading');
      } else if (isLikes) {
        setStreamingState('likes_loading');
      } else {
        setStreamingState('waiting');
      }

      setExpectingCards(userMessage.includes('추천') || userMessage.includes('요금제') || isLikes);

      return {
        onChunk: (chunk: string) => {
          const parsedResponse = parseStreamingResponse(chunk);

          if (parsedResponse) {
            // JSON 응답 처리
            switch (parsedResponse.type) {
              case 'usage_analysis': {
                setCurrentUsageAnalysis(parsedResponse.data);
                setStreamingState('receiving_cards');
                updateMessageWithAllData(
                  fullResponseRef.current,
                  undefined,
                  undefined,
                  parsedResponse.data,
                );
                break;
              }

              case 'plan_recommendations': {
                setCurrentPlanRecommendations(parsedResponse.plans);
                setStreamingState('receiving_cards');
                updateMessageWithAllData(
                  fullResponseRef.current,
                  parsedResponse.plans,
                  undefined,
                  undefined,
                );
                break;
              }

              case 'subscription_recommendations': {
                const convertedData = convertSubscriptionArrayToObject(
                  parsedResponse.subscriptions,
                );
                setCurrentSubscriptionRecommendations(convertedData);
                setStreamingState('receiving_cards');
                updateMessageWithAllData(fullResponseRef.current, undefined, convertedData);
                break;
              }

              case 'message_start': {
                setStreamingState('receiving_text');
                fullResponseRef.current = '';
                break;
              }

              case 'message_chunk': {
                fullResponseRef.current += parsedResponse.content;
                setStreamingState('receiving_text');

                // UBTI 메시지 청크 질문 추출 시도
                if (isUBTI) {
                  const extractedQuestion = extractQuestionFromText(parsedResponse.content);
                  if (extractedQuestion && extractedQuestion !== currentUBTIQuestionText) {
                    setCurrentUBTIQuestionText(extractedQuestion);
                  }
                }

                updateMessageWithAllData(fullResponseRef.current, undefined, undefined);
                break;
              }

              case 'message_end': {
                setStreamingState('completed');
                updateMessageWithAllData(fullResponseRef.current, undefined, undefined);

                const hasCards =
                  cardDataRef.current.plans.length > 0 ||
                  cardDataRef.current.subscriptions !== null;
                const resetDelay = hasCards ? 10000 : 1000;

                setTimeout(() => {
                  setStreamingState('idle');
                  setExpectingCards(false);
                }, resetDelay);
                break;
              }

              case 'question_start':
              case 'question_content':
              case 'question_end':
              case 'questions_complete':
              case 'ubti_complete': {
                if (isUBTI) {
                  const handled = parseAndDisplayUBTIResponse(JSON.stringify(parsedResponse));
                  if (!handled) {
                    updateLastBotMessage(currentSessionId, JSON.stringify(parsedResponse));
                  }
                }
                break;
              }

              default:
                break;
            }
          } else {
            if (chunk.trim()) {
              fullResponseRef.current += chunk;
              setStreamingState('receiving_text');

              if (isUBTI) {
                // UBTI에서는 먼저 질문 추출 시도
                const extractedQuestion = extractQuestionFromText(chunk);
                if (extractedQuestion && extractedQuestion !== currentUBTIQuestionText) {
                  console.log('[DEBUG] 일반 텍스트에서 질문 추출:', extractedQuestion);
                  setCurrentUBTIQuestionText(extractedQuestion);
                }

                // 단계 추출 시도
                const stepMatch = chunk.match(/질문\s*(\d+)|Q(\d+)|(\d+)\./);
                if (stepMatch) {
                  const step = parseInt(stepMatch[1] || stepMatch[2] || stepMatch[3]) - 1;
                  if (step >= 0 && step !== currentUBTIStep) {
                    setCurrentUBTIStep(step);
                  }
                }

                // UBTI 완료 감지
                if (
                  chunk.includes('모든 질문') ||
                  chunk.includes('완료') ||
                  chunk.includes('결과')
                ) {
                  console.log('[DEBUG] UBTI 완료 감지 (텍스트)');
                  setUbtiReadyToSubmit(true);
                }

                // JSON 파싱 시도 실패하면 일반 메시지로 처리
                const isParsed = parseAndDisplayUBTIResponse(fullResponseRef.current);
                if (!isParsed) {
                  updateLastBotMessage(currentSessionId, fullResponseRef.current);
                }
              } else {
                // 일반 텍스트도 카드 정보와 함께 업데이트
                updateMessageWithAllData(fullResponseRef.current, undefined, undefined);
              }
            }
          }
        },

        onError: (error: Error) => {
          console.error('[ERROR] Streaming error:', error);
          setStreamingState('idle');
          setExpectingCards(false);

          // 서버 연결 오류 구체적 처리 + 새로 시작하기 버튼 트리거
          let errorMessage = '요청 처리 중 오류가 발생했습니다.';

          if (
            error.message.includes('fetch') ||
            error.message.includes('network') ||
            error.message.includes('Failed to fetch')
          ) {
            errorMessage = '서버에 연결할 수 없습니다. 잠시 후 다시 시도하거나 새로 시작해주세요.';
          } else if (error.message.includes('timeout')) {
            errorMessage = '요청 시간이 초과되었습니다. 새로 시작해주세요.';
          } else if (
            error.message.includes('500') ||
            error.message.includes('Internal Server Error')
          ) {
            errorMessage = '시스템 오류가 발생했습니다. 새로 시작해주세요.';
          }

          updateLastBotMessage(currentSessionId, errorMessage);
          setCurrentPlanRecommendations([]);
          setCurrentSubscriptionRecommendations(null);

          // ref도 초기화
          cardDataRef.current = {
            plans: [],
            subscriptions: null,
            usageAnalysis: null,
          };

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
      updateMessageWithAllData,
      addMessage,
      incrementUsage,
      parseStreamingResponse,
      currentPlanRecommendations,
      currentSubscriptionRecommendations,
      convertSubscriptionArrayToObject,
    ],
  );

  // UBTI 관련 함수들
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
    currentUsageAnalysis,
    currentUBTIStep,
    ubtiInProgress,
    streamingState,
    expectingCards,
    currentUBTIQuestionText,
    ubtiReadyToSubmit,
    currentSessionId,
    createStreamingHandlers,
    startUBTI,
    resetUBTI,
    resetCards,
    resetStreamingState,
    parseAndDisplayUBTIResponse,
  };
};
