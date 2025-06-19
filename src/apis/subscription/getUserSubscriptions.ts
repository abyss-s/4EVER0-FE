import { apiWithToken } from '@/lib/api/apiconfig';

export interface UserSubscription {
  id: number;
  price: number;
  subscription_combination_id: number;
  main_title: string;
  brand_title: string;
  image_url?: string;
  created_at: string;
}

export const fetchUserSubscriptions = async (): Promise<UserSubscription[]> => {
  const res = await apiWithToken.get('/user/subscriptions');
  return res.data.data.combinations;
};
