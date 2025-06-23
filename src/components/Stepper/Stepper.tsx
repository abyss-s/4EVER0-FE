import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepperProps {
  stepOrder: string[];
  currentStep: string;
}

export const Stepper = ({ stepOrder, currentStep }: StepperProps) => {
  const currentStepIndex = stepOrder.indexOf(currentStep);

  return (
    <div className="flex items-center justify-center mt-4 space-x-2">
      {stepOrder.map((step, index) => (
        <div key={step} className="flex items-center py-2">
          {/* 원형 단계 아이콘 */}
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

          {/* 다음 단계로 연결선 */}
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
  );
};
