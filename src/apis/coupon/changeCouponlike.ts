import { apiWithToken } from '@/lib/api/apiconfig';

// TODO: 인터페이스 타입으로 분리 필요
interface CouponLikeResponse {
  status: number;
  message: string;
  data: {
    liked: boolean;
    coupon_id: number;
  };
}

export const changeCouponLike = (couponId: number): Promise<{ data: CouponLikeResponse }> =>
  apiWithToken.post(`/coupons/${couponId}/like`);
