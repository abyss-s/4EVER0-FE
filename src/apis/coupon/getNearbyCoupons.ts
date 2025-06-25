import { apiWithToken } from '@/lib/api/apiconfig';
import { PlaceInfo, NearbyCouponsResponse } from '@/types/brand';
import qs from 'qs';

export const getNearbyCoupons = async (
  lat: number,
  lng: number,
  brandIds: number[],
): Promise<PlaceInfo[]> => {
  const response = await apiWithToken.get<NearbyCouponsResponse>('/coupons/nearby', {
    params: { lat, lng, brand_id: brandIds },
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
  });
  return response.data.data.places.map((place, index) => ({
    ...place,
    id: index + 1,
  }));
};
