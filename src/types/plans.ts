export interface PlanResponse {
  id: number;
  name: string;
  price: number;
  description: string;
  data: string | null;
  speed: string | null;
  shareData: string | null;
  voice: string | null;
  sms: string | null;
  isActive: boolean;
}
