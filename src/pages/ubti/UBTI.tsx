import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IMAGES } from '@/constant/imagePath';
import type { UBTIResultResponse, UBTIResultData } from '@/types/ubti';
import { useMarkdownComponents } from '@/utils/markdownComponents';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/Button';
import { useAnimationState } from '@/hooks/useAnimationState';
import { useUBTIAnimationSequence } from '@/hooks/useUBTIAnimationSequence';
import { useMessageRotation } from '@/hooks/useMessageRotation';
import { TacoCookingAnimation } from './TacoCookingAnimation';
import { UBTITypeCard } from './UBTITypeCard';
import { MatchingTypeCard } from './MatchingTypeCard';
import { ActionButtons } from './ActionButtons';
import { LoadingOverlay, InlineLoading } from './LoadingOverlay';
import type { Plan } from '@/types/plan';
import PlanCard from '@/components/PlanCard/PlanCard';
import SubscriptionCard from '@/components/SubscriptionCard/SubscriptionCard';
import { fetchPlanDetail } from '@/apis/plan/getPlanDetail';
import { SubscriptionRecommendationsData } from '@/types/streaming';
import { changeCouponLike } from '@/apis/coupon/changeCouponlike';
import { toast } from 'sonner';

interface TacoCardType {
  front_image: string;
  back_image: string;
}

const stepMessages = [
  [
    '타코야끼 팬을 달구는 중... 🔥',
    '오늘의 운세를 점치고 있어요 ✨',
    '마법의 재료를 넣고 있어요 🪄',
  ],
  ['살살 뒤집어 주는 중! 🥢', '타코야끼가 춤을 추고 있어요 💃', '완벽한 동그라미가 될 때까지! ⭕'],
  ['황금빛으로 익어가는 중... ✨', '마법이 일어나고 있어요! 🌟', '거의 다 완성되었어요! 🎉'],
  [
    '짠! 당신만의 타코야끼 완성! 💕',
    '운명의 타코야끼가 나타났어요! 🥰',
    '사랑스러운 결과를 확인해보세요! 💖',
  ],
];

