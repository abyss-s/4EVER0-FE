import { API_BASE_URL } from '@/lib/api/apiconfig';
import { StreamingThrottle } from '@/lib/streaming/StreamingThrottle';
import { processStreamWithThrottle } from '@/lib/streaming/streamProcessor';
import { createStreamingHeaders, STREAMING_PRESETS } from '@/lib/streaming/utils';
import type { SendUBTIRequest, UBTIChunk } from '@/lib/streaming/types';
export type { SendUBTIRequest, UBTIChunk } from '@/lib/streaming/types';

/**
 * UBTI 답변 스트리밍
 * @param req UBTI 요청 데이터
 * @param onChunk 청크 처리 콜백
 */
export async function sendUBTIAnswerStreaming(
  req: SendUBTIRequest,
  onChunk: (chunk: UBTIChunk) => void,
): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/ubti/question`, {
      method: 'POST',
      headers: createStreamingHeaders(),
      body: JSON.stringify(req),
      credentials: 'include', // 로그인 필수
    });

    const throttle = new StreamingThrottle(STREAMING_PRESETS.UBTI);
    await processStreamWithThrottle(response, onChunk, throttle);
  } catch (error) {
    console.error('UBTI streaming error:', error);
    throw new Error('UBTI 질문 처리 실패');
  }
}
