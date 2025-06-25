import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * yyyy년 M월 d일 (요일) 형식으로 날짜 포맷
 */
export const formatDateWithDay = (date: Date): string => {
  return format(date, 'yyyy년 M월 d일 (EEEE)', { locale: ko });
};
