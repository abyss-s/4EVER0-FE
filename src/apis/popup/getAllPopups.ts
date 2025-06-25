import { apiWithoutToken } from '@/lib/api/apiconfig';
import type { GetPopupListResponse } from '@/types/popup';

/**
 * 팝업스토어 전체 조회
 * GET /api/popups
 */
export const getPopups = async (): Promise<GetPopupListResponse> => {
  const response = await apiWithoutToken.get('/popups');
  return response.data;
};
