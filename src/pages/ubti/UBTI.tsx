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
import type { Plan } from '@/types/plan';
import type { Brand } from '@/types/brand';
import PlanCard from '@/components/PlanCard/PlanCard';
import SubscriptionCard from '@/components/SubscriptionCard/SubscriptionCard';
import { fetchPlanDetail } from '@/apis/plan/getPlanDetail';
import { getBrands } from '@/apis/subscription/getLifeSubscriptions';

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

export const UBTIResultPage: React.FC = () => {
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
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);

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
      // 요금제 상세 정보 병렬 로딩
      const planPromises = resultData.recommendation.plans.map((plan) =>
        fetchPlanDetail(plan.id.toString()),
      );
      // 브랜드 전체 조회
      const [planDetails, brandsResponse] = await Promise.all([
        Promise.all(planPromises),
        getBrands(),
      ]);
      setDetailedPlans(planDetails);
      setBrands(brandsResponse.data);
    } catch (error) {
      setDetailedPlans(convertToPlanCards(resultData.recommendation.plans));
    } finally {
      setIsLoadingDetails(false);
    }
  };

  // 초기 데이터 로딩
  useEffect(() => {
    const state = location.state as UBTIResultResponse | undefined;

    if (state?.data) {
      setResult(state.data);
      setUbtiType({
        front_image: IMAGES.TACO['taco-spicy-front'],
        back_image: IMAGES.TACO['taco-spicy-back'],
      });
      setIsDataReady(true);
      loadDetailedData(state.data);
    } else {
      console.log('데이터 로딩 실패');
    }

    setIsLoading(false);
  }, [location.state]);

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
  ) => {
    // 브랜드 목록에서 해당 ID 찾기
    const matchedBrand = brands.find((brand) => brand.id === subscription.id);

    return {
      main_subscription: {
        id: subscription.id,
        title: matchedBrand?.title || subscription.name,
        category: matchedBrand?.category || '추천 구독',
        price: 0,
        image_url: matchedBrand?.image_url || IMAGES.MOONER['mooner-login'],
      },
      life_brand: undefined,
    };
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 flex items-center justify-center min-h-screen">
        <motion.div
          className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 1, -1, 0],
          }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
          >
            🍳
          </motion.div>
          <div className="text-xl text-gray-700 font-medium">타코야끼를 준비하고 있어요...</div>
          <div className="text-sm text-gray-500 mt-2">잠시만 기다려주세요 💕</div>
        </motion.div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-full bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 flex items-center justify-center">
        <motion.div
          className="text-center bg-white/90 p-10 rounded-3xl shadow-2xl border-4 border-pink-200"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 10 }}
        >
          <motion.div
            className="text-6xl mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            😅
          </motion.div>
          <div className="text-xl text-gray-700 font-medium mb-2">앗! 타코야끼가 어디갔지?</div>
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
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${20 + Math.random() * 20}px`,
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
        stepMessages={stepMessages}
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
            <div className="max-w-full mx-auto py-16 space-y-10">
              {/* 헤더 */}
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <motion.h1
                  className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-4"
                  animate={{
                    backgroundPosition: ['0%', '100%', '0%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🎉 타코시그널 결과 🎉
                </motion.h1>
                <motion.p
                  className="text-gray-600 text-lg font-semibold"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  운명의 매칭이 완성되었어요! 💘
                </motion.p>
              </motion.div>

              {/* 본인 유형 */}
              <UBTITypeCard ubtiType={ubti_type} />

              {/* 유형 요약 */}
              <motion.div
                className="bg-white rounded-3xl px-4 py-6 shadow-xl border-2 border-orange-200"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, type: 'spring' }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-6">
                  <motion.span
                    className="text-title-1 mr-4"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    📝
                  </motion.span>
                  <h3 className="text-xl font-bold text-orange-700">당신의 특별한 매력</h3>
                </div>
                <ReactMarkdown components={markdownComponents}>{summary}</ReactMarkdown>
              </motion.div>

              <div className="space-y-8 px-4">
                {/* 추천 요금제 섹션 */}
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                >
                  <div className="flex items-center mb-6">
                    <motion.span
                      className="text-xl mr-4"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      📱
                    </motion.span>
                    <h3 className="text-xl font-bold text-blue-700">맞춤 요금제 추천</h3>
                  </div>

                  {isLoadingDetails ? (
                    <div className="text-center py-8">
                      <motion.div
                        className="text-4xl mb-4"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        📱
                      </motion.div>
                      <p className="text-gray-600">최적의 요금제를 찾고 있어요...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 justify-items-center">
                      {detailedPlans.map((plan, index) => (
                        <motion.div
                          key={plan.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                        >
                          <PlanCard
                            plan={plan}
                            onSelect={handlePlanSelect}
                            className="w-full max-w-sm"
                          />
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
                  <div className="flex items-center mb-6">
                    <motion.span
                      className="text-xl mr-4"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    >
                      🎵
                    </motion.span>
                    <h3 className="text-xl font-bold text-purple-700">특별 구독 서비스</h3>
                  </div>

                  {isLoadingDetails ? (
                    <div className="text-center py-8">
                      <motion.div
                        className="text-4xl mb-4"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        🎵
                      </motion.div>
                      <p className="text-gray-600">구독 서비스 추천을 준비중이에요...</p>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <SubscriptionCard
                        data={convertToSubscriptionCard(recommendation.subscription)}
                        onSubscribe={handleSubscriptionSelect}
                        className="w-full max-w-sm"
                      />
                    </div>
                  )}
                </motion.div>
              </div>

              {/* 잘 맞는 타입 */}
              <MatchingTypeCard matchingType={matching_type} />

              {/* 액션 버튼들 */}
              <ActionButtons result={result} />

              {/* 엔딩 메시지 */}
              <motion.div
                className="text-center pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <motion.div
                  className="text-2xl font-medium"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  테스트 해주셔서 감사합니다! 💕
                </motion.div>
                <p className="text-gray-500 mt-2">오늘도 무너즈와 즐거운 하루 보내세요!</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UBTIResultPage;
