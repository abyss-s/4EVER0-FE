import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, MessageCircle, Plus, ToggleLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/Button';
import { IMAGES } from '@/constant/imagePath';

interface ChatbotIntroTutorialProps {
  isVisible: boolean;
  onClose: () => void;
}

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  highlight?: string;
  position?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: '무너와 대화하기',
    description:
      '무너는 LG유플러스의 AI 어시스턴트예요!\n요금제, 구독 서비스 등 뭐든지 물어보세요.',
    icon: <MessageCircle className="w-8 h-8 text-blue-500" />,
  },
  {
    id: 2,
    title: '플러스(+) 버튼의 비밀',
    description: '채팅창 왼쪽의 + 버튼을 누르면\n특별한 서비스 메뉴가 나타나요!',
    icon: <Plus className="w-8 h-8 text-green-500" />,
    highlight: 'plus-button',
    position: { bottom: '100px', left: '20px' },
  },
  {
    id: 3,
    title: '타코시그널 검사',
    description: '나만의 통신 유형을 알아보는\n재미있는 성격 검사예요! 🐙',
    icon: <Sparkles className="w-8 h-8 text-purple-500" />,
  },
  {
    id: 4,
    title: '톤 스위치 기능',
    description: '무너를 정중한 모드 ↔ MZ 모드로\n바꿀 수 있어요! (로그인 필요)',
    icon: <ToggleLeft className="w-8 h-8 text-orange-500" />,
    highlight: 'tone-switch',
    position: { top: '20px', right: '20px' },
  },
];

export const ChatbotIntroTutorial: React.FC<ChatbotIntroTutorialProps> = ({
  isVisible,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    localStorage.setItem('hasSeenChatbotTutorial', 'true');
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  const handleSkip = () => {
    handleClose();
  };

  if (!isVisible) return null;

  const step = tutorialSteps[currentStep];

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* 배경 오버레이 */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: isClosing ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* 하이라이트 영역  */}
          {step.highlight && step.position && (
            <motion.div
              className="fixed z-[10000] pointer-events-none"
              style={step.position}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <div className="w-12 h-12 rounded-full border-4 border-yellow-400 animate-pulse" />
              <div className="absolute inset-0 w-12 h-12 rounded-full bg-yellow-400/20 animate-ping" />
            </motion.div>
          )}

          {/* 메인 튜토리얼 카드 */}
          <motion.div
            className="fixed inset-0 z-[10001] flex items-center justify-center p-4"
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{
              opacity: isClosing ? 0 : 1,
              y: isClosing ? 100 : 0,
              scale: isClosing ? 0.8 : 1,
            }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <div className="bg-white rounded-3xl shadow-2xl border-4 border-yellow-300 p-6 w-full max-w-md relative overflow-hidden">
              {/* 배경 데코레이션 */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full -translate-y-16 translate-x-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-200/30 to-purple-200/30 rounded-full translate-y-12 -translate-x-12" />

              {/* 닫기 버튼 */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              {/* 무너 캐릭터 */}
              <div className="flex justify-center mb-6 relative z-10">
                <motion.img
                  src={IMAGES.MOONER['mooner-chat']}
                  alt="무너"
                  className="w-20 h-20 rounded-full shadow-lg"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              {/* 튜토리얼 내용 */}
              <div className="text-center relative z-10">
                {/* 아이콘 */}
                <motion.div
                  className="flex justify-center mb-4"
                  key={step.id}
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', damping: 15 }}
                >
                  {step.icon}
                </motion.div>

                {/* 제목 */}
                <motion.h2
                  className="text-xl font-bold text-gray-800 mb-3"
                  key={`title-${step.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {step.title}
                </motion.h2>

                {/* 설명 */}
                <motion.p
                  className="text-gray-600 text-sm leading-relaxed mb-6 whitespace-pre-line px-2"
                  key={`desc-${step.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {step.description}
                </motion.p>

                {/* 진행 표시 */}
                <div className="flex justify-center space-x-2 mb-6">
                  {tutorialSteps.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentStep ? 'bg-yellow-400 w-6' : 'bg-gray-300'
                      }`}
                      animate={index === currentStep ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  ))}
                </div>

                {/* 버튼들 */}
                <div className="flex gap-3 justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSkip}
                    className="flex-1 max-w-[120px]" // 최대 너비 제한
                  >
                    건너뛰기
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleNext}
                    className="flex-1 max-w-[120px] bg-yellow-400 hover:bg-yellow-500 text-gray-800" // 최대 너비 제한
                  >
                    {currentStep === tutorialSteps.length - 1 ? (
                      '시작하기'
                    ) : (
                      <>
                        다음 <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </Button>
                </div>

                {/* 단계 표시 */}
                <p className="text-xs text-gray-500 mt-3">
                  {currentStep + 1} / {tutorialSteps.length}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
