import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Brain, Heart, Zap, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Message } from '@/types/chat';

interface UBTIOverlayProps {
  ubtiInProgress: boolean;
  currentUBTIStep: number;
  currentUBTIQuestionText?: string | null;
  messages: Message[];
  ubtiReadyToSubmit: boolean;
  onResultClick: () => void;
}

export const UBTIOverlay: React.FC<UBTIOverlayProps> = ({
  ubtiInProgress,
  currentUBTIStep,
  currentUBTIQuestionText,
  ubtiReadyToSubmit,
  onResultClick,
}) => {
  if (!ubtiInProgress) return null;

  const progress = ((currentUBTIStep + 1) / 4) * 100;
  const stepIcons = [Heart, Brain, Zap, Star];

  const questionTextToShow =
    currentUBTIQuestionText !== null ? currentUBTIQuestionText : '질문을 준비하고 있어요...';

  return (
    <div className="absolute top-0 left-0 right-0 z-10 p-3">
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl blur-sm"></div>

        <Card className="relative w-full border-0 bg-gradient-to-r from-blue-100/90 via-indigo-100/90 to-purple-100/90 backdrop-blur-sm shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg font-bold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent">
                  타코시그널 검사 💘
                </CardTitle>
                <div className="text-sm font-bold text-blue-700">{currentUBTIStep + 1}/4</div>
              </div>

              {/* 결과 보기 버튼 */}
              {ubtiReadyToSubmit && (
                <button
                  onClick={onResultClick}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  🎉 결과 보기
                </button>
              )}
            </div>

            {/* 컴팩트한 진행 표시 */}
            <div className="space-y-2">
              <Progress value={progress} className="w-full h-2 bg-blue-200/50" />
              <div className="flex justify-between items-center">
                {stepIcons.map((Icon, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className={cn(
                        'w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300',
                        index <= currentUBTIStep
                          ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white'
                          : 'bg-gray-200 text-gray-400',
                      )}
                    >
                      <Icon className="w-3 h-3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0 pb-3">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <p className="text-indigo-700 text-sm leading-relaxed font-medium">
                {questionTextToShow}
              </p>
            </div>
            <p className="text-blue-600 text-xs mt-2 text-center">
              💬 아래 채팅창에서 답변해주세요!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
