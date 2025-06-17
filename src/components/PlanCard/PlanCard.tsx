import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/Button';
import { Smartphone, Wifi, Phone, MessageSquare, Zap, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Plan {
  id: number;
  name: string;
  price: number;
  data: string;
  voice: string;
  speed?: string;
  share_data?: string;
  sms?: string;
  description: string;
}

interface PlanCardProps {
  plan: Plan;
  onSelect?: (plan: Plan) => void;
  className?: string;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan, onSelect, className }) => {
  const handleSelect = () => {
    onSelect?.(plan);
  };

  return (
    <Card
      className={cn(
        'w-full max-w-sm bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow',
        className,
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-gray-800">{plan.name}</CardTitle>
          <div className="text-right">
            <div className="text-xl font-bold text-blue-600">{plan.price?.toLocaleString()}원</div>
            <div className="text-sm text-gray-500">월</div>
          </div>
        </div>
        {plan.description && <p className="text-sm text-gray-600 mt-2">{plan.description}</p>}
      </CardHeader>

      <CardContent className="space-y-3">
        {/* 데이터 */}
        {plan.data && (
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">데이터: {plan.data}</span>
          </div>
        )}

        {/* 통화 */}
        {plan.voice && (
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-green-500" />
            <span className="text-sm">{plan.voice}</span>
          </div>
        )}

        {/* 속도 */}
        {plan.speed && (
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-sm">속도: {plan.speed}</span>
          </div>
        )}

        {/* 데이터 쉐어링 */}
        {plan.share_data && (
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-purple-500" />
            <span className="text-sm">쉐어링: {plan.share_data}</span>
          </div>
        )}

        {/* 문자 */}
        {plan.sms && (
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-gray-500" />
            <span className="text-sm">문자: {plan.sms}</span>
          </div>
        )}

        {onSelect && (
          <Button
            onClick={handleSelect}
            className="w-full mt-4 bg-blue-600 text-white hover:bg-blue-700"
          >
            <Smartphone className="w-4 h-4 mr-2" />
            선택하기
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PlanCard;
