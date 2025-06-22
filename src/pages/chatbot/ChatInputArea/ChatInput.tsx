import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from '@/components/Button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = '무너에게 메시지를 입력하세요...',
  autoFocus = true,
}) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // 컴포넌트 마운트 시 포커스
  useEffect(() => {
    if (autoFocus && !disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus, disabled]);

  // 메시지 전송 후 포커스 복구
  const focusInput = useCallback(() => {
    // 약간의 지연을 두어 DOM 업데이트 후 포커스
    setTimeout(() => {
      if (inputRef.current && !disabled) {
        inputRef.current.focus();
      }
    }, 100);
  }, [disabled]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmedMessage = message.trim();
      if (trimmedMessage && !disabled) {
        onSendMessage(trimmedMessage);
        setMessage('');
        // 메시지 전송 후 포커스 복구
        focusInput();
      }
    },
    [message, disabled, onSendMessage, focusInput],
  );

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    },
    [handleSubmit],
  );

  // disabled 상태가 변경될 때 포커스 관리
  useEffect(() => {
    if (!disabled && autoFocus) {
      focusInput();
    }
  }, [disabled, autoFocus, focusInput]);

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
      <Input
        ref={inputRef}
        type="text"
        placeholder={disabled ? '무너가 답변을 생각 중...' : placeholder}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={disabled}
        className="flex-1 rounded-lg border-gray-300 py-3 focus:border-brand-yellow focus:ring-brand-yellow/20"
        maxLength={500}
        autoComplete="off"
        autoFocus={autoFocus}
      />
      <Button
        type="submit"
        size="icon"
        disabled={disabled || !message.trim()}
        className="shrink-0 rounded-lg w-10 h-10 bg-brand-darkblue hover:bg-brand-darkblue/90"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};
