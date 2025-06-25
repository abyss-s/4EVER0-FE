import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone, Wifi, Phone, MessageSquare, Zap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
  variant?: "list" | "detail";
}

const PlanItem: React.FC<PlanCardProps> = ({ plan, onSelect, className, variant = "list" }) => {
  const handleSelect = () => {
    onSelect?.(plan);
  };

  type ThemeColor = "red" | "yellow" | "blue";

  const getThemeColor = (price: number): ThemeColor => {
    if (price <= 30000) return "yellow";
    if (price <= 50000) return "red";
    return "blue";
  };

  const themeColor: ThemeColor = getThemeColor(plan.price);
  const themes: Record<
    ThemeColor,
    {
      bg: string;
      gradient: string;
      text: string;
      price: string;
      badge: string;
      button: string;
    }
  > = {
    red: {
      bg: "bg-brand-red-light",
      gradient: "bg-brand-red",
      text: "text-brand-red",
      price: "text-brand-red",
      badge: "bg-brand-red-light text-brand-red",
      button: "bg-brand-red hover:bg-brand-red-hover text-white",
    },
    yellow: {
      bg: "bg-brand-yellow-light",
      gradient: "bg-brand-yellow",
      text: "text-brand-yellow",
      price: "text-brand-yellow",
      badge: "bg-brand-yellow-light text-brand-yellow",
      button: "bg-brand-yellow hover:bg-brand-yellow-hover text-white",
    },
    blue: {
      bg: "bg-brand-darkblue-light",
      gradient: "bg-brand-darkblue",
      text: "text-brand-darkblue",
      price: "text-brand-darkblue",
      badge: "bg-brand-darkblue-light text-brand-darkblue",
      button: "bg-brand-darkblue hover:bg-brand-darkblue-hover text-white",
    },
  };

  const theme = themes[themeColor];

  if (variant === "detail") {
    return (
      <Card className={cn("w-full bg-white shadow-lg border-0 rounded-2xl", className)}>
        <div className="p-6">
          {/* 헤더 */}
          <div className="text-center mx-6">
            <div
              className={cn(
                "w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center",
                theme.gradient,
              )}
            >
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h1>
            <div className="flex items-center justify-center gap-2">
              <span className={cn("text-3xl font-bold", theme.price)}>
                {plan.price.toLocaleString()}원
              </span>
              <span className="text-gray-500">/ 월</span>
            </div>
          </div>

          {/* 설명 */}
          {plan.description && (
            <div className={cn("p-4 rounded-xl mb-6", theme.bg)}>
              <p className="text-sm text-gray-700 text-center">{plan.description}</p>
            </div>
          )}

          {/* 혜택 목록 */}
          <div className="space-y-4 mb-6">
            {plan.data && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Wifi className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">데이터</div>
                  <div className="text-sm text-gray-600">{plan.data}</div>
                </div>
              </div>
            )}

            {plan.voice && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">음성통화</div>
                  <div className="text-sm text-gray-600">{plan.voice}</div>
                </div>
              </div>
            )}

            {plan.speed && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">속도</div>
                  <div className="text-sm text-gray-600">{plan.speed}</div>
                </div>
              </div>
            )}

            {plan.sms && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">문자메시지</div>
                  <div className="text-sm text-gray-600">{plan.sms}</div>
                </div>
              </div>
            )}
          </div>

          {/* 신청 버튼 */}
          {onSelect && (
            <Button
              onClick={handleSelect}
              className="w-full h-12 rounded-xl font-medium text-white"
              style={{
                backgroundColor: theme.gradient.includes("red")
                  ? "#ef4444"
                  : theme.gradient.includes("yellow")
                    ? "#eab308"
                    : "#3b82f6",
              }}
            >
              <Smartphone className="w-5 h-5 mr-2" />
              신청하기
            </Button>
          )}
        </div>
      </Card>
    );
  }

  // 목록 카드 View - 모바일 전용 컴팩트
  return (
    <Card
      className={cn(
        "group cursor-pointer bg-white border-0 shadow-sm hover:shadow-md transition-all duration-300",
        "hover:-translate-y-1 rounded-xl",
        className,
      )}
      onClick={onSelect ? handleSelect : undefined}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          {/* 왼쪽 아이콘 */}
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
              theme.gradient,
            )}
          >
            <Smartphone className="w-6 h-6 text-white" />
          </div>

          {/* 메인 정보 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm leading-tight truncate">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className={cn("text-lg font-bold", theme.price)}>
                    {plan.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500">원/월</span>
                </div>
              </div>

              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
            </div>

            {/* 주요 혜택 */}
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center gap-1">
                <Wifi className="w-3 h-3 text-blue-500 flex-shrink-0" />
                <span className="text-xs text-gray-600">{plan.data}</span>
              </div>

              {plan.voice && (
                <div className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-green-500 flex-shrink-0" />
                  <span className="text-xs text-gray-600 truncate">{plan.voice}</span>
                </div>
              )}
            </div>

            {/* 특별 혜택 또는 설명 */}
            <div className="flex items-center justify-between">
              {plan.voice === "무제한" || plan.speed ? (
                <div className="flex gap-1">
                  {plan.voice === "무제한" && (
                    <span
                      className={cn("px-2 py-0.5 text-xs font-medium rounded-full", theme.badge)}
                    >
                      무제한
                    </span>
                  )}
                  {plan.speed && (
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                      {plan.speed}
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-xs text-gray-500 truncate">
                  {plan.description || "자세한 혜택 확인"}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanItem;
