import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Brain, Heart, Zap, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Message } from '@/types/chat';

interface UBTIOverlayProps {
  ubtiInProgress: boolean;
  currentUBTIStep: number;
  messages: Message[];
}

export const UBTIOverlay: React.FC<UBTIOverlayProps> = ({
  ubtiInProgress,
  currentUBTIStep,
  messages,
}) => {
  if (!ubtiInProgress) return null;

  const progress = ((currentUBTIStep + 1) / 4) * 100;
  const stepIcons = [Heart, Brain, Zap, Star];

  // 현재 질문 텍스트 (마지막 봇 메시지에서 추출)
  const currentQuestionText = useMemo(() => {
    const lastBotMessage = messages.filter((m) => m.type === 'bot').pop();

    if (lastBotMessage && lastBotMessage.content.includes('질문')) {
      // "질문 1: 질문내용" 형태에서 질문 내용만 추출
      const match = lastBotMessage.content.match(/질문 \d+: (.+)/);
      return match ? match[1] : '질문을 준비하고 있어요...';
    }

    return '질문을 준비하고 있어요...';
  }, [messages]);

  return (
    <div className="absolute top-0 left-0 right-0 z-10 p-4">
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl blur-sm"></div>

        <Card className="relative w-full border-0 bg-gradient-to-r from-blue-100/90 via-indigo-100/90 to-purple-100/90 backdrop-blur-sm shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3 p-2">
                <div>
                  <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent">
                    타코시그널 성향 분석💘
                  </CardTitle>
                  <p className="text-blue-600 text-sm">아래 채팅창에서 질문에 답변해주세요!</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-blue-700">{currentUBTIStep + 1}/4</div>
                <div className="text-sm text-blue-600">단계</div>
              </div>
            </div>

            <div className="space-y-3">
              <Progress value={progress} className="w-full h-3 bg-blue-200/50" />
              <div className="flex justify-between">
                {stepIcons.map((Icon, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500',
                        index <= currentUBTIStep
                          ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-lg animate-pulse'
                          : 'bg-gray-200 text-gray-400',
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={cn(
                        'text-xs mt-1 font-medium',
                        index <= currentUBTIStep ? 'text-blue-600' : 'text-gray-400',
                      )}
                    >
                      {index + 1}단계
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 mb-4">
              <h3 className="font-lg text-indigo-800 mb-2">질문</h3>
              <p className="text-indigo-700 text-medium leading-relaxed">{currentQuestionText}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
