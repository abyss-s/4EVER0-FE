import { apiWithToken } from '@/lib/api/apiconfig';
import { AttendanceTodayResponse, MonthlyAttendanceResponse } from '../../types/attendance';

export const getTodayAttendance = async (): Promise<AttendanceTodayResponse> => {
  const res = await apiWithToken.get('/attendances/today');
  return {
    checked: res.data.data, // Boolean 값
    date: '',
    streak: 0, // 추후 streak API 통합 시 수정 가능
  };
};

export const postTodayAttendance = async (): Promise<AttendanceTodayResponse> => {
  const res = await apiWithToken.post('/attendances');
  return res.data;
};

export const getMonthlyAttendance = async (
  year: number,
  month: number,
): Promise<MonthlyAttendanceResponse> => {
  const res = await apiWithToken.get(`/attendances/month?year=${year}&month=${month}`);
  return res.data.data ?? [];
};
