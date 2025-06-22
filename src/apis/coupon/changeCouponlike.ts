import { apiWithToken } from '@/lib/api/apiconfig';

export const changeCouponLike = (couponId: number) =>
  apiWithToken.post(`/coupons/${couponId}/like`);
