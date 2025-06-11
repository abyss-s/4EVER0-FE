// 공통 스트리밍 인터페이스들
export interface SendChatMessageRequest {
  session_id: string;
  message: string;
}

export interface SendChatMessageStreamChunk {
  data: string;
}

export interface LikesRecommendationRequest {
  session_id: string;
}

export interface LikesRecommendationChunk {
  data: string;
}

export interface SendUBTIRequest {
  session_id: string;
  message: string;
}

export interface UBTIChunk {
  data: string;
}

// 스트리밍 설정 인터페이스
export interface StreamingConfig {
  minDelay: number;
  maxDelay: number;
}

// 스트리밍 통계 인터페이스
export interface StreamingStats {
  chunkSizes: number[];
  chunkIntervals: number[];
  averageInterval: number;
}
