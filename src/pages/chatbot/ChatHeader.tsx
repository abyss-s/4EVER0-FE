import React from 'react';
import { ToneSwitch } from './ToneSwitch';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/useAuthStore';
import { ChatSession } from '@/types/chat';

interface ChatHeaderProps {
  ubtiInProgress: boolean;
  isMunerTone: boolean;
  onToneToggle: (isMuner: boolean) => void;
  buttonDisabled: boolean;
  currentSession: ChatSession | null;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  ubtiInProgress,
  isMunerTone,
  onToneToggle,
  buttonDisabled,
  currentSession,
}) => {
  const { isLoggedIn } = useAuthStore();

  const usageDisplay = React.useMemo(
    () => (currentSession ? `${currentSession.usageCount}/5` : '0/5'),
    [currentSession?.usageCount],
  );

  return (
    <div
      className={cn(
        'flex justify-between items-center py-4 bg-white shrink-0 transition-all duration-300',
        ubtiInProgress && 'mt-24',
      )}
    >
      <h1 className="text-xl font-bold text-brand-darkblue mb-4">무너와 대화하기</h1>

      <div className="flex items-center space-x-3">
        <ToneSwitch isMunerTone={isMunerTone} onToggle={onToneToggle} disabled={buttonDisabled} />

        {ubtiInProgress && (
          <div className="flex items-center gap-2 text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
            <Sparkles className="w-3 h-3 animate-pulse" />
            <span className="font-medium">UBTI 진행중</span>
          </div>
        )}

        {/* 채팅 사용횟수 */}
        <div className="flex items-center space-x-1">
          {!isLoggedIn && <span className="text-xs font-medium text-gray-400">채팅</span>}
          {!isLoggedIn && (
            <span
              className={`text-xs font-medium ${
                (currentSession?.usageCount || 0) >= 4 ? 'text-red-500' : 'text-gray-600'
              }`}
            >
              {usageDisplay}회
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
