export interface Brand {
  id: number;
  title: string;
  image_url: string;
  category: string;
}

export type BrandCategory =
  | '전체'
  | '도서/콘텐츠'
  | '디저트/음료'
  | '편의점/쇼핑'
  | '카페/음료'
  | '베이커리';

export interface PlaceInfo {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address: string;
}

export interface PlaceSearchResponse {
  places: PlaceInfo[];
}

export interface NearbyCouponsResponse {
  success: boolean;
  message: string;
  data: PlaceSearchResponse;
}
