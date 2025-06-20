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
  color: 'red' | 'yellow' | 'gray';
  isUsed: boolean;
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
