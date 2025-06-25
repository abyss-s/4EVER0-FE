import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';

type Step = 'main' | 'life' | 'payment';

interface SubscriptionHeaderProps {
  currentStep: Step;
  onPrev: () => void;
  onNext: () => void;
  canGoNext: boolean;
  isProcessing: boolean;
}

const stepConfig = {
  main: { title: '메인 상품 선택', description: '가입할 메인 구독 상품을 선택해주세요.' },
  life: { title: '라이프 혜택 선택', description: '라이프스타일 혜택을 선택해주세요.' },
  payment: { title: '결제하기', description: '선택한 상품을 확인하고 결제를 진행하세요.' },
};

const stepOrder: Step[] = ['main', 'life', 'payment'];

export function SubscriptionHeader({
  currentStep,
  onPrev,
  onNext,
  canGoNext,
  isProcessing,
}: SubscriptionHeaderProps) {
  const currentStepIndex = stepOrder.indexOf(currentStep);

  return (
    <div className="bg-white border-b border-gray-200 my-8 py-4 relative">
      <div className="relative flex items-center justify-center">
        {/* 이전 버튼 */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onPrev}
          disabled={currentStep === 'main'}
          className="absolute left-0 flex items-center px-0 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {/* 중앙 텍스트 */}
        <div className="text-center py-3">
          <h1 className="text-title-1 font-semibold">{stepConfig[currentStep].title}</h1>
          <p className="text-sm text-brand-darkblue">{stepConfig[currentStep].description}</p>
        </div>

        {/* 다음 버튼: 완료 버튼은 비활성화 */}
        <Button
          variant="ghost"
          size="sm"
          onClick={currentStep === 'payment' ? undefined : onNext}
          disabled={currentStep === 'payment' || !canGoNext || isProcessing}
          className="absolute right-0 flex items-center px-0 cursor-default"
        >
          {currentStep === 'payment' ? (
            isProcessing ? (
              '처리 중...'
            ) : (
              '완료'
            )
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* 진행 단계 표시 */}
      <div className="flex items-center justify-center mt-4 space-x-2">
        {stepOrder.map((step, index) => (
          <div key={step} className="flex items-center py-2">
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                currentStep === step
                  ? 'bg-pink-500 text-white'
                  : index < currentStepIndex
                    ? 'bg-pink-100 text-pink-600'
                    : 'bg-gray-100 text-gray-400',
              )}
            >
              {index < currentStepIndex ? <Check className="w-4 h-4" /> : index + 1}
            </div>
            {index < stepOrder.length - 1 && (
              <div
                className={cn(
                  'w-8 h-0.5 mx-1',
                  index < currentStepIndex ? 'bg-pink-200' : 'bg-gray-200',
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
