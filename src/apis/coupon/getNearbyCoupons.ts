import { apiWithoutToken } from '@/lib/api/apiconfig';
import type { PlaceInfo, NearbyCouponsResponse } from '@/types/brand';

/**
 * 근처 쿠폰 사용 가능 매장 조회 API 호출
 *
 * @param params - { lat, lng, brand_id } 쿼리 파라미터
 * @returns API 응답 데이터
 */
export const getNearbyCoupons = async (
  lat: number,
  lng: number,
  brand_id: number[],
): Promise<PlaceInfo[]> => {
  const response = await apiWithoutToken.get<NearbyCouponsResponse>('/coupons/nearby', {
    params: { lat, lng, brand_id },
  });

  if (!response.data?.data?.places) return [];

  // places 배열을 PlaceInfo 타입으로 변환
  const placeInfos: PlaceInfo[] = response.data.data.places.map((place) => ({
    id: place.id,
    name: place.name,
    lat: place.lat,
    lng: place.lng,
    address: place.address,
  }));

  return placeInfos;
};
