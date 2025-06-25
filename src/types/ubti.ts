import { BaseResponse } from './common';

export interface UBTIResultData {
  ubti_type: {
    id: number;
    code: string;
    name: string;
    emoji: string;
    description: string;
    image_url: string;
  };
  summary: string;
  recommendation: {
    plans: { id: number; name: string; description: string }[];
    subscription: { id: number; name: string; description: string };
    brand: {
      id: number;
      name: string;
      image_url: string;
      description: string;
      category: string;
    };
  };
  matching_type: {
    id: number;
    code: string;
    name: string;
    emoji: string;
    description: string;
    image_url: string;
  };
}

export interface UBTIType {
  id: number;
  code: string;
  name: string;
  emoji: string;
  description: string;
  image_url: string;
}

export interface UBTIBrand {
  id: number;
  name: string;
  image_url: string;
  category: string;
  description: string;
}

export interface MatchingType {
  id: number;
  code: string;
  name: string;
  emoji: string;
  description: string;
  image_url: string;
}

export type UBTIResultResponse = BaseResponse<UBTIResultData>;
