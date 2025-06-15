import { apiWithToken } from '@/lib/api/apiconfig';

export const fetchCurrentPlan = async () => {
  try {
    const res = await apiWithToken.get('/user/plans', {
      withCredentials: true,
    });

    return res.data.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.error('인증 실패: ACCESS_TOKEN이 없거나 만료됨');
      throw new Error('인증되지 않았습니다.');
    }

    console.error('요금제 조회 실패:', error);
    throw new Error('요금제 조회 중 오류 발생');
  }
};
