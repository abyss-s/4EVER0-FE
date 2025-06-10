import { API_BASE_URL } from '@/lib/api/apiconfig';

/**
 * 스트리밍 지원 여부 확인
 * @returns 브라우저가 스트리밍을 지원하는지 여부
 */
export function isStreamingSupported(): boolean {
  return typeof ReadableStream !== 'undefined' && typeof TextDecoder !== 'undefined';
}

/**
 * 스트리밍 연결 상태 테스트
 * @returns API 서버와의 연결 상태
 */
export async function testStreamingConnection(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      credentials: 'omit',
    });
    return response.ok;
  } catch (error) {
    console.error('Connection test failed:', error);
    return false;
  }
}

/**
 * 공통 HTTP 헤더 생성
 * @param includeCredentials 인증 정보 포함 여부
 * @returns 스트리밍용 HTTP 헤더
 */
export function createStreamingHeaders(
  includeCredentials: boolean = false,
): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'text/event-stream',
    'Cache-Control': 'no-cache',
  };

  if (includeCredentials) {
    // 필요시 인증 헤더 추가
    headers['Authorization'] = 'Bearer token'; // 예시
  }

  return headers;
}

/**
 * 스트리밍 설정 프리셋
 */
export const STREAMING_PRESETS = {
  CHAT: { minDelay: 60, maxDelay: 180 }, // 채팅: 적당한 속도
  RECOMMENDATION: { minDelay: 80, maxDelay: 220 }, // 추천: 조금 더 천천히
  UBTI: { minDelay: 100, maxDelay: 300 }, // UBTI: 가장 여유있게
  FAST: { minDelay: 0, maxDelay: 0 }, // 빠른 처리용
} as const;
