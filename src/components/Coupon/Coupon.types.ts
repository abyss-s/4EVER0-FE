export interface CouponProps {
  type: 'owned' | 'liked' | 'hot';
  brandName: string;
  description: string;
  dateRange: string;
  imageUrl?: string;
  isUrgent?: boolean;
  onClickUse?: () => void;
}
