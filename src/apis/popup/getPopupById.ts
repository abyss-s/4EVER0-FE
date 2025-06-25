import { apiWithoutToken } from '@/lib/api/apiconfig';
import type { GetPopupDetailResponse } from '@/types/popup';

/**
 * 팝업스토어 상세 조회
 * GET /api/popups/{id}
 */
export const getPopupById = async (id: number): Promise<GetPopupDetailResponse> => {
  const response = await apiWithoutToken.get(`/popups/${id}`);
  return response.data;
};
