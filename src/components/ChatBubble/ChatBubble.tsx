import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import { Message } from '@/types/chat';
import { cn } from '@/lib/utils';
import { AvatarComponent } from '../Avatar/Avatar';

interface ChatBubbleProps {
  message: Message;
  isStreaming?: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isStreaming = false }) => {
  const isBot = message.type === 'bot';

  // react-markdown 컴포넌트로 수정
  const markdownComponents: Components = {
    h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
    h2: ({ children }) => <h2 className="text-base font-bold mb-2">{children}</h2>,
    h3: ({ children }) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
    ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
    li: ({ children }) => <li className="text-sm">{children}</li>,
    strong: ({ children }) => <strong className="font-bold text-primary">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
    code: ({ children }) => (
      <code className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono">{children}</code>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  };

  return (
    <div className={cn('flex w-full mb-4', isBot ? 'justify-start' : 'justify-end')}>
      {isBot && (
        <div className="w-8 h-8 mr-2 mt-1">
          <AvatarComponent src="/images/기본 프로필.png" fallback="무너" />
        </div>
      )}
      <div
        className={cn(
          'max-w-[80%] px-4 py-2 rounded-lg',
          isBot
            ? 'bg-gray-100 text-gray-800 rounded-tl-none'
            : 'bg-primary text-primary-foreground rounded-tr-none',
        )}
      >
        <div className="text-sm">
          {isBot ? (
            <ReactMarkdown components={markdownComponents}>{message.content}</ReactMarkdown>
          ) : (
            <div className="whitespace-pre-wrap">{message.content}</div>
          )}

          {isStreaming && isBot && (
            <span className="inline-block w-2 h-4 bg-current opacity-50 animate-pulse ml-1">|</span>
          )}
        </div>
        <p className="text-xs opacity-50 text-right mt-1">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
};
