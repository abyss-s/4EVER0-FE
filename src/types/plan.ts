export interface Plan {
  id: number;
  name: string;
  price: number;
  data: string;
  voice: string;
  speed?: string;
  share_data?: string;
  sms?: string;
  description: string;
}
