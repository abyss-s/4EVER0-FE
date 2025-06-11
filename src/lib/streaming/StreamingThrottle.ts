import type { StreamingConfig, StreamingStats } from './types';

/**
 * 스트리밍 지연 처리 클래스
 * 청크 크기와 전송 간격을 분석하여 동적으로 지연시간을 조절합니다.
 */
export class StreamingThrottle {
  private minDelay: number;
  private maxDelay: number;
  private lastChunkTime: number = 0;
  private chunkSizes: number[] = [];
  private chunkIntervals: number[] = [];
  private isFirstChunk: boolean = true;

  constructor(config: StreamingConfig = { minDelay: 50, maxDelay: 200 }) {
    this.minDelay = config.minDelay;
    this.maxDelay = config.maxDelay;
  }

  /**
   * 동적 지연 시간 계산
   * @param chunkSize 현재 청크의 크기
   * @returns 계산된 지연 시간 (ms)
   */
  private calculateDelay(chunkSize: number): number {
    const now = Date.now();

    // 첫 번째 청크는 즉시 처리
    if (this.isFirstChunk) {
      this.isFirstChunk = false;
      this.lastChunkTime = now;
      return 0;
    }

    // 이전 청크와의 간격 기록
    const interval = now - this.lastChunkTime;
    this.chunkIntervals.push(interval);
    this.chunkSizes.push(chunkSize);

    // 최근 5개 청크만 유지
    if (this.chunkIntervals.length > 5) {
      this.chunkIntervals.shift();
      this.chunkSizes.shift();
    }

    // 평균 간격 계산
    const avgInterval = this.chunkIntervals.reduce((a, b) => a + b, 0) / this.chunkIntervals.length;

    // 청크 크기에 따른 기본 지연 시간 (글자 수 * 5ms, 최대 maxDelay)
    const baseDelayBySize = Math.min(chunkSize * 5, this.maxDelay);

    // 너무 빨리 오는 경우 지연 시간 증가
    let adaptiveDelay = this.minDelay;
    if (avgInterval < 80) {
      // 80ms보다 빠르게 오는 경우
      const speedPenalty = Math.min(this.maxDelay, (80 - avgInterval) * 2);
      adaptiveDelay = Math.min(this.maxDelay, baseDelayBySize + speedPenalty);
    } else {
      adaptiveDelay = Math.max(this.minDelay, baseDelayBySize);
    }

    this.lastChunkTime = now;
    return adaptiveDelay;
  }

  /**
   * 지연된 청크 전송
   * @param chunk 전송할 청크 데이터
   * @param onChunk 청크 처리 콜백
   */
  async processChunk(chunk: string, onChunk: (chunk: { data: string }) => void): Promise<void> {
    const delay = this.calculateDelay(chunk.length);

    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    onChunk({ data: chunk });
  }

  /**
   * 스트리밍 상태 리셋 (새로운 스트림 시작시)
   */
  reset(): void {
    this.lastChunkTime = 0;
    this.chunkSizes = [];
    this.chunkIntervals = [];
    this.isFirstChunk = true;
  }

  /**
   * 현재 스트리밍 통계 조회
   */
  getStats(): StreamingStats {
    const averageInterval =
      this.chunkIntervals.length > 0
        ? this.chunkIntervals.reduce((a, b) => a + b, 0) / this.chunkIntervals.length
        : 0;

    return {
      chunkSizes: [...this.chunkSizes],
      chunkIntervals: [...this.chunkIntervals],
      averageInterval,
    };
  }
}
