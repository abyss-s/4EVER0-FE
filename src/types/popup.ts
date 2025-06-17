import { BaseResponse } from './common';

export interface Popup {
  id: number;
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  image_url: string;
  isBookmarked?: boolean;
}

export interface NearbyPopup {
  id: number;
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  image_url: string;
  distance_km: number;
}

export interface NearbyPopupsWithLocation {
  latitude: number;
  longitude: number;
  address: string;
  nearby_popups: NearbyPopup[];
}

export type GetPopupListResponse = BaseResponse<Popup[]>;
export type GetPopupDetailResponse = BaseResponse<Popup>;
export type GetNearbyPopupListResponse = BaseResponse<NearbyPopup[]>;
export type GetNearbyWithLocationResponse = BaseResponse<NearbyPopupsWithLocation>;
