import { BaseResponse } from './common';

export interface UBTIResultData {
  ubti_type: {
    code: string;
    name: string;
    emoji: string;
    description: string;
  };
  summary: string;
  recommendation: {
    plans: {
      name: string;
      description: string;
    }[];
    subscription: {
      name: string;
      description: string;
    };
  };
  matching_type: {
    code: string;
    name: string;
    emoji: string;
    description: string;
  };
}

export interface UBTIType {
  emoji: string;
  name: string;
  description: string;
  front_image?: string;
  back_image?: string;
}

export interface MatchingType {
  emoji: string;
  name: string;
  description: string;
}

export type UBTIResultResponse = BaseResponse<UBTIResultData>;
