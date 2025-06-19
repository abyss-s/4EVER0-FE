import { apiWithToken } from '@/lib/api/apiconfig';
import type { UBTIResultResponse } from '@/types/ubti';
import { API_BASE_URL } from '@/lib/api/apiconfig';
import { StreamingThrottle } from '@/lib/streaming/StreamingThrottle';
import { processStreamWithThrottle } from '@/lib/streaming/streamProcessor';
import { createStreamingHeaders, STREAMING_PRESETS } from '@/lib/streaming/utils';
import type { SendUBTIRequest, UBTIChunk } from '@/lib/streaming/types';

/**
 * UBTI 질문하기
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
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('UBTI fetch failed:', response.status, errorText);
      throw new Error(`HTTP error ${response.status}: ${errorText}`);
    }

    const throttle = new StreamingThrottle(STREAMING_PRESETS.UBTI);
    await processStreamWithThrottle(response, onChunk, throttle);
  } catch (error) {
    console.error('UBTI streaming error:', error);
    throw new Error('UBTI 질문 처리 실패');
  }
}

/**
 * UBTI 결과 조회
 * POST /ubti/result
 */
export const fetchUBTIResult = async (
  sessionId: string,
  tone: 'general' | 'muneoz' = 'general',
): Promise<UBTIResultResponse> => {
  const response = await apiWithToken.post('/ubti/result', {
    session_id: sessionId,
    tone,
    message: '',
  });
  return response.data;
};
