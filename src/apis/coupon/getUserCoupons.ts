import { apiWithToken } from '@/lib/api/apiconfig';
import { Coupon, RawCoupon } from '@/types/coupon';
import { mapRawCouponToCoupon } from '@/utils/mapRawCouponToCoupon';

export const fetchUserCoupons = async (): Promise<Coupon[]> => {
  const res = await apiWithToken.get<{ data: { coupons: RawCoupon[] } }>('/user/coupons');
  return res.data.data.coupons.map(mapRawCouponToCoupon);
};
