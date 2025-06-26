import { apiWithToken } from '@/lib/api/apiconfig';

// TODO: 인터페이스 타입으로 분리 필요
interface CouponLikeResponse {
  status: number;
  message: string;
  data: {
    coupon_id: number;
  };
}

export const claimCoupon = (brand_Id: number): Promise<{ data: CouponLikeResponse }> =>
  apiWithToken.post(`/coupons/${brand_Id}/claim`);
