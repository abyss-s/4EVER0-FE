import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTodayAttendance, postTodayAttendance } from '@/apis/attendance/attendance';
import { useUserProfile } from '@/stores/useUserProfile';
import { useState } from 'react';

// 출석 정보
export const useAttendance = () => {
  const { data: userData } = useUserProfile();
  const queryClient = useQueryClient();
  const userName = userData?.name ?? '사용자';
  const userId = userData?.id;

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  const [isManuallyChecked, setIsManuallyChecked] = useState(false);

  // 오늘 출석 여부 불러오기
  const {
    data: todayAttendance,
    isLoading: isLoadingToday,
    isError: isTodayError,
  } = useQuery({
    queryKey: ['attendance', 'today'],
    queryFn: getTodayAttendance,
    staleTime: 1000 * 60 * 5, // 5분 캐시
  });

  // 출석 체크 뮤테이션
  const {
    mutate: checkAttendance,
    isPending: isChecking,
    isSuccess: isChecked,
  } = useMutation({
    mutationFn: postTodayAttendance,

    // 낙관적 UI 업데이트
    onMutate: () => {
      setIsManuallyChecked(true); // 배너 바뀌도록 하기 위해 로컬 상태 반영
      queryClient.setQueryData(['attendance', 'today'], {
        checked: true,
        date: today.toISOString(),
        streak: (todayAttendance?.streak ?? 0) + 1,
      });
    },

    // 쿼리 무효화로 달력 리렌더링
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance', year, month] });
      queryClient.invalidateQueries({ queryKey: ['attendance', 'today'] });
      queryClient.invalidateQueries({ queryKey: ['missions'] });

      if (userId) {
        queryClient.invalidateQueries({ queryKey: ['userProfile', userId] });
      }
    },
  });

  return {
    userName,
    attendance: todayAttendance?.checked ?? false,
    isManuallyChecked,
    checkAttendance,
    isChecking,
    isChecked,
    isLoadingToday,
    isTodayError,
  };
};
