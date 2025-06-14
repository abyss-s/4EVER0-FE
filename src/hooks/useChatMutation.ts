import { useMutation } from '@tanstack/react-query';
import { sendChatMessageStreaming } from '@/apis/chat/chat';
import { getLikesRecommendationStreaming } from '@/apis/chat/chatLikes';
import { sendUBTIAnswerStreaming } from '@/apis/ubti/ubti';

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
      tone: 'muner' | 'normal';
      onChunk: (chunk: string) => void;
    }) => {
      return await sendChatMessageStreaming({ session_id: sessionId, message, tone }, (chunk) =>
        onChunk(chunk.data),
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
      tone: 'muner' | 'normal';
      onChunk: (chunk: string) => void;
    }) => {
      return await getLikesRecommendationStreaming({ session_id: sessionId, tone }, (chunk) =>
        onChunk(chunk.data),
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
      message: string;
      tone: 'muner' | 'normal';
      onChunk: (chunk: string) => void;
    }) => {
      return await sendUBTIAnswerStreaming({ session_id: sessionId, message, tone }, (chunk) =>
        onChunk(chunk.data),
      );
    },
  });
