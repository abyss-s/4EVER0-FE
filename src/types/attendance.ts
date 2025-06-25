export interface AttendanceTodayResponse {
  checked: boolean;
  date: string;
  streak: number;
}

export type MonthlyAttendanceResponse = string[];
