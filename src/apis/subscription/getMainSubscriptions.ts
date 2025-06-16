import { apiWithoutToken } from '@/lib/api/apiconfig';
import type { BaseResponse } from '@/types/common';
import type { SubscriptionItem } from '@/types/subscription';

export type GetMainSubscriptionsResponse = BaseResponse<SubscriptionItem[]>;

/**
 * 메인 구독 상품 전체 조회
 * GET /api/subscriptions/main
 */
export const getMainSubscriptions = async (): Promise<GetMainSubscriptionsResponse> => {
  const response = await apiWithoutToken.get('/subscriptions/main');
  return response.data;
};
