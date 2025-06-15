import { apiWithToken } from '@/lib/api/apiconfig';
import type { SubscribeRequest, SubscribeResponse } from '@/types/subscription';

/**
 * 구독 상품 가입
 * POST /api/subscriptions/subscribe
 */
export const postSubscription = async (data: SubscribeRequest): Promise<SubscribeResponse> => {
  const response = await apiWithToken.post('/subscriptions/subscribe', data);
  return response.data;
};

/**
 * 구독 상품 ID와 브랜드 ID로 간단 가입
 */
export const subscribeToService = (subscriptionId: number, brandId: number) =>
  postSubscription({
    subscription_id: subscriptionId,
    brand_id: brandId,
  });
