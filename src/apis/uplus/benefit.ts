import { apiWithToken } from '@/lib/api/apiconfig';
import { Benefit } from '@/types/uplus';

/**
 * 이번 달 U+ 혜택 전체 조회
 */
export const getMonthlyBenefits = async (): Promise<Benefit[]> => {
  const res = await apiWithToken.get('/api/uplus-benefits');
  return res.data;
};

/**
 * 특정 날짜의 U+ 혜택 조회
 * @param date yyyy-MM-dd 형식
 */
export const getBenefitByDate = async (date: string): Promise<Benefit> => {
  const res = await apiWithToken.get(`/api/uplus-benefits/${date}`);
  return res.data;
};
