import { StreamingThrottle } from './StreamingThrottle';

/**
 * JSON 구조를 지원하는 개선된 스트리밍 처리 함수 (띄어쓰기 문제 해결)
 */
export async function processStreamWithThrottle(
  response: Response,
  onChunk: (chunk: { data: string }) => void,
  throttle: StreamingThrottle,
): Promise<void> {
  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
  }

  if (!response.body) {
    throw new Error('Stream not supported');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  throttle.reset();

  try {
    let done = false;
    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;

      if (value) {
        buffer += decoder.decode(value, { stream: true });
      }

      // SSE 형식 파싱
      const parts = buffer.split('\n\n');
      buffer = parts.pop() ?? '';

      for (const part of parts) {
        const lines = part.split('\n').filter(Boolean);

        for (const line of lines) {
          if (line.startsWith('data:')) {
            const data = line.replace(/^data:\s?/, '').trim();

            if (data === '[DONE]') {
              continue;
            }

            if (data) {
              // JSON 구조인지 확인
              if (isJSONStructure(data)) {
                // JSON인 경우 즉시 전송 (카드 정보)
                onChunk({ data });
              } else {
                // 일반 텍스트는 그대로 전송 (띄어쓰기 보존)
                onChunk({ data });
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('Stream processing error:', error);
    throw error;
  } finally {
    reader.releaseLock();
  }
}

/**
 * JSON 구조인지 확인하는 함수
 */
function isJSONStructure(data: string): boolean {
  try {
    const parsed = JSON.parse(data);
    return (
      typeof parsed === 'object' &&
      parsed !== null &&
      'type' in parsed &&
      (parsed.type === 'plan_recommendations' ||
        parsed.type === 'subscription_recommendations' ||
        parsed.type === 'message_start' ||
        parsed.type === 'message_chunk' ||
        parsed.type === 'message_end')
    );
  } catch {
    return false;
  }
}

/**
 * 디버깅용 빠른 스트림 처리
 */
export async function processStreamFast(
  response: Response,
  onChunk: (chunk: { data: string }) => void,
): Promise<void> {
  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
  }

  if (!response.body) {
    throw new Error('Stream not supported');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    let done = false;
    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;

      if (value) {
        buffer += decoder.decode(value, { stream: true });
      }

      const parts = buffer.split('\n\n');
      buffer = parts.pop() ?? '';

      for (const part of parts) {
        const lines = part.split('\n').filter((line) => line.startsWith('data:'));
        for (const line of lines) {
          const data = line.replace(/^data:\s?/, '').trim();
          if (data && data !== '[DONE]') {
            onChunk({ data });
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}
