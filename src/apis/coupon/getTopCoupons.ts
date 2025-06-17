import { apiWithToken } from '@/lib/api/apiconfig';

export interface TopCoupon {
  id: number;
  title: string;
  description: string;
  brand: string;
  discountType: 'PERCENT' | 'FIXED';
  discountValue: number;
  startDate: string;
  endDate: string;
  likes: number;
}

export const getTopCoupons = async (): Promise<TopCoupon[]> => {
  try {
    const response = await apiWithToken.get('/coupons/best');
    return response.data?.data || [];
  } catch (error) {
    console.error('🔥 쿠폰 BEST 3 조회 실패:', error);
    return [];
  }
};
