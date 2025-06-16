export interface Brand {
  id: number;
  title: string;
  image_url: string;
  category: string;
}

export type BrandCategory =
  | '전체'
  | '도서/콘텐츠'
  | '디저트/음료'
  | '편의점/쇼핑'
  | '카페/음료'
  | '베이커리';
