import axios from 'axios';

const CLIENT_ID = import.meta.env.VITE_NCP_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_NCP_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.warn('네이버 클라우드 API 키가 설정되지 않았습니다.');
}

/** 네이버 정적 Map API 전용 axios 인스턴스 */
export const staticMapApi = axios.create({
  baseURL: 'https://naveropenapi.apigw.ntruss.com/map-static/v2',
  // 요청 헤더 설정: https://api.ncloud-docs.com/docs/application-maps-overview
  headers: {
    'X-NCP-APIGW-API-KEY-ID': CLIENT_ID,
    'X-NCP-APIGW-API-KEY': CLIENT_SECRET,
  },
});
