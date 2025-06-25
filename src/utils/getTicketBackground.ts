import { IMAGES } from '@/constant/imagePath';

export const getTicketBackground = (color: 'red' | 'yellow' | 'gray') => {
  switch (color) {
    case 'red':
      return IMAGES.COUPON.TICKET_RED;
    case 'yellow':
      return IMAGES.COUPON.TICKET_YELLOW;
    case 'gray':
      return IMAGES.COUPON.TICKET_GRAY;
    default:
      return IMAGES.COUPON.TICKET_GRAY;
  }
};
