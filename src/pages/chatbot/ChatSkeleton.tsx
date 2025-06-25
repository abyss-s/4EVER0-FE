import React from 'react';
import { AvatarComponent } from '@/components/Avatar';
import { cn } from '@/lib/utils';
import { IMAGES } from '@/constant/imagePath';

interface ChatSkeletonProps {
  showCards?: boolean;
  className?: string;
}

export const ChatSkeleton: React.FC<ChatSkeletonProps> = ({ showCards = false, className }) => {
  return (
    <div className={cn('flex w-full mb-4 justify-start', className)}>
      {/* 무너 아바타 */}
      <div className="w-8 h-8 mr-2 mt-1 flex-shrink-0">
        <AvatarComponent src={IMAGES.MOONER['mooner-chat']} />
      </div>

      <div className="max-w-[80%] flex flex-col gap-3">
        {/* 카드 스켈레톤 */}
        {showCards && (
          <div className="flex flex-wrap gap-3">
            <div className="w-64 h-32 bg-gray-200 rounded-lg animate-pulse" />
            <div className="w-64 h-32 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        )}

        {/* 텍스트 스켈레톤 */}
        <div className="bg-brand-yellow-light px-4 py-2 rounded-lg rounded-tl-none shadow-sm">
          <div className="space-y-2">
            {/* 텍스트 라인들 */}
            <div className="flex items-center gap-2">
              <div className="h-3 bg-gray-300 rounded animate-pulse w-4"></div>
              <div className="h-3 bg-gray-300 rounded animate-pulse flex-1"></div>
            </div>
            <div className="h-3 bg-gray-300 rounded animate-pulse w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded animate-pulse w-1/2"></div>

            {/* 타이핑 인디케이터 */}
            <div className="flex items-center gap-1 mt-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: '0.1s' }}
              ></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: '0.2s' }}
              ></div>
              <span className="text-xs text-gray-500 ml-2">무너가 답변을 준비하고 있어요...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 타이핑 인디케이터
export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex w-full mb-4 justify-start">
      <div className="bg-brand-yellow-light px-4 py-3 rounded-lg rounded-tl-none shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
              style={{ animationDelay: '0.1s' }}
            ></div>
            <div
              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
              style={{ animationDelay: '0.2s' }}
            ></div>
          </div>
          <span className="text-sm text-gray-600">무너가 생각 중...</span>
        </div>
      </div>
    </div>
  );
};

// 카드 전용 스켈레톤 (아바타 없음 - 컨테이너에서 처리)
export const CardSkeleton: React.FC<{ type: 'plan' | 'subscription' }> = ({ type }) => {
  if (type === 'plan') {
    return (
      <div className="w-64 bg-white border border-gray-200 rounded-lg p-4 shadow-sm animate-pulse">
        <div className="flex justify-between items-start mb-3">
          <div className="h-5 bg-gray-300 rounded w-20"></div>
          <div className="text-right">
            <div className="h-6 bg-gray-300 rounded w-16 mb-1"></div>
            <div className="h-3 bg-gray-300 rounded w-8"></div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <div className="h-3 bg-gray-300 rounded flex-1"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <div className="h-3 bg-gray-300 rounded flex-1"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <div className="h-3 bg-gray-300 rounded flex-1"></div>
          </div>
        </div>

        <div className="h-10 bg-gray-300 rounded mt-4"></div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 rounded-lg p-4 shadow-sm animate-pulse">
      <div className="h-5 bg-gray-300 rounded w-32 mb-4"></div>
      <div className="space-y-4">
        <div className="bg-white/70 rounded-lg p-4">
          <div className="h-4 bg-gray-300 rounded w-20 mb-3"></div>
          <div className="flex gap-3">
            <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>

        <div className="bg-white/70 rounded-lg p-4">
          <div className="h-4 bg-gray-300 rounded w-24 mb-3"></div>
          <div className="flex gap-3">
            <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              <div className="h-3 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 카드 대기용 컴포넌트
export const CardLoadingIndicator: React.FC = () => {
  return (
    <div className="flex w-full mb-4 justify-start">
      <div className="w-8 h-8 mr-2 mt-1 flex-shrink-0">
        <AvatarComponent src={IMAGES.MOONER['mooner-chat']} />
      </div>

      <div className="flex flex-col gap-3">
        {/* 카드 스켈레톤들 */}
        <div className="flex gap-3">
          <CardSkeleton type="plan" />
          <CardSkeleton type="plan" />
        </div>
        {/* 텍스트 준비 중 표시 */}
        <div className="text-sm text-gray-500 animate-pulse">📝 분석하고 있어요...</div>
      </div>
    </div>
  );
};

export const UBTILoadingIndicator: React.FC = () => {
  return (
    <div className="flex w-full mb-4 justify-start">
      <div className="w-8 h-8 mr-2 mt-1 flex-shrink-0">
        <AvatarComponent src={IMAGES.MOONER['mooner-chat']} />
      </div>

      <div className="bg-brand-yellow-light px-4 py-3 rounded-lg rounded-tl-none shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-bg-gray-300 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
              style={{ animationDelay: '0.1s' }}
            ></div>
            <div
              className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
              style={{ animationDelay: '0.2s' }}
            ></div>
          </div>
          <span className="text-sm tbg-gray-600">🐙 타코시그널 분석 중...</span>
        </div>
      </div>
    </div>
  );
};

export const LikesLoadingIndicator: React.FC = () => {
  return (
    <div className="flex w-full mb-4 justify-start">
      <div className="w-8 h-8 mr-2 mt-1 flex-shrink-0">
        <AvatarComponent src={IMAGES.MOONER['mooner-chat']} />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <CardSkeleton type="subscription" />
        </div>
        <div className="text-sm text-pink-500 animate-pulse">💜 취향저격 추천 준비 중...</div>
      </div>
    </div>
  );
};
