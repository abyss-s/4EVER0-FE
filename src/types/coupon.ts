export type Coupon = {
  couponId: number;
  title: string;
  discount_value: number;
  discount_type: 'PERCENT' | 'FIXED';
  brand: {
    id: number;
    name: string;
    imageUrl: string;
    category?: string | null;
  };
  color: 'red' | 'yellow' | 'gray' | 'lightblue ';
};
