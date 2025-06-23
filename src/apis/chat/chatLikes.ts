import { API_BASE_URL } from '@/lib/api/apiconfig';
import { StreamingThrottle } from '@/lib/streaming/StreamingThrottle';
import { processStreamWithThrottle } from '@/lib/streaming/streamProcessor';
import { createStreamingHeaders, STREAMING_PRESETS } from '@/lib/streaming/utils';
import type { LikesRecommendationRequest, LikesRecommendationChunk } from '@/lib/streaming/types';
export type { LikesRecommendationRequest, LikesRecommendationChunk } from '@/lib/streaming/types';

/**
 * 좋아요 기반 추천 스트리밍
 * @param req 추천 요청 데이터
 * @param onChunk 청크 처리 콜백
 */
export async function getLikesRecommendationStreaming(
  req: LikesRecommendationRequest,
  onChunk: (chunk: LikesRecommendationChunk) => void,
): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/likes`, {
      method: 'POST',
      headers: createStreamingHeaders(),
      body: JSON.stringify(req),
      credentials: 'include', // 로그인 필수
    });

    const throttle = new StreamingThrottle(STREAMING_PRESETS.RECOMMENDATION);
    await processStreamWithThrottle(response, onChunk, throttle);
  } catch (error) {
    console.error('Likes recommendation streaming error:', error);
    throw new Error('추천 서비스 요청 실패');
  }
}
