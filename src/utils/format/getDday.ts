import { format } from 'date-fns';
import { calcDday } from '@/utils/calcDday'; // 기존 calcDday는 그대로 유지

/**
 * Date 객체를 받아 디데이 문자열 반환
 */
export const getDday = (date: Date): string => {
  const dateStr = format(date, 'yyyy-MM-dd');
  return calcDday(dateStr);
};
