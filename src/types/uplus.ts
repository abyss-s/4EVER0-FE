// src/types/uplus.ts
export interface Brand {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  category?: string;
}

export interface Benefit {
  date: string; // yyyy-MM-dd
  brand: Brand; // 포함된 브랜드 정보
}
