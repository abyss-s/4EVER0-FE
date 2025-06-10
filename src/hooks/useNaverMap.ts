import { useEffect, useRef, useState, useCallback } from 'react';
import type { NaverMapOptions, MarkerOptions } from '@/types/naverMap';

export function useNaverMap(options: NaverMapOptions = {}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<naver.maps.Map | undefined>(undefined);
  const markersRef = useRef<naver.maps.Marker[]>([]); // 마커 상태는 Ref로 사용하여 렌더링을 트리거하지 않음
  const [isLoaded, setIsLoaded] = useState(false);

  const {
    center = { lat: 37.5665, lng: 126.978 },
    zoom = 14,
    mapTypeId = naver.maps.MapTypeId.NORMAL,
    minZoom = 6,
    maxZoom = 20,
    zoomControl = true,
    mapDataControl = true,
    scaleControl = true,
    logoControl = true,
  } = options;

  // 지도 초기화
  const initializeMap = useCallback(() => {
    if (!mapRef.current || !window.naver?.maps) return;

    mapInstanceRef.current = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(center.lat, center.lng),
      zoom,
      mapTypeId,
      minZoom,
      maxZoom,
      zoomControl,
      mapDataControl,
      scaleControl,
      logoControl,
    });

    setIsLoaded(true);

    // geolocation으로 현재 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentPos = new naver.maps.LatLng(latitude, longitude);

          // 현재 위치로 지도 중심 이동
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setCenter(currentPos);

            // 현재 위치 마커 추가
            const currentMarker = new naver.maps.Marker({
              position: currentPos,
              map: mapInstanceRef.current,
              title: '현재 위치',
              icon: {
                content:
                  '<div style="background: #4285f4; border-radius: 50%; width: 12px; height: 12px; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
                anchor: new naver.maps.Point(9, 9),
              },
            });

            markersRef.current = [...markersRef.current, currentMarker];
          }
        },
        (error) => {
          console.warn('위치 정보를 가져올 수 없습니다:', error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 600000,
        },
      );
    }
  }, [
    center,
    zoom,
    mapTypeId,
    minZoom,
    maxZoom,
    zoomControl,
    mapDataControl,
    scaleControl,
    logoControl,
  ]);

  // 마커 추가 함수
  const addMarker = useCallback((markerOptions: MarkerOptions) => {
    if (!mapInstanceRef.current) return null;

    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(markerOptions.position.lat, markerOptions.position.lng),
      map: mapInstanceRef.current,
      title: markerOptions.title,
      icon: markerOptions.icon,
      clickable: markerOptions.clickable ?? true,
    });

    markersRef.current = [...markersRef.current, marker];
    return marker;
  }, []);

  // 모든 마커 제거 함수 - 더 이상 markers 상태에 의존하지 않음
  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  }, []);

  // 지도 중심 이동 함수
  const setCenter = useCallback((lat: number, lng: number) => {
    if (!mapInstanceRef.current) return;

    const newCenter = new naver.maps.LatLng(lat, lng);
    mapInstanceRef.current.setCenter(newCenter);
  }, []);

  // 줌 레벨 설정 함수
  const setZoom = useCallback((zoomLevel: number) => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.setZoom(zoomLevel);
  }, []);

  // 마커 목록을 가져오는 함수 (필요한 경우)
  const getMarkers = useCallback(() => {
    return markersRef.current;
  }, []);

  useEffect(() => {
    const handleMapLoad = () => {
      if (window.naver?.maps) {
        initializeMap();
      }
    };

    // 네이버 맵 API가 이미 로드되었는지 확인
    if (window.naver?.maps) {
      initializeMap();
    } else {
      // 스크립트 로드 완료 이벤트 리스너 추가
      window.addEventListener('naver-maps-loaded', handleMapLoad);
    }

    return () => {
      window.removeEventListener('naver-maps-loaded', handleMapLoad);
      // 컴포넌트 언마운트 시 마커들 정리
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
    };
  }, [initializeMap]); // clearMarkers 의존성 제거

  return {
    mapRef,
    mapInstance: mapInstanceRef.current,
    isLoaded,
    addMarker,
    clearMarkers,
    setCenter,
    setZoom,
    markers: markersRef.current, // ref의 current 값을 반환
    getMarkers, // 마커 목록을 가져오는 새로운 함수
  };
}
