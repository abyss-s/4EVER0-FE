export type Coupon = {
  couponId: number;
  title: string;
  discount_value: number;
  discount_type: 'PERCENT' | 'FIXED';
  brand: {
    id: number;
    name: string;
    imageUrl: string;
    category?: string | null;
  };
  isUsed: boolean;
  startDate?: string;
  endDate?: string;
  barcodeImageUrl?: string;
};
export type RawCoupon = {
  coupon_id: number;
  title: string;
  discount_value?: number;
  discount_type?: 'PERCENT' | 'FIXED';
  is_used: boolean;
  start_date: string;
  end_date: string;
  brand: {
    id: number;
    name: string;
    image_url: string;
    category?: string | null;
  };
};
export interface PlaceInfo {
  id?: number; // 서버에서 id가 없다면 선택적
  name: string;
  lat: number;
  lng: number;
  address: string;
}

export interface NearbyCouponsResponse {
  success: boolean;
  message: string;
  data: {
    places: PlaceInfo[];
  };
}
