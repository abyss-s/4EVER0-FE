import { useMutation } from '@tanstack/react-query';
import { sendChatMessageStreaming } from '@/apis/chat/chat';
import { getLikesRecommendationStreaming } from '@/apis/chat/chatLikes';
import { sendUBTIAnswerStreaming } from '@/apis/ubti/ubti';
import { getUsageRecommendationStreaming } from '@/apis/chat/usage';
import type { UsageRecommendationRequest } from '@/apis/chat/usage';

interface UsageRecommendationMutationParams {
  onChunk: (chunk: string) => void;
  tone: 'muneoz' | 'general';
}

export const useChatMutation = () =>
  useMutation({
    mutationFn: async ({
      sessionId,
      message,
      tone,
      onChunk,
    }: {
      sessionId: string;
      message: string;
      tone?: 'muneoz' | 'general';
      onChunk: (chunk: string) => void;
    }) => {
      return await sendChatMessageStreaming(
        {
          session_id: sessionId,
          message,
          tone: tone === 'muneoz' ? 'muneoz' : 'general',
        },
        (chunk) => onChunk(chunk.data),
      );
    },
  });

export const useLikesRecommendationMutation = () =>
  useMutation({
    mutationFn: async ({
      sessionId,
      tone,
      onChunk,
    }: {
      sessionId: string;
      tone: 'muneoz' | 'general';
      onChunk: (chunk: string) => void;
    }) => {
      return await getLikesRecommendationStreaming(
        {
          session_id: sessionId,
          tone: tone === 'muneoz' ? 'muneoz' : 'general',
        },
        (chunk) => onChunk(chunk.data),
      );
    },
  });

export const useUBTIMutation = () =>
  useMutation({
    mutationFn: async ({
      sessionId,
      message,
      tone,
      onChunk,
    }: {
      sessionId: string;
      message?: string;
      tone: 'muneoz' | 'general';
      onChunk: (chunk: string) => void;
    }) => {
      if (!sessionId) {
        throw new Error('세션 ID가 없습니다.');
      }

      return await sendUBTIAnswerStreaming(
        {
          session_id: sessionId,
          message: message ?? '',
          tone,
        },
        (chunk) => onChunk(chunk.data),
      );
    },
  });

export const useUsageRecommendationMutation = () => {
  return useMutation({
    mutationFn: async ({ onChunk, tone }: UsageRecommendationMutationParams) => {
      const request: UsageRecommendationRequest = { tone };

      await getUsageRecommendationStreaming(request, ({ data }) => {
        onChunk(data);
      });
    },
    onError: (error) => {
      console.error('Usage recommendation mutation error:', error);
    },
  });
};
