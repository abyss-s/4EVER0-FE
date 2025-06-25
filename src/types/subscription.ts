import { BaseResponse } from './common';

export interface SubscriptionItem {
  id: number;
  title: string;
  image_url: string;
  category: string;
  price: number;
}

// 구독 가입 관련 타입
export interface SubscribeRequest {
  subscription_id: number;
  brand_id: number;
}

export interface SubscribeData {
  subscription_combination_id: number;
  brand_id: number;
  price: number;
}

export type SubscribeResponse = BaseResponse<SubscribeData>;

// 구독 해지 관련 타입
export interface UnsubscribeRequest {
  subscription_combination_id: number;
}

export interface UnsubscribeData {
  subscription_combination_id: number;
  message: string;
}

export type UnsubscribeResponse = BaseResponse<UnsubscribeData>;
