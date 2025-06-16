import { apiWithToken } from '@/lib/api/apiconfig';
import { AttendanceTodayResponse } from '../../types/attendance';

export const getTodayAttendance = async (): Promise<AttendanceTodayResponse> => {
  const res = await apiWithToken.get('/attendances/today');
  console.log('📦 getTodayAttendance 응답:', res.data); // ✅ 여기!
  return res.data.data;
};

export const postTodayAttendance = async (): Promise<AttendanceTodayResponse> => {
  const res = await apiWithToken.post('/attendances');
  return res.data;
};
