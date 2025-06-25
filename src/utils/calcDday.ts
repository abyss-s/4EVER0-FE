export const calcDday = (dateStr: string): string => {
  const targetDate = new Date(dateStr);
  const today = new Date();

  // 날짜가 유효하지 않으면 D-NaN 방지
  if (isNaN(targetDate.getTime())) return 'D-?';

  targetDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diff = Math.floor((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diff === 0) return 'D-day';
  if (diff > 0) return `D-${diff}`;
  return `D+${Math.abs(diff)}`;
};
