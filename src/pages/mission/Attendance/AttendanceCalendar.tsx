import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { getMonthlyAttendance } from '@/apis/attendance/attendance';
import { BaseCalendar } from '@/components/Calendar/BaseCalendar';

export const AttendanceCalendar = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  const { data: attendedDates = [] } = useQuery({
    queryKey: ['attendance', year, month],
    queryFn: () => getMonthlyAttendance(year, month),
  });

  const markedDates = (date: Date) => {
    const formatted = format(date, 'yyyy-MM-dd');
    return attendedDates.includes(formatted);
  };

  return <BaseCalendar markedDates={markedDates} />;
};
