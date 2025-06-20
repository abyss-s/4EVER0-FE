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

//   const questionTextToShow = ubtiReadyToSubmit
//     ? '타코시그널 결과가 나왔어요!'
//     : currentUBTIQuestionText !== null
//       ? currentUBTIQuestionText
//       : '질문을 준비하고 있어요...';

//   return (
//     <div className="absolute top-0 left-0 right-0 z-10 p-4">
//       <div className="relative w-full max-w-4xl mx-auto">
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl blur-sm"></div>

//         <Card className="relative w-full border-0 bg-gradient-to-r from-blue-100/90 via-indigo-100/90 to-purple-100/90 backdrop-blur-sm shadow-xl">
//           <CardHeader className="pb-4">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center gap-3 p-2">
//                 <div>
//                   <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent">
//                     타코시그널 성향 분석💘
//                   </CardTitle>
//                   <p className="text-blue-600 text-sm">아래 채팅창에서 질문에 답변해주세요!</p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <div className="text-xl font-bold text-blue-700">{currentUBTIStep + 1}/4</div>
//                 <div className="text-sm text-blue-600">단계</div>
//               </div>
//             </div>

//             <div className="space-y-3">
//               <Progress value={progress} className="w-full h-3 bg-blue-200/50" />
//               <div className="flex justify-between">
//                 {stepIcons.map((Icon, index) => (
//                   <div key={index} className="flex flex-col items-center">
//                     <div
//                       className={cn(
//                         'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500',
//                         index <= currentUBTIStep
//                           ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-lg animate-pulse'
//                           : 'bg-gray-200 text-gray-400',
//                       )}
//                     >
//                       <Icon className="w-5 h-5" />
//                     </div>
//                     <span
//                       className={cn(
//                         'text-xs mt-1 font-medium',
//                         index <= currentUBTIStep ? 'text-blue-600' : 'text-gray-400',
//                       )}
//                     >
//                       {index + 1}단계
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </CardHeader>

//           <CardContent className="pt-0">
//             <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 mb-4">
//               <h3 className="font-lg text-indigo-800 mb-2">질문</h3>
//               <p className="text-indigo-700 text-medium leading-relaxed">{questionTextToShow}</p>
//             </div>

//             {/* 결과 보기 버튼 조건부 렌더링 */}
//             {ubtiReadyToSubmit && (
//               <button
//                 onClick={onResultClick}
//                 className="mt-4 px-12 py-3 w-full max-w-md rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 text-lg"
//               >
//                 🎉 결과 보기
//               </button>
//             )}
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

  const questionTextToShow = ubtiReadyToSubmit
    ? '타코시그널 결과가 나왔어요!'
    : currentUBTIQuestionText !== null
      ? currentUBTIQuestionText
      : '질문을 준비하고 있어요...';

  return (
    <div className="absolute top-0 left-0 right-0 z-10 p-4">
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="absolute inset-0 bg-yellow-50 rounded-2xl blur-sm"></div>

        <Card className="relative w-full border-0 bg-blue-100/90 backdrop-blur-sm shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3 p-2">
                <div>
                  <CardTitle className="text-xl font-bold text-[#25394B]">
                    타코시그널 성향 분석💘
                  </CardTitle>
                  <p className="text-[#25394B]/70 text-sm">아래 채팅창에서 질문에 답변해주세요!</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-[#25394B]">{currentUBTIStep + 1}/4</div>
                <div className="text-sm text-[#25394B]/70">단계</div>
              </div>
            </div>

            <div className="space-y-3">
              <Progress value={progress} className="w-full h-3 bg-gray-200/50" />
              <div className="flex justify-between">
                {stepIcons.map((Icon, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500',
                        index <= currentUBTIStep
                          ? index === 0
                            ? 'bg-red-200 text-red-700 shadow-lg animate-pulse'
                            : index === 1
                              ? 'bg-yellow-200 text-yellow-700 shadow-lg animate-pulse'
                              : index === 2
                                ? 'bg-blue-200 text-blue-700 shadow-lg animate-pulse'
                                : 'bg-purple-200 text-purple-700 shadow-lg animate-pulse'
                          : 'bg-gray-200 text-gray-400',
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={cn(
                        'text-xs mt-1 font-medium',
                        index <= currentUBTIStep ? 'text-[#25394B]' : 'text-gray-400',
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
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 mb-4">
              <h3 className="font-lg text-[#25394B] mb-2">질문</h3>
              <p className="text-[#25394B]/80 text-medium leading-relaxed">{questionTextToShow}</p>
            </div>

            {/* {ubtiInProgress && !ubtiReadyToSubmit && (
              <div className="bg-blue-500 text-white p-3 rounded-lg shadow-lg mb-4 animate-pulse">
                <div className="text-center">
                  <div className="text-sm mb-1">💬 아래 입력창을 터치해서 답변해주세요!</div>
                  <div className="text-xs opacity-80">
                    질문 {currentUBTIStep + 1}/4에 답변 중...
                  </div>
                </div>
              </div>
            )} */}

            {/* 결과 보기 버튼 - 크기 2.5배 확대 */}
            {ubtiReadyToSubmit && (
              <div className="flex justify-center">
                <button
                  onClick={onResultClick}
                  className="mt-4 px-12 py-3 w-full max-w-md rounded-lg bg-[#25394B] text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 text-lg hover:bg-[#DD4640] cursor-pointer"
                >
                  🎉 결과 보기
                </button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
