import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from '@/components/Button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  ubtiInProgress?: boolean;
  currentUBTIStep?: number;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = '무너에게 메시지를 입력하세요...',
  ubtiInProgress,
  currentUBTIStep,
}) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // ✅ 사용자 인터랙션 감지
  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasUserInteracted(true);
      console.log('🎯 사용자 인터랙션 감지됨');
    };

    // 터치, 클릭, 키보드 입력 중 하나라도 감지되면
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });
    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  // ✅ 모바일 친화적 포커스 함수
  const focusInput = useCallback(() => {
    if (inputRef.current && !disabled && hasUserInteracted) {
      // 모바일에서는 사용자 인터랙션 후에만 포커스 가능
      inputRef.current.focus();

      // iOS Safari 대응
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        inputRef.current.click();
      }

      console.log('🎯 포커스 시도 (사용자 인터랙션 후)');
    }
  }, [disabled, hasUserInteracted]);

  // ✅ UBTI 단계 변경 시 포커스 (사용자 인터랙션 후에만)
  useEffect(() => {
    if (ubtiInProgress && currentUBTIStep !== undefined && hasUserInteracted) {
      setTimeout(() => {
        focusInput();
        console.log('🆕 새 질문 - 포커스 시도:', currentUBTIStep);
      }, 300);
    }
  }, [ubtiInProgress, currentUBTIStep, focusInput, hasUserInteracted]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmedMessage = message.trim();
      if (trimmedMessage && !disabled) {
        console.log('📤 메시지 전송:', trimmedMessage);
        onSendMessage(trimmedMessage);
        setMessage('');

        // ✅ 사용자가 직접 전송했으므로 인터랙션 상태 업데이트
        setHasUserInteracted(true);

        // ✅ 메시지 전송 후 포커스 (인터랙션 후에만)
        if (ubtiInProgress && hasUserInteracted) {
          setTimeout(() => {
            focusInput();
          }, 100);

          // 추가 재시도
          setTimeout(() => {
            focusInput();
          }, 500);
        }
      }
    },
    [message, disabled, onSendMessage, ubtiInProgress, hasUserInteracted, focusInput],
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

  // ✅ 입력창 클릭 시 인터랙션 상태 업데이트
  const handleInputFocus = useCallback(() => {
    setHasUserInteracted(true);
    console.log('🎯 입력창 포커스 - 인터랙션 상태 업데이트');
  }, []);

  // ✅ 모바일 대응: 전체 입력 영역을 클릭 가능하게
  const handleContainerClick = useCallback(() => {
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
      setHasUserInteracted(true);
    }
  }, [disabled]);

  return (
    <div
      className="flex w-full items-center space-x-2"
      onClick={handleContainerClick} // ✅ 전체 영역 클릭 가능
    >
      <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
        <div className="flex-1 relative">
          {/* ✅ UBTI 진행 중일 때 시각적 강조 */}
          {ubtiInProgress && !hasUserInteracted && (
            <div className="absolute inset-0 border-2 border-blue-400 rounded-md animate-pulse pointer-events-none z-10">
              <div className="absolute -top-8 left-0 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                👆 여기를 터치해서 답변해주세요!
              </div>
            </div>
          )}

          <Input
            ref={inputRef}
            type="text"
            placeholder={disabled ? '무너가 답변을 생각 중...' : placeholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={handleInputFocus}
            disabled={disabled}
            className={`flex-1 ${ubtiInProgress ? 'ring-2 ring-blue-300' : ''}`}
            maxLength={500}
            // ✅ 모바일 최적화 속성
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            // inputMode을 통해 모바일 키보드 타입 제어
            inputMode="text"
          />
        </div>

        <Button
          type="submit"
          size="icon"
          disabled={disabled || !message.trim()}
          className="shrink-0"
          onClick={() => setHasUserInteracted(true)} // ✅ 버튼 클릭도 인터랙션으로 간주
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};
