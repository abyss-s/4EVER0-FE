// 요금제 추천 타입
export interface PlanRecommendation {
  id: number;
  name: string;
  price: number;
  data: string;
  voice: string;
  speed?: string;
  share_data?: string;
  sms?: string;
  description: string;
}

export interface PlanRecommendationsResponse {
  type: 'plan_recommendations';
  plans: PlanRecommendation[];
}

// 구독 서비스 추천 타입
export interface MainSubscription {
  id: number;
  title: string;
  price: number;
  category: string;
  image_url: string;
}

export interface LifeBrand {
  id: number;
  name: string;
  image_url: string;
  description: string;
}

export interface SubscriptionRecommendationsResponse {
  type: 'subscription_recommendations';
  data: {
    main_subscription?: MainSubscription;
    life_brand?: LifeBrand;
  };
}

// 메시지 청크 타입
export interface MessageStartResponse {
  type: 'message_start';
}

export interface MessageChunkResponse {
  type: 'message_chunk';
  content: string;
}

export interface MessageEndResponse {
  type: 'message_end';
}

// 전체 스트리밍 응답 타입
export type StreamingResponse =
  | PlanRecommendationsResponse
  | SubscriptionRecommendationsResponse
  | MessageStartResponse
  | MessageChunkResponse
  | MessageEndResponse;
