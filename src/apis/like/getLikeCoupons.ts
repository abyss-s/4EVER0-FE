import { apiWithoutToken } from '@/lib/api/apiconfig';
import type { BaseResponse } from '@/types/common';

export interface LikedCoupon {
  id: number;
  title: string;
  description: string;
  discount_type: string;
  discount_value: number;
  start_date: string;
  end_date: string;
  brand_name: string;
  brand_id: number;
}

export interface LikedCouponsResponse {
  coupons: LikedCoupon[];
}

export async function fetchLikedCoupons(): Promise<LikedCoupon[]> {
  const { data } =
    await apiWithoutToken.get<BaseResponse<LikedCouponsResponse>>('/user/likes/coupons');
  return data.data?.coupons ?? [];
}
