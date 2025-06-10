import React from 'react';
import { Message } from '@/types/chat';
import { cn } from '@/lib/utils';

interface ChatBubbleProps {
  message: Message;
  isStreaming?: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isStreaming = false }) => {
  const isBot = message.type === 'bot';

  return (
    <div className={cn('flex w-full mb-4', isBot ? 'justify-start' : 'justify-end')}>
      <div
        className={cn(
          'max-w-[80%] px-4 py-2 rounded-lg',
          isBot
            ? 'bg-gray-100 text-gray-800 rounded-tl-none'
            : 'bg-primary text-primary-foreground rounded-tr-none',
        )}
      >
        <div className="text-sm whitespace-pre-wrap">
          {message.content}
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