export const UBTI: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const markdownComponents = useMarkdownComponents();

  // 상태 관리
  const [result, setResult] = useState<UBTIResultData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ubtiType, setUbtiType] = useState<TacoCardType | null>(null);
  const [isDataReady, setIsDataReady] = useState(false);

  // 상세 데이터 상태
  const [detailedPlans, setDetailedPlans] = useState<Plan[]>([]);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [showResultLoading, setShowResultLoading] = useState(false);

  // 애니메이션 상태 및 훅
  const { currentStep, isFlipped, isBaked, isRevealed, showResults, updateState } =
    useAnimationState();

  const { clearAllTimers } = useUBTIAnimationSequence(updateState, isDataReady);
  const messageIndex = useMessageRotation(currentStep, stepMessages);

  const handlePlanSelect = (plan: Plan) => {
    navigate(`/plans/${plan.id}`);
  };

  const handleSubscriptionSelect = () => {
    navigate('/home');
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const loadDetailedData = async (resultData: UBTIResultData) => {
    try {
      setIsLoadingDetails(true);
      const planPromises = resultData.recommendation.plans.map((plan) =>
        fetchPlanDetail(plan.id.toString()),
      );
      const planDetails = await Promise.all(planPromises);

      setDetailedPlans(planDetails);
    } catch (error) {
      setDetailedPlans(convertToPlanCards(resultData.recommendation.plans)); // fallback
    } finally {
      setIsLoadingDetails(false);
    }
  };

  useEffect(() => {
    const state = location.state as UBTIResultResponse | undefined;

    if (state?.data) {
      setShowResultLoading(true);
      setTimeout(() => {
        setResult(state.data);

        // 동적 타코 이미지 설정 - ID별 매핑
        const typeMapping: Record<number, { front: string; back: string }> = {
          1: { front: 'taco-sub-front', back: 'taco-sub-back' }, // 말 많은 수다타코 (기본)
          2: { front: 'taco-spicy-front', back: 'taco-spicy-back' }, // 열정 넘치는 매운타코
          3: { front: 'taco-eggy-front', back: 'taco-eggy-back' }, // 집콕영상 마요타코
          4: { front: 'taco-greeny-front', back: 'taco-greeny-back' }, // 감성뮤직 초록타코
          5: { front: 'taco-milky-front', back: 'taco-milky-back' }, // 느긋한 라이트타코
          6: { front: 'taco-berry-front', back: 'taco-berry-back' }, // 달콤상큼 베리타코
          7: { front: 'taco-crunch-front', back: 'taco-crunch-back' }, // 달달꿀 허니타코
          8: { front: 'taco-wasab-front', back: 'taco-wasab-back' }, // 시원한 민트타코
        };

        const tacoImages = typeMapping[state.data.ubti_type.id] || typeMapping[1]; // 기본값 설정

        setUbtiType({
          front_image: IMAGES.TACO[tacoImages.front as keyof typeof IMAGES.TACO],
          back_image: IMAGES.TACO[tacoImages.back as keyof typeof IMAGES.TACO],
        });

        setShowResultLoading(false);
        setIsDataReady(true);

        loadDetailedData(state.data);
      }, 1500);
    } else {
      console.log('데이터 로딩 실패');
      setShowResultLoading(false);
    }

    setIsLoading(false);
  }, [location.state]);

  // 디버깅용 로그
  useEffect(() => {
    console.log('🎬 UBTI.tsx 상태 변화:', {
      isDataReady,
      currentStep,
      isFlipped,
      isBaked,
      isRevealed,
      showResults,
      messageIndex,
    });
  }, [isDataReady, currentStep, isFlipped, isBaked, isRevealed, showResults, messageIndex]);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

  const convertToPlanCards = (plans: UBTIResultData['recommendation']['plans']): Plan[] => {
    return plans.map((plan) => ({
      id: plan.id,
      name: plan.name,
      price: 0,
      data: '-',
      voice: '-',
      speed: '-',
      share_data: '-',
      sms: '-',
      description: plan.description,
    }));
  };

  const convertToSubscriptionCard = (
    subscription: UBTIResultData['recommendation']['subscription'],
    brand: UBTIResultData['recommendation']['brand'],
  ): SubscriptionRecommendationsData => {
    return {
      main_subscription: {
        id: subscription.id,
        title: subscription.name,
        description: subscription.description,
        price: 0,
        category: '기타',
        image_url: '',
      },
      life_brand: {
        id: brand.id,
        name: brand.name,
        image_url: brand.image_url,
        description: brand.description,
        category: brand.category,
      },
    };
  };

  // 결과 로딩 오버레이
  if (showResultLoading) {
    return (
      <>
        <div className="bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 min-h-screen" />
        <LoadingOverlay
          isVisible={true}
          message="타코시그널 결과를 분석하고 있어요!"
          submessage="당신만의 특별한 타코야끼가 완성되고 있어요 🎉"
          type="processing"
        />
      </>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 flex items-center justify-center min-h-full px-4">
        <motion.div
          className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm w-full"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 1, -1, 0],
          }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <motion.div
            className="text-4xl sm:text-6xl mb-4"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
          >
            🍳
          </motion.div>
          <div className="text-lg sm:text-xl text-gray-700 font-medium">
            타코야끼를 준비하고 있어요...
          </div>
          <div className="text-sm text-gray-500 mt-2">잠시만 기다려주세요 💕</div>
        </motion.div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-full bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 flex items-center justify-center px-4">
        <motion.div
          className="text-center bg-white/90 p-6 sm:p-10 rounded-3xl shadow-2xl border-4 border-pink-200 max-w-sm w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 10 }}
        >
          <motion.div
            className="text-4xl sm:text-6xl mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            😅
          </motion.div>
          <div className="text-lg sm:text-xl text-gray-700 font-medium mb-2">
            앗! 타코야끼가 어디갔지?
          </div>
          <div className="text-gray-500 pb-3">데이터를 불러올 수 없어요!</div>
          <Button variant="outline" onClick={handleBackClick}>
            홈으로 돌아가기
          </Button>
        </motion.div>
      </div>
    );
  }

  const { ubti_type, summary, recommendation, matching_type } = result;

  return (
    <div className="min-h-full bg-gradient-to-br from-pink-50 via-orange-50 via-yellow-50 to-red-50 relative">
      {/* 애니메이션 배경 요소들 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${16 + Math.random() * 16}px`,
            }}
            animate={{
              y: [-30, -60, -30],
              x: [-10, 10, -10],
              rotate: [0, 360],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          >
            {['💕', '💖', '✨', '🌟', '💫'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      {/* 타코야끼 굽기 애니메이션 */}
      <TacoCookingAnimation
        currentStep={currentStep}
        messageIndex={messageIndex}
        isFlipped={isFlipped}
        isBaked={isBaked}
        isRevealed={isRevealed}
        ubtiType={ubtiType}
      />

      {/* 결과 섹션 */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            className="bg-white/95 backdrop-blur-md relative z-10"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', duration: 1, damping: 20 }}
          >
            <div className="max-w-md mx-auto px-4 py-8 sm:py-16 space-y-6 sm:space-y-10">
              {/* 헤더 */}
              <motion.div
                className="text-center mb-6 sm:mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <motion.h1
                  className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-4"
                  animate={{
                    backgroundPosition: ['0%', '100%', '0%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🎉 타코시그널 결과 🎉
                </motion.h1>
                <motion.p
                  className="text-gray-600 text-base sm:text-lg font-semibold"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  운명의 매칭이 완성되었어요! 💘
                </motion.p>
              </motion.div>

              {/* 본인 유형 카드 */}
              <UBTITypeCard ubtiType={ubti_type} />

              {/* 유형 요약 */}
              <motion.div
                className="bg-white rounded-2xl sm:rounded-3xl px-3 sm:px-4 py-4 sm:py-6 shadow-xl border-2 border-orange-200"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, type: 'spring' }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-4 sm:mb-6">
                  <motion.span
                    className="text-lg sm:text-title-1 mr-3 sm:mr-4"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    📝
                  </motion.span>
                  <h3 className="text-lg sm:text-xl font-bold text-orange-700">
                    당신의 특별한 매력
                  </h3>
                </div>
                <ReactMarkdown components={markdownComponents}>{summary}</ReactMarkdown>
              </motion.div>

              <div className="space-y-6 sm:space-y-8">
                {/* 추천 요금제 섹션 */}
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                >
                  <div className="flex items-center mb-4 sm:mb-6">
                    <motion.span
                      className="text-lg sm:text-xl mr-3 sm:mr-4"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      📱
                    </motion.span>
                    <h3 className="text-lg sm:text-xl font-bold text-blue-700">맞춤 요금제 추천</h3>
                  </div>

                  {isLoadingDetails ? (
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-blue-200">
                      <InlineLoading message="최적의 요금제를 찾고 있어요..." size="md" />
                    </div>
                  ) : (
                    <div className="space-y-3 sm:space-y-4">
                      {detailedPlans.map((plan, index) => (
                        <motion.div
                          key={plan.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className="flex justify-center"
                        >
                          <PlanCard plan={plan} onSelect={handlePlanSelect} className="w-full" />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* 추천 구독 서비스 섹션 */}
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, type: 'spring' }}
                >
                  <div className="flex items-center mb-4 sm:mb-6">
                    <motion.span
                      className="text-lg sm:text-xl mr-3 sm:mr-4"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    >
                      🎵
                    </motion.span>
                    <h3 className="text-lg sm:text-xl font-bold text-purple-700">
                      특별 구독 서비스
                    </h3>
                  </div>

                  {isLoadingDetails ? (
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-purple-200">
                      <InlineLoading message="구독 서비스 추천을 준비중이에요..." size="md" />
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <SubscriptionCard
                        data={convertToSubscriptionCard(
                          recommendation.subscription,
                          recommendation.brand,
                        )}
                        onSubscribe={handleSubscriptionSelect}
                        onBrandSelect={(brand) => {
                          if (!brand) return;

                          changeCouponLike(brand.id)
                            .then((response) => {
                              const isLiked = response.data.data.liked;
                              if (isLiked) {
                                toast.success('쿠폰을 찜했어요! 💜', {
                                  description: '좋아요한 쿠폰함에서 확인할 수 있어요',
                                });
                              } else {
                                toast.success('쿠폰 찜을 해제했어요', {
                                  description: '언제든 다시 찜할 수 있어요',
                                });
                              }
                            })
                            .catch((error) => {
                              console.error('쿠폰 좋아요 토글 실패:', error);
                              toast.error('쿠폰 찜하기에 실패했어요', {
                                description: '잠시 후 다시 시도해주세요',
                              });
                            });
                        }}
                        className="w-full"
                      />
                    </div>
                  )}
                </motion.div>
              </div>

              {/* 잘 맞는 타입 */}
              <MatchingTypeCard matchingType={matching_type} />

              <ActionButtons result={result} />

              {/* 엔딩 메시지 */}
              <motion.div
                className="text-center pt-6 sm:pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <motion.div
                  className="text-lg sm:text-2xl font-medium"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  테스트 해주셔서 감사합니다! 💕
                </motion.div>
                <p className="text-gray-500 mt-2 text-sm sm:text-base">
                  오늘도 무너즈와 즐거운 하루 보내세요!
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UBTI;
