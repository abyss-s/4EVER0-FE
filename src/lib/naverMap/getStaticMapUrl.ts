import { staticMapApi } from "../api";

export interface StaticMapOptions {
  width?: number;
  height?: number;
  zoom?: number;
  maptype?: "basic" | "traffic" | "satellite" | "terrain";
  markers?: string;
}

export function getStaticMapUrl(lon: number, lat: number, opts?: StaticMapOptions): string {
  const { width = 600, height = 400, zoom = 16, maptype = "basic", markers } = opts || {};

  const params = new URLSearchParams({
    center: `${lon},${lat}`,
    level: zoom.toString(),
    w: width.toString(),
    h: height.toString(),
    maptype,
    format: "png",
  });

  if (markers) {
    params.append("markers", markers);
  } else {
    // 기본 마커로 설정
    params.append("markers", `type:t|size:mid|color:red|pos:${lon} ${lat}`);
  }

  return `${staticMapApi.defaults.baseURL}/staticmap?${params.toString()}`;
}
