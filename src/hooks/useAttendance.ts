import { useQuery, useMutation } from '@tanstack/react-query';
import { getTodayAttendance, postTodayAttendance } from '@/apis/attendance/attendance';
import { useUserProfile } from '@/stores/useUserProfile';
import { updateProgress } from '@/apis/mission/updateProgress'; // 미션 진행도 API 추가
import { toast } from 'sonner';

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

  // const { mutate: checkAttendance, isPending } = useMutation({
  //   mutationFn: async () => {
  //     await postTodayAttendance(); // ✅ 출석 API 호출
  //     await updateProgress(3); // ✅ 미션 ID 3: 연속 출석 미션 +1
  //   },
  //   onSuccess: () => {
  //     refetchAttendance(); // 출석 상태 최신화
  //     toast.success('출석 완료!');
  //   },
  //   onError: () => {
  //     toast.error('이미 출석하셨거나 오류가 발생했어요!');
  //   },
  // });

  const { mutate: checkAttendance, isPending } = useMutation({
    mutationFn: async () => {
      console.log('🟡 출석 요청 시작');
      await postTodayAttendance(); // 출석 요청
      console.log('🟢 출석 성공 → 진행도 업데이트 시도');

      await updateProgress(3); // 미션 ID 3 진행도 +1
      console.log('🟢 미션 진행도 업데이트 성공');
    },
    onSuccess: () => {
      console.log('🟢 전체 성공 → 상태 리패치');
      refetchAttendance();
      toast.success('출석 완료!');
    },
    onError: (error) => {
      console.error('❌ 출석 또는 미션 업데이트 실패:', error);
      toast.error('이미 출석하셨거나 오류가 발생했어요!');
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
