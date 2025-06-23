import { VITE_API_BASE_URL } from '@/lib/api/apiconfig';
import { StreamingThrottle } from '@/lib/streaming/StreamingThrottle';
import { processStreamWithThrottle } from '@/lib/streaming/streamProcessor';
import { createStreamingHeaders, STREAMING_PRESETS } from '@/lib/streaming/utils';
import type { UsageRecommendationRequest, UsageRecommendationChunk } from '@/lib/streaming/types';
export type { UsageRecommendationRequest, UsageRecommendationChunk } from '@/lib/streaming/types';

/**
 * 사용량 기반 요금제 추천 스트리밍
 * @param req 추천 요청 데이터
 * @param onChunk 청크 처리 콜백
 */
export async function getUsageRecommendationStreaming(
  req: UsageRecommendationRequest,
  onChunk: (chunk: UsageRecommendationChunk) => void,
): Promise<void> {
  try {
    const response = await fetch(`${VITE_API_BASE_URL}/chat/usage`, {
      method: 'POST',
      headers: createStreamingHeaders(true), // 인증 필요
      body: JSON.stringify(req),
      credentials: 'include', // JWT 쿠키 포함
    });

    const throttle = new StreamingThrottle(STREAMING_PRESETS.RECOMMENDATION);
    await processStreamWithThrottle(response, onChunk, throttle);
  } catch (error) {
    console.error('Usage recommendation streaming error:', error);
    throw new Error('사용량 기반 추천 요청 실패');
  }
}
