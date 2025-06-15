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
    <div className="bg-white border-b border-gray-200 p-4 mb-4">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={onPrev}
          disabled={currentStep === 'main'}
          className="flex items-center"
        >
          <ChevronLeft className="w-4 h-4" />
          이전
        </Button>

        <div className="flex-1 text-center">
          <h1 className="text-lg font-semibold">{stepConfig[currentStep].title}</h1>
          <p className="text-sm text-gray-600">{stepConfig[currentStep].description}</p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onNext}
          disabled={!canGoNext || isProcessing}
          className="flex items-center"
        >
          {currentStep === 'payment' ? (
            isProcessing ? (
              '처리 중...'
            ) : (
              '완료'
            )
          ) : (
            <>
              다음
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>

      {/* 진행 단계 표시 */}
      <div className="flex items-center justify-center mt-4 space-x-2">
        {stepOrder.map((step, index) => (
          <div key={step} className="flex items-center">
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
