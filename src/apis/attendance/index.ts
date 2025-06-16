import { apiWithToken } from '@/lib/api/apiconfig';
import { AttendanceTodayResponse } from '../../types/types';

export const getTodayAttendance = async (): Promise<AttendanceTodayResponse> => {
  const res = await apiWithToken.get('/attendances/today');
  return res.data;
};

export const postTodayAttendance = async (): Promise<AttendanceTodayResponse> => {
  const res = await apiWithToken.post('/attendances');
  return res.data;
};
