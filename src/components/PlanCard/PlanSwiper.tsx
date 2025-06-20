import { PlanCard } from './PlanCard';
import type { PlanRecommendation } from '@/types/streaming';
import { BaseSwiper } from '@/components/BaseSwiper/BaseSwiper';

interface PlanSwiperProps {
  plans: PlanRecommendation[];
  onSelect?: (plan: PlanRecommendation) => void;
}

export const PlanSwiper: React.FC<PlanSwiperProps> = ({ plans, onSelect }) => {
  return (
    <BaseSwiper
      items={plans}
      renderItem={(plan) => (
        <PlanCard
          key={plan.id}
          plan={plan}
          onSelect={onSelect}
          className="w-full"
          hideDescription
        />
      )}
    />
  );
};
