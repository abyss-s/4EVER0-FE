// import { useQuery, useMutation } from '@tanstack/react-query';
// import { getTodayAttendance, postTodayAttendance } from '@/apis/attendance/attendance';
// import { useUserProfile } from '@/stores/useUserProfile';
// import { updateProgress } from '@/apis/mission/updateProgress'; // 미션 진행도 API 추가
// import { toast } from 'sonner';

// export const useAttendance = () => {
//   const { data: profile } = useUserProfile();

//   const {
//     data: attendance,
//     refetch: refetchAttendance,
//     isLoading,
//   } = useQuery({
//     queryKey: ['attendance', profile?.userId],
//     queryFn: getTodayAttendance,
//     enabled: !!profile?.userId,
//   });

//   // const { mutate: checkAttendance, isPending } = useMutation({
//   //   mutationFn: async () => {
//   //     await postTodayAttendance(); // ✅ 출석 API 호출
//   //     await updateProgress(3); // ✅ 미션 ID 3: 연속 출석 미션 +1
//   //   },
//   //   onSuccess: () => {
//   //     refetchAttendance(); // 출석 상태 최신화
//   //     toast.success('출석 완료!');
//   //   },
//   //   onError: () => {
//   //     toast.error('이미 출석하셨거나 오류가 발생했어요!');
//   //   },
//   // });

//   const { mutate: checkAttendance, isPending } = useMutation({
//     mutationFn: async () => {
//       console.log('🟡 출석 요청 시작');
//       await postTodayAttendance(); // 출석 요청
//       console.log('🟢 출석 성공 → 진행도 업데이트 시도');

//       await updateProgress(3); // 미션 ID 3 진행도 +1
//       console.log('🟢 미션 진행도 업데이트 성공');
//     },
//     onSuccess: () => {
//       console.log('🟢 전체 성공 → 상태 리패치');
//       refetchAttendance();
//       toast.success('출석 완료!');
//     },
//     onError: (error) => {
//       console.error('❌ 출석 또는 미션 업데이트 실패:', error);
//       toast.error('이미 출석하셨거나 오류가 발생했어요!');
//     },
//   });

//   return {
//     attendance,
//     checkAttendance,
//     isChecking: isPending,
//     refetchAttendance,
//     isLoading,
//     userName: profile?.name ?? '회원',
//   };
// };

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

  // ✅ 오늘 출석 여부 가져오기 (초기 로딩 시 사용)
  const fetchTodayAttendance = async () => {
    try {
      const result = await getTodayAttendance();
      setAttendance(result.checked);
    } catch (err) {
      console.error('오늘 출석 정보 조회 실패:', err);
    }
  };

  // ✅ 출석 체크
  const checkAttendance = async () => {
    try {
      setIsChecking(true);
      await postTodayAttendance();
      setAttendance(true);

      // 🔄 달력 쿼리 무효화해서 도장 즉시 반영
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
