import { apiWithoutToken } from '@/lib/api/apiconfig';
import type { GetNearbyPopupListResponse } from '@/types/popup';

/**
 * 수동 좌표 기반 근처 팝업스토어 조회
 * 예: /api/popups/nearby?lat=37.5&lng=127.0&radius=5
 */
export const getNearbyPopups = async (
  lat: number,
  lng: number,
  radius = 5,
): Promise<GetNearbyPopupListResponse> => {
  const response = await apiWithoutToken.get('/popups/nearby', {
    params: { lat, lng, radius },
  });
  return response.data;
};
