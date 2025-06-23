import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatInput } from './ChatInput';
import { ServiceCard } from './ServiceCard';
import { Button } from '@/components/Button';
import { Plus, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/stores/useAuthStore';
import { Alert } from '@/components/ui/alert';
import { createAlertHelper, AlertState } from '@/utils/alertUtils';
import { ServiceData } from './ServiceCard';

interface ChatInputAreaProps {
  ubtiInProgress: boolean;
  currentUBTIStep: number;
  buttonDisabled: boolean;
  isSessionEnded: boolean;
  inputPlaceholder: string;
  onSendMessage: (message: string) => void;
  onUBTIStart: () => void;
  onLikesRecommendation: () => void;
  onUsageRecommendation: () => void;
  onResetChat: () => void;
}

export const ChatInputArea: React.FC<ChatInputAreaProps> = ({
  ubtiInProgress,
  buttonDisabled,
  isSessionEnded,
  inputPlaceholder,
  onSendMessage,
  onUBTIStart,
  onLikesRecommendation,
  onUsageRecommendation,
  onResetChat,
}) => {
  const [showServiceDrawer, setShowServiceDrawer] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  // Alert 상태
  const [alert, setAlert] = React.useState<AlertState | null>(null);
  const showAlert = createAlertHelper(setAlert);

  // 첫 방문시 툴팁 자동 표시하기 위한 로컬스토리지 사용
  React.useEffect(() => {
    const hasSeenTooltip = localStorage.getItem('hasSeenPlusButtonTooltip');
    if (!hasSeenTooltip && !ubtiInProgress) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
        // 3초 후 자동 숨김
        setTimeout(() => {
          setShowTooltip(false);
          localStorage.setItem('hasSeenPlusButtonTooltip', 'true');
        }, 3000);
      }, 1000); // 1초 후 표시

      return () => clearTimeout(timer);
    }
  }, [ubtiInProgress]);

  const services = [
    {
      id: 'ubti',
      icon: '🐙',
      title: '타코시그널',
      subtitle: '검사하기',
      description: '나만의 성향 분석',
      action: onUBTIStart,
      color: 'from-purple-500 to-pink-500',
      requiresLogin: true,
      disabled: false,
    },
    {
      id: 'likes',
      icon: '💜',
      title: '좋아요한 브랜드로',
      subtitle: '구독 추천',
      description: '취향 기반 맞춤 추천',
      action: onLikesRecommendation,
      color: 'from-pink-500 to-rose-500',
      requiresLogin: true,
      disabled: false,
    },
    {
      id: 'usage',
      icon: '📊',
      title: '사용량 기반',
      subtitle: '요금제 추천',
      description: '데이터 패턴 분석',
      action: onUsageRecommendation,
      color: 'from-blue-500 to-cyan-500',
      requiresLogin: true,
      disabled: false,
    },
    {
      id: 'coming',
      icon: '⚡',
      title: 'Coming soon...',
      description: '새로운 기능 준비중',
      action: () => {},
      color: 'from-gray-400 to-gray-500',
      requiresLogin: false,
      disabled: true,
    },
  ] as const;

  const handleServiceClick = (service: ServiceData) => {
    if (service.disabled) {
      showAlert('준비중인 기능', '준비중인 기능입니다. 조금만 기다려주세요! 🙏');
      return;
    }

    if (service.requiresLogin && !isLoggedIn) {
      showAlert('로그인 필요', '로그인이 필요한 서비스입니다. 로그인 후 이용해주세요!');
      return;
    }

    service.action();
    setShowServiceDrawer(false);
  };

  // ESC 키 및 스크롤 방지
  React.useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showServiceDrawer) {
        setShowServiceDrawer(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [showServiceDrawer]);

  React.useEffect(() => {
    if (showServiceDrawer) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showServiceDrawer]);

  return (
    <>
      {/* Alert - 탑 네비게이션 아래 위치 */}
      {alert && (
        <div className="fixed top-20 left-4 right-4 z-50">
          <Alert
            title={alert.title}
            description={alert.description}
            variant={alert.variant}
            className="mx-auto max-w-sm"
          />
        </div>
      )}

      {/* 바텀 드로어 - 로그인 상태별 잠금 처리 */}
      <AnimatePresence>
        {showServiceDrawer && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowServiceDrawer(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 p-6 pb-8"
              style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}
            >
              {/* Handle bar */}
              <div
                className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6 cursor-pointer"
                onClick={() => setShowServiceDrawer(false)}
              />

              {/*  로그인 상태 표시 */}
              {!isLoggedIn && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-yellow-800">
                    <Lock className="w-4 h-4" />
                    <span>로그인하면 모든 기능을 이용할 수 있어요!</span>
                  </div>
                </div>
              )}
              {/* Services Grid - 2x2 그리드 */}
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                {services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    buttonDisabled={buttonDisabled}
                    onServiceClick={handleServiceClick}
                  />
                ))}
              </div>

              <div className="text-center mt-6">
                <p className="text-caption-1 text-gray-500 pb-3">
                  {isLoggedIn
                    ? '원하는 서비스를 선택해보세요 ✨'
                    : '지금 바로 로그인하러 가볼까요? 🔐'}
                </p>
                {!isLoggedIn && (
                  <Button size="lg" variant="login" onClick={() => navigate('/login')}>
                    로그인하기
                  </Button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 메인 입력 영역 */}
      <div className="bottom-0 left-0 right-0 flex flex-col space-y-3 bg-white py-3 border-t border-gray-100">
        {/* 입력창 + 플러스 버튼 */}
        <div className="flex items-center space-x-2 ">
          {!ubtiInProgress && (
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setShowServiceDrawer(true);
                  setShowTooltip(false);
                }}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="shrink-0 h-[40px] w-[40px] flex items-center justify-center rounded-lg border border-gray-300 hover:border-brand-yellow hover:bg-brand-yellow/10 transition-all"
                disabled={buttonDisabled}
              >
                <Plus className="h-4 w-4 text-gray-600" />
              </Button>

              {/* 툴팁 */}
              {showTooltip && (
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap z-30">
                  서비스 메뉴 ✨
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </div>
              )}
            </div>
          )}

          <ChatInput
            onSendMessage={onSendMessage}
            disabled={buttonDisabled}
            placeholder={inputPlaceholder}
          />
        </div>

        {/* 세션 종료시에만 새 대화 버튼 */}
        {isSessionEnded && (
          <div className="px-4">
            <Button onClick={onResetChat} className="w-full">
              새 대화 시작하기
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
