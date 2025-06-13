import { apiWithToken } from '@/lib/api/apiconfig';

export const fetchCurrentPlan = async () => {
  const res = await apiWithToken.get('/user/plan');
  console.log('✅ 요금제 전체 응답:', res.data); // 🔍 전체 구조 확인
  return res.data.data;
};
