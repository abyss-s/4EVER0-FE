import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { postTodayAttendance, getTodayAttendance } from '@/apis/attendance/attendance';
import { useUserProfile } from '@/stores/useUserProfile';

export const useAttendance = () => {
  const queryClient = useQueryClient();
  const { data: userData } = useUserProfile();

  const [attendance, setAttendance] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const userName = userData?.name ?? '사용자';

  // 오늘 출석 여부 가져오기 (초기 로딩 시 사용)
  const fetchTodayAttendance = async () => {
    try {
      const result = await getTodayAttendance();
      setAttendance(result.checked);
    } catch (err) {
      console.error('오늘 출석 정보 조회 실패:', err);
    }
  };

  // 출석 체크
  const checkAttendance = async () => {
    try {
      setIsChecking(true);
      await postTodayAttendance();
      setAttendance(true);

      // 달력 쿼리 무효화해서 도장 즉시 반영
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;

      queryClient.invalidateQueries({
        queryKey: ['attendance', year, month],
        exact: true, // 정확히 일치하는 쿼리만 무효화
      });
    } catch (err) {
      console.error('출석 체크 실패:', err);
    } finally {
      setIsChecking(false);
    }
  };

  return {
    attendance,
    isChecking,
    userName,
    fetchTodayAttendance,
    checkAttendance,
  };
};
