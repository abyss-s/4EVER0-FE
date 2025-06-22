// import React from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Progress } from '@/components/ui/progress';
// import { Brain, Heart, Zap, Star } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import { Message } from '@/types/chat';

// interface UBTIOverlayProps {
//   ubtiInProgress: boolean;
//   currentUBTIStep: number;
//   currentUBTIQuestionText?: string | null;
//   messages: Message[];
//   ubtiReadyToSubmit: boolean;
//   onResultClick: () => void;
// }

// export const UBTIOverlay: React.FC<UBTIOverlayProps> = ({
//   ubtiInProgress,
//   currentUBTIStep,
//   currentUBTIQuestionText,
//   ubtiReadyToSubmit,
//   onResultClick,
// }) => {
//   if (!ubtiInProgress) return null;

//   const progress = ((currentUBTIStep + 1) / 4) * 100;
//   const stepIcons = [Heart, Brain, Zap, Star];

//   const questionTextToShow =
//     currentUBTIQuestionText !== null ? currentUBTIQuestionText : '질문을 준비하고 있어요...';

//   return (
//     <div className="absolute top-0 left-0 right-0 z-10 p-3">
//       <div className="relative w-full max-w-2xl mx-auto">
//         {/* 그라데이션 배경 블러 효과 */}
//         <div className="absolute inset-0 bg-gradient-to-r from-brand-red-light via-brand-yellow-light to-brand-darkblue-light rounded-2xl blur-sm opacity-80"></div>

//         <Card className="relative w-full border-0 bg-gradient-to-r from-brand-red-light/95 via-brand-yellow-light/95 to-brand-darkblue-light/95 backdrop-blur-md shadow-xl rounded-2xl">
//           <CardHeader className="pb-3">
//             <div className="flex items-center justify-between mb-3">
//               <div className="flex items-center gap-3">
//                 <CardTitle className="text-xl font-bold text-brand-darkblue">
//                   타코시그널 검사 💘
//                 </CardTitle>
//                 <div className="text-sm font-semibold text-brand-darkblue bg-white/40 px-2 py-1 rounded-full">
//                   {currentUBTIStep + 1}/4
//                 </div>
//               </div>

//               {/* 결과 보기 버튼 */}
//               {ubtiReadyToSubmit && (
//                 <button
//                   onClick={onResultClick}
//                   className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-yellow to-brand-red text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:from-brand-yellow-hover hover:to-brand-red-hover"
//                 >
//                   🎉 결과 보기
//                 </button>
//               )}
//             </div>

//             {/* 진행 표시 */}
//             <div className="space-y-3">
//               <div className="w-full bg-white/30 rounded-full h-2.5 overflow-hidden">
//                 <div
//                   className="h-full bg-gradient-to-r from-brand-red to-brand-yellow transition-all duration-500 ease-out rounded-full"
//                   style={{ width: `${progress}%` }}
//                 />
//               </div>

//               <div className="flex justify-between items-center">
//                 {stepIcons.map((Icon, index) => (
//                   <div key={index} className="flex items-center">
//                     <div
//                       className={cn(
//                         'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border-2',
//                         index <= currentUBTIStep
//                           ? 'bg-white text-brand-darkblue border-brand-darkblue shadow-md'
//                           : 'bg-white/30 text-brand-darkblue/50 border-white/50',
//                       )}
//                     >
//                       <Icon className="w-4 h-4" />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </CardHeader>

//           <CardContent className="pt-0 pb-4">
//             <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/40 shadow-sm">
//               <p className="text-brand-darkblue text-base leading-relaxed font-medium">
//                 {questionTextToShow}
//               </p>
//             </div>
//             <p className="text-brand-darkblue/80 text-sm mt-3 text-center font-medium">
//               💬 아래 채팅창에서 답변해주세요!
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };
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
        {/* 그라데이션 배경 블러 효과 */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-red-light via-brand-yellow-light to-brand-darkblue-light rounded-2xl blur-sm opacity-80"></div>

        <Card className="relative w-full border-0 bg-gradient-to-r from-brand-red-light/95 via-brand-yellow-light/95 to-brand-darkblue-light/95 backdrop-blur-md shadow-xl rounded-2xl">
          <CardHeader className="pb-2">
            {/* 타이틀과 단계 표시 */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg font-bold text-brand-darkblue">
                  타코시그널 검사 💘
                </CardTitle>
                <div className="text-xs font-semibold text-brand-darkblue bg-white/40 px-2 py-0.5 rounded-full">
                  {currentUBTIStep + 1}/4
                </div>
              </div>
            </div>

            {/* 결과 보기 버튼 - 별도 행으로 분리 */}
            {ubtiReadyToSubmit && (
              <div className="mb-2">
                <button
                  onClick={onResultClick}
                  className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-brand-yellow to-brand-red text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:from-brand-yellow-hover hover:to-brand-red-hover text-sm"
                >
                  🎉 결과 보기
                </button>
              </div>
            )}

            {/* 진행 표시 */}
            <div className="space-y-2">
              <div className="w-full bg-white/30 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-red to-brand-yellow transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex justify-between items-center px-1">
                {stepIcons.map((Icon, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className={cn(
                        'w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 border',
                        index <= currentUBTIStep
                          ? 'bg-white text-brand-darkblue border-brand-darkblue shadow-sm'
                          : 'bg-white/30 text-brand-darkblue/50 border-white/50',
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
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-white/40 shadow-sm">
              <p className="text-brand-darkblue text-sm leading-relaxed font-medium">
                {questionTextToShow}
              </p>
            </div>
            <p className="text-brand-darkblue/80 text-xs mt-2 text-center font-medium">
              💬 아래 채팅창에서 답변해주세요!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
