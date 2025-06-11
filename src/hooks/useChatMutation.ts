import { useMutation } from '@tanstack/react-query';
import { sendChatMessageStreaming } from '@/apis/chat/chat';
import { getLikesRecommendationStreaming } from '@/apis/chat/chatLikes';
import { sendUBTIAnswerStreaming } from '@/apis/ubti/ubti';

export const useChatMutation = () =>
  useMutation({
    mutationFn: async ({
      sessionId,
      message,
      onChunk,
    }: {
      sessionId: string;
      message: string;
      onChunk: (chunk: string) => void;
    }) => {
      return await sendChatMessageStreaming(
        { session_id: sessionId, message },
        (chunk) => onChunk(chunk.data), // 객체에서 data만 추출해서 전달
      );
    },
  });

export const useLikesRecommendationMutation = () =>
  useMutation({
    mutationFn: async ({
      sessionId,
      onChunk,
    }: {
      sessionId: string;
      onChunk: (chunk: string) => void;
    }) => {
      return await getLikesRecommendationStreaming(
        { session_id: sessionId },
        (chunk) => onChunk(chunk.data), // 객체에서 data만 추출해서 전달
      );
    },
  });

export const useUBTIMutation = () =>
  useMutation({
    mutationFn: async ({
      sessionId,
      message,
      onChunk,
    }: {
      sessionId: string;
      message: string;
      onChunk: (chunk: string) => void;
    }) => {
      return await sendUBTIAnswerStreaming(
        { session_id: sessionId, message },
        (chunk) => onChunk(chunk.data), // 객체에서 data만 추출해서 전달
      );
    },
  });
