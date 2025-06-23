import { API_BASE_URL } from '@/lib/api/apiconfig';
import { StreamingThrottle } from '@/lib/streaming/StreamingThrottle';
import { processStreamWithThrottle, processStreamFast } from '@/lib/streaming/streamProcessor';
import { createStreamingHeaders, STREAMING_PRESETS } from '@/lib/streaming/utils';
import type { SendChatMessageRequest, SendChatMessageStreamChunk } from '@/lib/streaming/types';
export type { SendChatMessageRequest, SendChatMessageStreamChunk } from '@/lib/streaming/types';

/**
 * 채팅 메시지 스트리밍 전송
 * @param req 채팅 요청 데이터
 * @param onChunk 청크 처리 콜백
 */
export async function sendChatMessageStreaming(
  req: SendChatMessageRequest,
  onChunk: (chunk: SendChatMessageStreamChunk) => void,
): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: createStreamingHeaders(),
      body: JSON.stringify(req),
      credentials: 'omit',
    });

    const throttle = new StreamingThrottle(STREAMING_PRESETS.CHAT);
    await processStreamWithThrottle(response, onChunk, throttle);
  } catch (error) {
    console.error('Chat streaming error:', error);
    throw new Error('채팅 메시지 전송 실패');
  }
}

/**
 * 채팅 메시지 빠른 스트리밍
 * @param req 채팅 요청 데이터
 * @param onChunk 청크 처리 콜백
 */
export async function sendChatMessageStreamingFast(
  req: SendChatMessageRequest,
  onChunk: (chunk: SendChatMessageStreamChunk) => void,
): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: createStreamingHeaders(),
      body: JSON.stringify(req),
      credentials: 'omit',
    });

    await processStreamFast(response, onChunk);
  } catch (error) {
    console.error('Fast chat streaming error:', error);
    throw new Error('채팅 메시지 전송 실패');
  }
}
