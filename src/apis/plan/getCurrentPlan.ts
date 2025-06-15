import { apiWithToken } from '@/lib/api/apiconfig';
import axios from 'axios';

export const fetchCurrentPlan = async () => {
  try {
    const res = await apiWithToken.get('/user/plans', {
      withCredentials: true,
    });

    return res.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error('인증되지 않았습니다.');
    }

    throw new Error('요금제 조회 중 오류 발생');
  }
};
