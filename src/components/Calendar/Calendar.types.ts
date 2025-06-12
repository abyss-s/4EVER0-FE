export interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  type?: string;
  color?: string;
}

export interface AttendanceData {
  [date: string]: boolean; // 'yyyy-MM-dd': attended
}

export interface BenefitData {
  id: string;
  date: Date;
  type: string; // 'D-1', 'D-2', etc.
  dDay: number;
  title: string;
  description?: string;
  color: string;
}
