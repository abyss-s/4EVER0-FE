import { apiWithoutToken } from '@/lib/api/apiconfig';
import type { GetNearbyWithLocationResponse } from '@/types/popup';

/**
 * 자동 위치(IP 기반) 근처 팝업스토어 조회
 * 예: /api/popups/nearby/location?radius=5
 */
export const getNearbyPopupsByLocation = async (
  radius = 5,
): Promise<GetNearbyWithLocationResponse> => {
  const response = await apiWithoutToken.get('/popups/nearby/location', {
    params: { radius },
  });
  return response.data;
};
