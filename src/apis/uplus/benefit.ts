import { apiWithoutToken } from '@/lib/api/apiconfig';
import { Benefit, BenefitDetail } from '@/types/uplus';
import { BaseResponse } from '@/types/common';
import { AxiosError } from 'axios';

/**
 * 이번 달 U+ 혜택 전체 조회
 */
export const getMonthlyBenefits = async (): Promise<Benefit[]> => {
  try {
    const res = await apiWithoutToken.get<BaseResponse<Benefit[]>>('/uplus-benefits');
    return res.data.data ?? [];
  } catch (err) {
    const error = err as AxiosError;
    console.error('❌ 혜택 불러오기 실패:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * 특정 날짜의 U+ 혜택 조회
 * yyyy-MM-dd 형식
 */
export const getBenefitByDate = async (date: string): Promise<BenefitDetail[]> => {
  try {
    const res = await apiWithoutToken.get<BaseResponse<BenefitDetail[]>>(`/uplus-benefits/${date}`);
    return res.data.data ?? [];
  } catch (err) {
    const error = err as AxiosError;
    console.error('❌ 특정 날짜 혜택 조회 실패:', error.response?.data || error.message);
    throw error;
  }
};
