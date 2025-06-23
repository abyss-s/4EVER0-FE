import { apiWithToken } from '@/lib/api/apiconfig';

export interface CouponBrand {
  id: number;
  name: string;
  imageUrl: string;
}

export interface Coupon {
  id: number;
  title: string;
  description: string;
  discountType: string;
  discountValue: number;
  validUntil: string;
  brand: CouponBrand;
}

export interface CouponListResponse {
  success: boolean;
  message: string;
  data: Coupon[];
}

export async function fetchCoupons(): Promise<Coupon[]> {
  const { data } = await apiWithToken.get<CouponListResponse>('/coupons');
  return data.data ?? [];
}
