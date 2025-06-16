import { useQuery, useMutation } from '@tanstack/react-query';
import { getTodayAttendance, postTodayAttendance } from '@/apis/attendance';
import { useUserProfile } from '@/stores/useUserProfile';

export const useAttendance = () => {
  const { data: profile } = useUserProfile();

  const {
    data: attendance,
    refetch: refetchAttendance,
    isLoading,
  } = useQuery({
    queryKey: ['attendance', profile?.userId],
    queryFn: getTodayAttendance,
    enabled: !!profile?.userId,
  });

  const { mutate: checkAttendance, isPending } = useMutation({
    mutationFn: postTodayAttendance,
    onSuccess: () => {
      refetchAttendance(); // ✅ 출석 후 바로 상태 업데이트
    },
  });

  return {
    attendance,
    checkAttendance,
    isChecking: isPending,
    refetchAttendance,
    isLoading,
    userName: profile?.name ?? '회원',
  };
};
