import { apiWithToken } from '@/lib/api/apiconfig';
import { Coupon } from '@/types/coupon';

export const fetchUserCoupons = async (): Promise<Coupon[]> => {
  const res = await apiWithToken.get('/user/coupons');

  return res.data.data.coupons.map((c: any) => ({
    couponId: c.couponId,
    title: c.title,
    discount_value: c.discount_value,
    discount_type: c.discount_type,
    brand: c.brand,
    color: c.color,
    isUsed: c.isUsed,
    startDate: c.startDate || c.start_date,
    endDate: c.endDate || c.end_date,
  }));
};
