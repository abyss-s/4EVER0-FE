import { StreamingThrottle } from './StreamingThrottle';

/**
 * 공통 스트리밍 처리 함수
 * @param response HTTP Response 객체
 * @param onChunk 청크 처리 콜백
 * @param throttle 스트리밍 지연 처리 인스턴스
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
        const lines = part.split('\n').filter((line) => line.startsWith('data:'));
        for (const line of lines) {
          const data = line.replace(/^data:\s?/, '').trim();
          if (data && data !== '[DONE]') {
            await throttle.processChunk(data, onChunk);
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
 * 빠른 스트림 처리 함수 (지연 없음)
 * 디버깅이나 테스트용으로 사용
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
