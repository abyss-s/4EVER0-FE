import { apiWithToken } from '@/lib/api/apiconfig';
import { Coupon, RawCoupon } from '@/types/coupon';

export const fetchUserCoupons = async (): Promise<Coupon[]> => {
  const res = await apiWithToken.get<{ data: { coupons: RawCoupon[] } }>('/user/coupons');
  return res.data.data.coupons.map(
    (c): Coupon => ({
      couponId: c.coupon_id,
      title: c.title,
      discount_value: c.discount_value ?? 0,
      discount_type: c.discount_type ?? 'FIXED',
      isUsed: c.is_used,
      startDate: c.start_date,
      endDate: c.end_date,
      brand: {
        id: c.brand.id,
        name: c.brand.name,
        imageUrl: c.brand.image_url,
        category: c.brand.category ?? null,
      },
    }),
  );
};
