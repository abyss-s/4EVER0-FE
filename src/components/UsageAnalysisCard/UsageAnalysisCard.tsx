import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Smartphone,
  Phone,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Wifi,
  DollarSign,
} from 'lucide-react';
import type { UsageAnalysisData } from '@/types/streaming';
import { formatPrice } from '@/utils/priceUtils';
import { cn } from '@/lib/utils';

interface UsageAnalysisCardProps {
  data: UsageAnalysisData;
  className?: string;
}

// 사용률에 따른 상태 및 색상 결정
const getUsageStatus = (percentage: number) => {
  if (percentage >= 90) {
    return {
      level: 'critical',
      color: 'text-negative',
      bgColor: 'bg-negative-bg',
      borderColor: 'border-negative',
      icon: AlertTriangle,
      progressColor: 'bg-negative',
    };
  }
  if (percentage >= 70) {
    return {
      level: 'warning',
      color: 'text-cautionary',
      bgColor: 'bg-cautionary-bg',
      borderColor: 'border-cautionary',
      icon: TrendingUp,
      progressColor: 'bg-cautionary',
    };
  }
  if (percentage >= 30) {
    return {
      level: 'good',
      color: 'text-positive',
      bgColor: 'bg-positive-bg',
      borderColor: 'border-positive',
      icon: CheckCircle,
      progressColor: 'bg-positive',
    };
  }
  return {
    level: 'excellent',
    color: 'text-brand-darkblue',
    bgColor: 'bg-brand-darkblue-light',
    borderColor: 'border-brand-darkblue',
    icon: TrendingDown,
    progressColor: 'bg-brand-darkblue',
  };
};

// 데이터 용량 포맷팅 (MB → GB)
const formatDataUsage = (mb: number) => {
  if (mb >= 1000) {
    return `${(mb / 1000).toFixed(1)}GB`;
  }
  return `${mb}MB`;
};

// 사용률에 따른 권장사항
const getRecommendation = (percentage: number) => {
  if (percentage >= 90) return '요금제 업그레이드를 고려해보세요';
  if (percentage >= 70) return '사용량을 확인하며 이용하세요';
  if (percentage >= 30) return '현재 요금제가 적합합니다';
  return '더 저렴한 요금제도 검토해보세요';
};

// 원형 진행률 컴포넌트
const CircularProgress: React.FC<{ percentage: number; size?: number; strokeWidth?: number }> = ({
  percentage,
  size = 80,
  strokeWidth = 6,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const status = getUsageStatus(percentage);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* 배경 원 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-200"
        />
        {/* 진행률 원 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn(
            'transition-all duration-1000 ease-out',
            status.level === 'critical'
              ? 'text-negative'
              : status.level === 'warning'
                ? 'text-cautionary'
                : status.level === 'good'
                  ? 'text-positive'
                  : 'text-brand-darkblue',
          )}
        />
      </svg>

      {/* 중앙 텍스트 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className={cn('text-lg font-bold', status.color)}>{percentage.toFixed(1)}%</p>
          <p className="text-xs text-gray-600">사용중</p>
        </div>
      </div>
    </div>
  );
};

export const UsageAnalysisCard: React.FC<UsageAnalysisCardProps> = ({ data, className }) => {
  const status = getUsageStatus(data.usage_percentage);
  const StatusIcon = status.icon;

  return (
    <Card
      className={cn(
        'w-full max-w-sm bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 shadow-lg gap-2',
        className,
      )}
    >
      <CardHeader className="pt-2">
        <CardTitle className="text-base font-bold text-brand-darkblue flex items-center gap-2">
          <Smartphone className="w-4 h-4" />
          사용량 분석
        </CardTitle>
      </CardHeader>

      <CardContent className="px-3 space-y-3">
        {/* 현재 요금제 정보 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-white/20">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-600">현재 요금제</p>
              <p className="text-base font-bold text-brand-darkblue">{data.current_plan}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-gray-600">
                <DollarSign className="w-3 h-3" />
                <span className="text-xs">월 요금</span>
              </div>
              <p className="text-caption-1 font-bold text-brand-red">
                {formatPrice(data.current_price)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-white/20">
          <div className="flex items-center gap-2">
            {/* 원형 차트 */}
            <div className="flex-shrink-0">
              <CircularProgress percentage={data.usage_percentage} />
            </div>

            {/* 상세 사용량 */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Wifi className="w-3 h-3" />
                  남은 사용량
                </p>
              </div>

              <div className="space-y-1">
                {/* 데이터 */}
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                  <div className="flex items-center gap-2">
                    <Wifi className="w-3 h-3 text-blue-600" />
                    <span className="text-xs font-medium text-blue-800">데이터</span>
                  </div>
                  <span className="text-xs font-bold text-blue-800">
                    {formatDataUsage(data.remaining_data)}
                  </span>
                </div>

                {/* 음성 */}
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-medium text-green-800">음성</span>
                  </div>
                  <span className="text-xs font-bold text-green-800">
                    {data.remaining_voice >= 999999 ? '무제한' : `${data.remaining_voice}분`}
                  </span>
                </div>

                {/* 문자 */}
                <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-3 h-3 text-purple-600" />
                    <span className="text-xs font-medium text-purple-800">SMS</span>
                  </div>
                  <span className="text-xs font-bold text-purple-800">
                    {data.remaining_sms >= 999999 ? '무제한' : `${data.remaining_sms}건`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 권장사항 */}
        <div className={cn('rounded-lg p-2 border', status.bgColor, status.borderColor)}>
          <div className="flex items-start gap-2">
            <StatusIcon className={cn('w-3 h-3 mt-0.5 flex-shrink-0', status.color)} />
            <p className={cn('text-xs font-medium', status.color)}>
              {getRecommendation(data.usage_percentage)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
