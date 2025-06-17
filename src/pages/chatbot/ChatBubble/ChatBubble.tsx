import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import type { Components } from 'react-markdown';
import { Message } from '@/types/chat';
import { PlanRecommendation, SubscriptionRecommendationsResponse } from '@/types/streaming';
import { AvatarComponent } from '@/components/Avatar';
import { PlanCard } from '@/components/PlanCard/PlanCard';
import { SubscriptionCard } from '@/components/SubscriptionCard/SubscriptionCard';
import { cn } from '@/lib/utils';
import { IMAGES } from '@/constant/imagePath';
import { useNavigate } from 'react-router-dom';

interface ChatBubbleProps {
  message: Message;
  isStreaming?: boolean;
  planRecommendations?: PlanRecommendation[];
  subscriptionRecommendations?: SubscriptionRecommendationsResponse['data'];
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isStreaming = false,
  planRecommendations,
  subscriptionRecommendations,
}) => {
  const isBot = message.type === 'bot';
  const navigate = useNavigate();

  const processedContent = React.useMemo(() => {
    let content = message.content;

    // 1. 기본 정리
    content = content.replace(/^data:\s*/gm, '');
    content = content.replace(/\[DONE\]/g, '');

    // 2. 백슬래시-n을 실제 줄바꿈으로 변환
    content = content.replace(/\\n/g, '\n');

    // 3. 체크마크 앞에 줄바꿈 추가 (조건부)
    content = content.replace(/([^\n])(✅)/g, '$1\n\n$2');

    // 4. 불완전한 마크다운 태그 정리
    content = content.replace(/\*{3,}/g, '**');

    // 5. 앞뒤 공백 제거
    content = content.trim();

    console.log('Processed content:', content); // 디버깅용

    return content;
  }, [message.content]);

  // 마크다운 사용 조건을 더 관대하게
  const shouldUseMarkdown = React.useMemo(() => {
    if (!isBot) return false;

    // 스트리밍 중이라도 기본적인 마크다운 요소가 있으면 사용
    const hasMarkdownElements = /(\*\*.*?\*\*|✅|^\s*[-*•]\s|[\u{1F300}-\u{1F9FF}])/mu.test(
      processedContent,
    );

    return hasMarkdownElements || !isStreaming;
  }, [isBot, isStreaming, processedContent]);

  // react-markdown 설정
  const markdownComponents: Components = {
    h1: ({ children }) => <h1 className="text-lg font-bold mb-2 text-foreground">{children}</h1>,
    h2: ({ children }) => <h2 className="text-base font-bold mb-2 text-foreground">{children}</h2>,
    h3: ({ children }) => <h3 className="text-sm font-bold mb-1 text-foreground">{children}</h3>,
    ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
    li: ({ children }) => <li className="text-sm">{children}</li>,
    strong: ({ children }) => <strong className="font-bold text-primary">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    p: ({ children }) => (
      <p className="mb-2 last:mb-0 whitespace-pre-wrap leading-relaxed">{children}</p>
    ),
    br: () => <br />,
    code: ({ children }) => (
      <code className="bg-secondary px-1 py-0.5 rounded text-xs font-mono text-secondary-foreground">
        {children}
      </code>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-primary underline hover:text-primary/80"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  };

  const handlePlanSelect = (plan: PlanRecommendation) => {
    console.log('선택된 요금제:', plan);
    // 여기에 요금제 선택 로직 추가
  };

  const handleSubscriptionSelect = (subscription: unknown) => {
    console.log('선택된 구독 서비스:', subscription);
    // 홈 화면으로 가서 유독픽 유도?
    navigate('/');
  };

  const handleBrandSelect = (brand: unknown) => {
    console.log('선택된 브랜드:', brand);
    // 여기에서 팝업스토어 쿠폰이랑 연결?
    navigate('/hotplace');
  };

  return (
    <div className={cn('flex w-full mb-4', isBot ? 'justify-start' : 'justify-end')}>
      {isBot && (
        <div className="w-8 h-8 mr-2 mt-1 flex-shrink-0">
          <AvatarComponent src={IMAGES.MOONER['mooner-chat']} />
        </div>
      )}
      <div className={cn('max-w-[80%] flex flex-col gap-3')}>
        {/* 요금제 추천 카드들 */}
        {isBot && planRecommendations && planRecommendations.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {planRecommendations.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onSelect={handlePlanSelect}
                className="max-w-xs"
              />
            ))}
          </div>
        )}

        {/* 구독 서비스 추천 카드 */}
        {isBot && subscriptionRecommendations && (
          <SubscriptionCard
            data={subscriptionRecommendations}
            onSubscribe={handleSubscriptionSelect}
            onBrandSelect={handleBrandSelect}
            className="max-w-md"
          />
        )}

        {/* 텍스트 메시지 */}
        {processedContent && (
          <div
            className={cn(
              'px-4 py-2 rounded-lg',
              isBot
                ? 'bg-brand-yellow-light text-secondary-foreground rounded-tl-none shadow-sm'
                : 'bg-brand-darkblue-light text-brand-darkblue rounded-tr-none',
            )}
          >
            <div className="text-sm">
              {isBot && shouldUseMarkdown ? (
                <ReactMarkdown
                  components={markdownComponents}
                  remarkPlugins={[remarkBreaks]}
                  skipHtml={true}
                >
                  {processedContent}
                </ReactMarkdown>
              ) : (
                <div
                  className="whitespace-pre-wrap leading-relaxed"
                  style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}
                >
                  {processedContent}
                </div>
              )}

              {isStreaming && isBot && (
                <span className="inline-block w-2 h-4 bg-current opacity-50 animate-pulse ml-1">
                  |
                </span>
              )}
            </div>
            <p className="text-xs opacity-50 text-right mt-1">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
