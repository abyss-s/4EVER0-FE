import { apiWithoutToken } from '@/lib/api/apiconfig';
import type { BaseResponse } from '@/types/common';
import type { Brand, BrandCategory } from '@/types/brand';

export interface GetBrandsParams {
  category?: BrandCategory;
}

export type GetBrandsResponse = BaseResponse<Brand[]>;

/**
 * 라이프 구독 브랜드 조회 (전체 or 카테고리별)
 * GET /api/subscriptions/brands
 */
export const getBrands = async (params?: GetBrandsParams): Promise<GetBrandsResponse> => {
  const response = await apiWithoutToken.get('/subscriptions/brands', { params });
  return response.data;
};

/**
 * 전체 브랜드 조회
 */
export const getAllBrands = (): Promise<GetBrandsResponse> => getBrands();

/**
 * 특정 카테고리의 브랜드 조회
 */
export const getBrandsByCategory = (category: BrandCategory): Promise<GetBrandsResponse> =>
  getBrands({ category });
