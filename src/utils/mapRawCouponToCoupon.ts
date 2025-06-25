import { RawCoupon, Coupon } from '@/types/coupon';

export const mapRawCouponToCoupon = (raw: RawCoupon): Coupon => ({
  couponId: raw.coupon_id,
  title: raw.title,
  discount_value: raw.discount_value ?? 0,
  discount_type: raw.discount_type ?? 'FIXED',
  isUsed: raw.is_used,
  startDate: raw.start_date,
  endDate: raw.end_date,
  brand: {
    id: raw.brand.id,
    name: raw.brand.name,
    imageUrl: raw.brand.image_url,
    category: raw.brand.category ?? null,
  },
});
