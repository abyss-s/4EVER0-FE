import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/Button';
import { Smartphone, Wifi, Phone, MessageSquare, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Plan {
  id: number;
  name: string;
  price: number;
  data: string;
  voice: string;
  speed?: string;
  sms?: string;
  description: string;
}

interface PlanCardProps {
  plan: Plan;
  onSelect?: (plan: Plan) => void;
  className?: string;
  variant?: 'list' | 'detail';
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, onSelect, className, variant = 'list' }) => {
  const handleSelect = () => {
    onSelect?.(plan);
  };

  type ThemeColor = 'red' | 'yellow' | 'blue';

  const getThemeColor = (price: number): ThemeColor => {
    if (price <= 30000) return 'yellow';
    if (price <= 50000) return 'red';
    return 'blue';
  };

  const themeColor: ThemeColor = getThemeColor(plan.price);
  const themes: Record<
    ThemeColor,
    {
      bg: string;
      circle: string;
      text: string;
      price: string;
      button: string;
    }
  > = {
    red: {
      bg: 'bg-[#DD4640]/10',
      circle: 'bg-[#DD4640]',
      text: 'text-[#DD4640]',
      price: 'text-purple-600',
      button: 'bg-[#DD4640] text-white hover:bg-[#c93e39]',
    },
    yellow: {
      bg: 'bg-[#F4DE75]/20',
      circle: 'bg-[#F4DE75]',
      text: 'text-[#7a7200]',
      price: 'text-purple-600',
      button: 'bg-[#F4DE75] text-white hover:bg-yellow-400',
    },
    blue: {
      bg: 'bg-[#25394B]/20',
      circle: 'bg-[#25394B]',
      text: 'text-[#25394B]',
      price: 'text-purple-600',
      button: 'bg-[#25394B] text-white hover:bg-[#1b2b3a]',
    },
  };

  const theme = themes[themeColor];

  // ==========================
  // 상세 페이지 View
  // ==========================
  if (variant === 'detail') {
    return (
      <Card
        className={cn(
          'w-full max-w-sm bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow',
          className,
        )}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">{plan.name}</h3>
            <div className="text-right">
              <div className="text-xl font-bold text-[#DD4640] flex items-baseline gap-1">
                {plan.price.toLocaleString()}
                <span className="text-base">원</span>
                <span className="text-sm text-gray-500">/ 월</span>
              </div>
            </div>
          </div>
          {plan.description && <p className="text-sm text-gray-600 mb-4">{plan.description}</p>}

          <div className="space-y-3">
            {plan.data && (
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">데이터: {plan.data}</span>
              </div>
            )}
            {plan.voice && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-500" />
                <span className="text-sm">{plan.voice}</span>
              </div>
            )}
            {plan.speed && (
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">속도: {plan.speed}</span>
              </div>
            )}
            {plan.sms && (
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-gray-500" />
                <span className="text-sm">문자: {plan.sms}</span>
              </div>
            )}
            {onSelect && (
              <Button onClick={handleSelect} className={cn('w-full mt-4', theme.button)}>
                <Smartphone className="w-4 h-4 mr-2" />
                신청하기
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  }

  // ==========================
  // 목록 카드 View
  // ==========================
  return (
    <Card
      className={cn(
        'w-full bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer border-0',
        'hover:scale-[1.02] transform',
        className,
      )}
      onClick={onSelect ? handleSelect : undefined}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          {/* 왼쪽 아이콘 */}
          <div
            className={cn(
              'flex-shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-center',
              theme.bg,
            )}
          >
            <div className={cn('text-xs font-medium mb-1', theme.text)}>
              {plan.name.includes('넷') ? plan.name.split(' ')[0] : '요금제'}
            </div>
            <div className={cn('text-lg font-bold', theme.text)}>{plan.data}</div>
          </div>

          {/* 중앙 정보 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">
                  {plan.description || `네이버페이 ${plan.data} 혜택`}
                </h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className={cn('text-xl font-bold', theme.price)}>
                    월 {plan.price.toLocaleString()}원
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>{plan.data}</span>
                  {plan.speed && (
                    <>
                      <span>•</span>
                      <span>{plan.speed}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* 혜택 태그 */}
            {(plan.voice === '무제한' || plan.sms) && (
              <div className="flex items-center gap-2 mb-3">
                {plan.voice === '무제한' && (
                  <div className="flex items-center gap-1">
                    <div className="w-5 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
                      음
                    </div>
                    <div className="w-5 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">
                      영
                    </div>
                  </div>
                )}
                <span className="text-xs text-gray-500">
                  {plan.voice === '무제한' ? '택1, 월정액 무료' : ''}
                </span>
              </div>
            )}

            {/* 자세히 보기 */}
            <Button
              className={cn(
                'px-6 py-2 rounded-full text-sm font-medium transition-all duration-300',
                'bg-white/20 border border-white/30 text-gray-700 backdrop-blur-sm',
                'hover:bg-white/30 hover:scale-[1.02] hover:shadow-lg',
                'active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-white/50',
                'drop-shadow-sm -mt-2 cursor-pointer',
                theme.button,
              )}
              onClick={(e) => {
                e.stopPropagation();
                handleSelect();
              }}
            >
              자세히 보기
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanCard;
