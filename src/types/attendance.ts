export interface AttendanceTodayResponse {
  checked: boolean;
  date: string;
  streak: number;
}

// 출석일 배열 (예: ["2025-06-01", "2025-06-03", "2025-06-05"])
export type MonthlyAttendanceResponse = string[];
