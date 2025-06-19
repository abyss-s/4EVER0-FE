import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/Button';
import { Smartphone, Wifi, Phone, MessageSquare, Zap, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Plan {
  id: number;
  name: string;
  price: number | string;
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
  variant?: 'list' | 'detail';
}

export const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  onSelect,
  className,
  variant = 'list',
}) => {
  const handleSelect = () => {
    onSelect?.(plan);
  };

  // 요금제별 색상 테마
  const getThemeColor = (price: number | string) => {
    const numPrice = Number(price);
    if (numPrice <= 50000) return 'green';
    if (numPrice <= 70000) return 'purple';
    return 'blue';
  };

  const themeColor = getThemeColor(plan.price);
  const themes = {
    green: {
      bg: 'bg-green-100',
      circle: 'bg-green-400',
      text: 'text-green-800',
      price: 'text-purple-600',
      button: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    },
    purple: {
      bg: 'bg-purple-100',
      circle: 'bg-purple-400',
      text: 'text-purple-800',
      price: 'text-purple-600',
      button: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    },
    blue: {
      bg: 'bg-blue-100',
      circle: 'bg-blue-400',
      text: 'text-blue-800',
      price: 'text-purple-600',
      button: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    },
  };

  const theme = themes[themeColor];
  // 상세 페이지
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
              <div className="text-xl font-bold text-blue-600 flex items-baseline gap-1">
                {Number(plan.price).toLocaleString()}
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

            {plan.share_data && (
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-purple-500" />
                <span className="text-sm">쉐어링: {plan.share_data}</span>
              </div>
            )}

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
          </div>
        </div>
      </Card>
    );
  }

  // 전체 목록
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
          {/* 왼쪽 아이콘 영역 */}
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

          {/* 중앙 정보 영역 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">
                  {plan.description || `네이버페이 ${plan.data} 혜택`}
                </h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-xl font-bold text-purple-600">
                    월 {Number(plan.price).toLocaleString()}원
                  </span>
                  {plan.share_data && (
                    <span className="text-sm text-blue-500 font-medium">
                      유심 혜택 +{plan.share_data}
                    </span>
                  )}
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

            {/* 추가 혜택 표시 */}
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

            {/* 자세히 보기 버튼 */}
            <Button
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium border transition-colors',
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
