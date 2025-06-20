import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import type { Components } from 'react-markdown';
import { Message } from '@/types/chat';

import { AvatarComponent } from '@/components/Avatar';
import PlanCard from '@/components/PlanCard/PlanCard';
import { SubscriptionCard } from '@/components/SubscriptionCard/SubscriptionCard';
import { cn } from '@/lib/utils';
import { IMAGES } from '@/constant/imagePath';
import { useNavigate } from 'react-router-dom';
import { PlanRecommendation } from '@/types/streaming';

interface ChatBubbleProps {
  message: Message;
  isStreaming?: boolean;
  isLatestBotMessage?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = React.memo(
  ({ message, isStreaming = false, isLatestBotMessage = false }) => {
    const isBot = message.type === 'bot';
    const navigate = useNavigate();

    // 고유 키 생성 (timestamp 타입 안전 처리용)
    const uniqueMessageKey = React.useMemo(() => {
      const timestampValue =
        message.timestamp instanceof Date
          ? message.timestamp.getTime()
          : typeof message.timestamp === 'number'
            ? message.timestamp
            : Date.now();

      return message.id || `fallback-${timestampValue}-${message.type}`;
    }, [message.id, message.timestamp, message.type]);

    // 메시지 내용 전처리
    const processedContent = React.useMemo(() => {
      let content = message.content;

      // 빈 콘텐츠 조기 반환
      if (!content || content.trim() === '') {
        return '';
      }

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

      return content;
    }, [message.content]);

    // 마크다운 사용 조건
    const shouldUseMarkdown = React.useMemo(() => {
      if (!isBot || !processedContent) return false;

      // 스트리밍 중이라도 기본적인 마크다운 요소가 있으면 사용
      const hasMarkdownElements = /(\*\*.*?\*\*|✅|^\s*[-*•]\s|[\u{1F300}-\u{1F9FF}])/mu.test(
        processedContent,
      );

      return hasMarkdownElements || !isStreaming;
    }, [isBot, isStreaming, processedContent]);

    // 추천 완료 메시지인지 확인 (키워드로 검사)
    const isRecommendationMessage = React.useMemo(() => {
      if (!processedContent) return false;

      const recommendationKeywords = [
        '추천드립니다',
        '추천해드릴게',
        '추천!',
        '완전 추천',
        '찰떡 요금제',
        '럭키비키',
        '느좋',
        '지리고',
        '추천 요금제',
        '추천 구독',
        '조합 추천',
        '메인 구독',
        '라이프 브랜드',
        '조합',
        '위 조합을 추천',
        '이 조합 완전',
        '구독 서비스 추천',
        '이 조합',
        '조합이',
        '추천',
        '완전',
        '알잘딱깔센',
        '찰떡',
        '유독픽',
        '매칭',
        '딱 맞는',
        '어울리',
      ];

      const result = recommendationKeywords.some((keyword) => processedContent.includes(keyword));

      return result;
    }, [processedContent]);

    // 카드 표시 조건 검사
    const shouldShowPlanCards = React.useMemo(() => {
      const hasCards = message.planRecommendations && message.planRecommendations.length > 0;
      // 최신 봇 메시지이거나 추천 메시지이거나 카드 데이터가 있으면 표시
      const shouldShow = isRecommendationMessage || isLatestBotMessage || hasCards;
      const result = isBot && hasCards && shouldShow;

      return result;
    }, [isBot, message.planRecommendations, isRecommendationMessage, isLatestBotMessage]);

    const shouldShowSubscriptionCard = React.useMemo(() => {
      const hasCards =
        message.subscriptionRecommendations &&
        Object.keys(message.subscriptionRecommendations).length > 0;
      // 최신 봇 메시지이거나 추천 메시지이거나 카드 데이터가 있으면 표시
      const shouldShow = isRecommendationMessage || isLatestBotMessage || hasCards;
      const result = isBot && hasCards && shouldShow;
      return result;
    }, [
      isBot,
      message.subscriptionRecommendations,
      isRecommendationMessage,
      isLatestBotMessage,
      message.id,
    ]);

    // 타임스탬프 포맷팅 최적화
    const formatTimestamp = React.useMemo(() => {
      const timestamp = message.timestamp;
      let date: Date;

      if (timestamp instanceof Date) {
        date = timestamp;
      } else if (typeof timestamp === 'number') {
        date = new Date(timestamp);
      } else {
        date = new Date();
      }

      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    }, [message.timestamp]);

    // react-markdown 렌더러 파싱 설정
    const markdownComponents: Components = React.useMemo(
      () => ({
        h1: ({ children }) => (
          <h1 className="text-lg font-bold mb-2 text-foreground">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-base font-bold mb-2 text-foreground">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-sm font-bold mb-1 text-foreground">{children}</h3>
        ),
        ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
        ol: ({ children }) => (
          <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>
        ),
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
      }),
      [],
    );

    const handlePlanSelect = React.useCallback((plan: PlanRecommendation) => {
      console.log('[DEBUG] Plan selected:', plan);
      // TODO: 요금제 선택 로직 구현
    }, []);

    const handleSubscriptionSelect = React.useCallback(
      (
        subscription: NonNullable<typeof message.subscriptionRecommendations>['main_subscription'],
      ) => {
        console.log('[DEBUG] Subscription selected:', subscription);
        navigate('/');
      },
      [navigate],
    );

    const handleBrandSelect = React.useCallback(
      (brand: NonNullable<typeof message.subscriptionRecommendations>['life_brand']) => {
        console.log('[DEBUG] Brand selected:', brand);
        navigate('/hotplace');
      },
      [navigate],
    );

    // 전체 메시지 디버깅 정보 출력
    React.useEffect(() => {
      if (isBot && (message.planRecommendations || message.subscriptionRecommendations)) {
        console.log('[DEBUG] ChatBubble message with cards:', {
          messageId: message.id,
          content: message.content?.slice(0, 50) + '...',
          planRecommendations: message.planRecommendations,
          subscriptionRecommendations: message.subscriptionRecommendations,
          subscriptionKeys: message.subscriptionRecommendations
            ? Object.keys(message.subscriptionRecommendations)
            : [],
          hasMainSub: !!message.subscriptionRecommendations?.main_subscription,
          hasLifeBrand: !!message.subscriptionRecommendations?.life_brand,
          isRecommendationMessage,
          isLatestBotMessage,
        });
      }
    }, [message, isRecommendationMessage, isLatestBotMessage, isBot]);

    // 렌더링할 내용이 없으면 null 반환
    if (!processedContent && !shouldShowPlanCards && !shouldShowSubscriptionCard) {
      return null;
    }

    return (
      <div
        className={cn('flex w-full mb-4', isBot ? 'justify-start' : 'justify-end')}
        data-message-id={uniqueMessageKey}
      >
        {/* 봇 아바타 */}
        {isBot && (
          <div className="w-8 h-8 mr-2 mt-1 flex-shrink-0">
            <AvatarComponent src={IMAGES.MOONER['mooner-chat']} />
          </div>
        )}

        <div className={cn('max-w-[80%] flex flex-col gap-3')}>
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

                {/* 스트리밍 커서 */}
                {isStreaming && isBot && (
                  <span className="inline-block w-2 h-4 bg-current opacity-50 animate-pulse ml-1">
                    |
                  </span>
                )}
              </div>

              {/* 타임스탬프 */}
              <p className="text-xs opacity-50 text-right mt-1">{formatTimestamp}</p>
            </div>
          )}

          {/* 요금제 추천 카드(들) */}
          {shouldShowPlanCards && message.planRecommendations && (
            <div className="flex flex-wrap gap-3">
              {message.planRecommendations.map((plan, index) => (
                <PlanCard
                  key={`plan-${plan.id}-${uniqueMessageKey}-${index}`}
                  plan={plan}
                  onSelect={handlePlanSelect}
                  className="max-w-xs"
                />
              ))}
            </div>
          )}

          {/* 구독 서비스 추천 카드 */}
          {shouldShowSubscriptionCard && message.subscriptionRecommendations && (
            <div key={`subscription-${uniqueMessageKey}`}>
              <SubscriptionCard
                data={message.subscriptionRecommendations}
                onSubscribe={handleSubscriptionSelect}
                onBrandSelect={handleBrandSelect}
                className="max-w-sm"
              />
            </div>
          )}
        </div>
      </div>
    );
  },
  // React.memo 최적화
  (prevProps, nextProps) => {
    // 기본 비교
    if (prevProps.message.id !== nextProps.message.id) return false;
    if (prevProps.isStreaming !== nextProps.isStreaming) return false;
    if (prevProps.isLatestBotMessage !== nextProps.isLatestBotMessage) return false;

    // 메시지 내용 변경 확인
    if (prevProps.message.content !== nextProps.message.content) return false;

    // 카드 정보 변경 확인
    if (prevProps.message.planRecommendations !== nextProps.message.planRecommendations)
      return false;
    if (
      prevProps.message.subscriptionRecommendations !==
      nextProps.message.subscriptionRecommendations
    )
      return false;

    return true; // 모든 비교를 통과하면 리렌더링하지 않음
  },
);

ChatBubble.displayName = 'ChatBubble';

export default ChatBubble;
