// src/types/uplus.ts
export interface Brand {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  category?: string;
}

export interface Benefit {
  brand: string; // 브랜드 이름
  date: string; // 날짜 (issuedDate 대신)
}
