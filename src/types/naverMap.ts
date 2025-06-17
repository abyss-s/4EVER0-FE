export interface NaverMapOptions {
  center?: { lat: number; lng: number };
  zoom?: number;
  mapTypeId?: naver.maps.MapTypeId;
  minZoom?: number;
  maxZoom?: number;
  zoomControl?: boolean;
  mapDataControl?: boolean;
  scaleControl?: boolean;
  logoControl?: boolean;
}

export interface MarkerOptions {
  position: { lat: number; lng: number };
  title?: string;
  icon?: string | naver.maps.ImageIcon | naver.maps.SymbolIcon | naver.maps.HtmlIcon;
  clickable?: boolean;
}
