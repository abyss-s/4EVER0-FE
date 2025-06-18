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
export interface MainSubscriptionWithType {
  id: number;
  title: string;
  price: number;
  category: string;
  image_url: string;
  type: 'main_subscription';
}

export interface LifeBrandWithType {
  id: number;
  name: string;
  image_url: string;
  description: string;
  type: 'life_brand';
}

// type 필드가 없는 버전 (컴포넌트용)
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

// 구독 추천 항목 유니온 타입 (API 응답용)
export type SubscriptionItem = MainSubscriptionWithType | LifeBrandWithType;

// 새로운 구독 추천 응답 구조 - 배열로 변경
export interface SubscriptionRecommendationsResponse {
  type: 'subscription_recommendations';
  subscriptions: SubscriptionItem[];
}

// 컴포넌트에서 사용하는 구독 데이터 구조 (type 필드 없음)
export interface SubscriptionRecommendationsData {
  main_subscription?: MainSubscription;
  life_brand?: LifeBrand;
}

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

interface UBTIStreamingQuestion {
  type: 'question_content';
  question: string;
  step: number;
  total_steps: number;
}

interface UBTIStreamingComplete {
  type: 'ubti_complete';
}

export type UBTIStreamingMessage = UBTIStreamingQuestion | UBTIStreamingComplete;

export type StreamingResponse =
  | PlanRecommendationsResponse
  | SubscriptionRecommendationsResponse
  | MessageStartResponse
  | MessageChunkResponse
  | MessageEndResponse
  | UBTIStreamingMessage;
