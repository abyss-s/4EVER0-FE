import { apiWithToken } from '@/lib/api/apiconfig';
import { Coupon } from '@/types/coupon';

export const fetchUserCoupons = async (): Promise<Coupon[]> => {
  const res = await apiWithToken.get('/user/coupons');
  return res.data.data.coupons;
};
