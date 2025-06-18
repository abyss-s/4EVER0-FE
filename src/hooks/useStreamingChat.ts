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
} from '@/types/streaming';
import type { UBTIStreamingMessage } from '@/types/streaming';

// 스트리밍 상태 타입
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

  // 카드 데이터를 스트리밍 세션 동안 유지하는 ref 추가
  const cardDataRef = useRef<{
    plans: PlanRecommendation[];
    subscriptions: SubscriptionRecommendationsData | null;
  }>({
    plans: [],
    subscriptions: null,
  });

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

      // console.log('[DEBUG] Converted subscription data:', result);
      // console.log('[DEBUG] Has main_subscription:', !!result.main_subscription);
      // console.log('[DEBUG] Has life_brand:', !!result.life_brand);

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

  // UBTI 응답 파싱
  const parseAndDisplayUBTIResponse = useCallback(
    (chunk: string) => {
      try {
        const parsed: UBTIStreamingMessage = JSON.parse(chunk);

        if (parsed.type === 'question_content') {
          setCurrentUBTIStep(parsed.step);

          const simpleMessage = `💭 질문 ${parsed.step + 1}: ${parsed.question}`;
          if (currentSessionId) {
            updateLastBotMessage(currentSessionId, simpleMessage);
          }

          // TODO: 결과 보기 누르면 이동하도록 수정
          return true;
        }

        if (parsed.type === 'ubti_complete') {
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
          return true;
        }
      } catch (error) {
        console.warn('[WARN] UBTI 파싱 실패, 일반 텍스트로 처리:', error);
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
    ) => {
      if (!currentSessionId) return;

      // 새로운 카드 데이터가 있으면 ref 업데이트
      if (plans) {
        cardDataRef.current.plans = plans;
      }
      if (subscriptions) {
        cardDataRef.current.subscriptions = subscriptions;
      }

      // 항상 ref의 최신 데이터 사용
      const currentPlans =
        cardDataRef.current.plans.length > 0 ? cardDataRef.current.plans : undefined;
      const currentSubscriptions = cardDataRef.current.subscriptions;

      updateLastBotMessageWithCards(
        currentSessionId,
        content,
        currentPlans,
        currentSubscriptions || undefined,
      );

      // 저장 후 확인 - 더 상세하게
      setTimeout(() => {
        const session = useChatStore.getState().sessions[currentSessionId];
        if (session && session.messages.length > 0) {
          const lastMessage = session.messages[session.messages.length - 1];
          console.log('[DEBUG] 저장된 메시지 확인:', {
            id: lastMessage.id,
            content: lastMessage.content?.slice(0, 50) + '...',
            hasPlans: !!lastMessage.planRecommendations,
            planCount: lastMessage.planRecommendations?.length || 0,
            hasSubscriptions: !!lastMessage.subscriptionRecommendations,
            subscriptionKeys: lastMessage.subscriptionRecommendations
              ? Object.keys(lastMessage.subscriptionRecommendations)
              : [],
            mainSub: !!lastMessage.subscriptionRecommendations?.main_subscription,
            lifeBrand: !!lastMessage.subscriptionRecommendations?.life_brand,
            timestamp: lastMessage.timestamp,
          });

          // 카드 데이터 손실 확인
          const shouldHavePlans = cardDataRef.current.plans.length > 0;
          const shouldHaveSubscriptions = !!cardDataRef.current.subscriptions;

          if (
            (shouldHavePlans && !lastMessage.planRecommendations) ||
            (shouldHaveSubscriptions && !lastMessage.subscriptionRecommendations)
          ) {
            console.error('[ERROR] 카드 데이터 손실 감지!', {
              expectedPlans: shouldHavePlans,
              savedPlans: !!lastMessage.planRecommendations,
              expectedSubscriptions: shouldHaveSubscriptions,
              savedSubscriptions: !!lastMessage.subscriptionRecommendations,
              refData: cardDataRef.current,
            });
          }
        }
      }, 100);
    },
    [currentSessionId, updateLastBotMessageWithCards],
  );

  // 공통 스트리밍 처리 로직
  const createStreamingHandlers = useCallback(
    (userMessage: string, isUBTI: boolean = false) => {
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
      };

      // 상태 초기화
      setCurrentPlanRecommendations([]);
      setCurrentSubscriptionRecommendations(null);
      setStreamingState('waiting');
      setExpectingCards(userMessage.includes('추천') || userMessage.includes('요금제'));

      return {
        onChunk: (chunk: string) => {
          const parsedResponse = parseStreamingResponse(chunk);

          if (parsedResponse) {
            switch (parsedResponse.type) {
              case 'plan_recommendations': {
                console.log('[DEBUG] 요금제 추천 받음:', parsedResponse.plans);
                setCurrentPlanRecommendations(parsedResponse.plans);
                setStreamingState('receiving_cards');
                // 즉시 저장
                updateMessageWithAllData(fullResponseRef.current, parsedResponse.plans, undefined);
                break;
              }

              case 'subscription_recommendations': {
                console.log('[DEBUG] 구독 추천 받음 (배열):', parsedResponse.subscriptions);

                const convertedData = convertSubscriptionArrayToObject(
                  parsedResponse.subscriptions,
                );
                console.log('[DEBUG] 변환된 구독 데이터:', convertedData);

                setCurrentSubscriptionRecommendations(convertedData);
                setStreamingState('receiving_cards');

                // 즉시 저장
                updateMessageWithAllData(fullResponseRef.current, undefined, convertedData);

                break;
              }

              case 'message_start': {
                console.log('[DEBUG] 메시지 시작');
                setStreamingState('receiving_text');
                fullResponseRef.current = '';
                break;
              }

              case 'message_chunk': {
                fullResponseRef.current += parsedResponse.content;
                setStreamingState('receiving_text');

                // 텍스트 업데이트 시에는 기존 카드 정보 유지 (ref 사용)
                updateMessageWithAllData(
                  fullResponseRef.current,
                  undefined, // 새로운 카드 데이터 없음
                  undefined, // 새로운 카드 데이터 없음
                );
                break;
              }

              case 'message_end': {
                console.log('[DEBUG] 메시지 완료');
                setStreamingState('completed');

                // 최종 저장 (ref의 모든 데이터 포함)
                updateMessageWithAllData(fullResponseRef.current, undefined, undefined);

                const hasCards =
                  cardDataRef.current.plans.length > 0 ||
                  cardDataRef.current.subscriptions !== null;

                const resetDelay = hasCards ? 10000 : 1000; // 리셋 시간: 카드 있으면 10초, 없으면 1초

                console.log('[DEBUG] 카드 리셋 지연 시간:', resetDelay, 'ms', {
                  plans: cardDataRef.current.plans.length,
                  subscriptions: !!cardDataRef.current.subscriptions,
                });

                setTimeout(() => {
                  setStreamingState('idle');
                  setExpectingCards(false);
                  // ref는 리셋하지 않음 (메시지에 저장되어 있음)
                }, resetDelay);
                break;
              }

              default:
                console.warn('[WARN] Unknown response type:', parsedResponse.type);
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
          updateLastBotMessage(currentSessionId, '요청 처리 중 오류가 발생했습니다.');
          setCurrentPlanRecommendations([]);
          setCurrentSubscriptionRecommendations(null);
          // ref도 초기화
          cardDataRef.current = {
            plans: [],
            subscriptions: null,
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
