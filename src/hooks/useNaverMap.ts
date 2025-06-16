import { useEffect, useRef, useState, useCallback } from 'react';
import type { NaverMapOptions, MarkerOptions } from '@/types/naverMap';

export function useNaverMap(options: NaverMapOptions = {}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<naver.maps.Map | undefined>(undefined);
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const {
    center = { lat: 37.5665, lng: 126.978 },
    zoom = 14,
    mapTypeId = naver.maps.MapTypeId.NORMAL,
    minZoom = 6,
    maxZoom = 20,
    zoomControl = false,
    mapDataControl = false,
    scaleControl = false,
    logoControl = false,
  } = options;

  // 🎯 안정적인 함수들 (의존성 문제 해결)
  const addMarker = useCallback((markerOptions: MarkerOptions) => {
    if (!mapInstanceRef.current) {
      console.warn('⚠️ 지도 인스턴스가 없어서 마커를 추가할 수 없습니다');
      return null;
    }

    try {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(markerOptions.position.lat, markerOptions.position.lng),
        map: mapInstanceRef.current,
        title: markerOptions.title,
        icon: markerOptions.icon,
        clickable: markerOptions.clickable ?? true,
      });

      markersRef.current.push(marker);
      return marker;
    } catch (error) {
      console.error('❌ 마커 추가 실패:', error);
      return null;
    }
  }, []); // 빈 의존성 배열

  const clearMarkers = useCallback(() => {
    try {
      markersRef.current.forEach((marker, index) => {
        try {
          marker.setMap(null);
        } catch (error) {
          console.warn(`⚠️ 마커 ${index + 1} 제거 중 오류:`, error);
        }
      });
      markersRef.current = [];
      console.log('🧹 모든 마커 제거 완료');
    } catch (error) {
      console.error('❌ 마커 제거 중 오류:', error);
    }
  }, []); // 빈 의존성 배열

  const setCenter = useCallback((lat: number, lng: number) => {
    if (!mapInstanceRef.current) {
      console.warn('⚠️ 지도 인스턴스가 없어서 중심을 설정할 수 없습니다');
      return;
    }

    try {
      mapInstanceRef.current.setCenter(new naver.maps.LatLng(lat, lng));
    } catch (error) {
      console.error('❌ 지도 중심 설정 실패:', error);
    }
  }, []); // 빈 의존성 배열

  const setZoom = useCallback((zoomLevel: number) => {
    if (!mapInstanceRef.current) {
      console.warn('⚠️ 지도 인스턴스가 없어서 줌을 설정할 수 없습니다');
      return;
    }

    try {
      mapInstanceRef.current.setZoom(zoomLevel);
    } catch (error) {
      console.error('❌ 지도 줌 설정 실패:', error);
    }
  }, []); // 빈 의존성 배열

  const getMarkers = useCallback(() => {
    return markersRef.current;
  }, []); // 빈 의존성 배열

  // 지도 초기화 함수
  const initializeMap = useCallback(() => {
    if (!mapRef.current || !window.naver?.maps) {
      console.warn('⚠️ 지도 초기화 조건 불충족');
      return;
    }

    try {
      console.log('🗺️ 네이버 지도 초기화 시작');

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
      console.log('✅ 네이버 지도 초기화 완료');
    } catch (error) {
      console.error('❌ 네이버 지도 초기화 실패:', error);
    }
  }, [
    center.lat,
    center.lng,
    zoom,
    mapTypeId,
    minZoom,
    maxZoom,
    zoomControl,
    mapDataControl,
    scaleControl,
    logoControl,
  ]);

  // 🎯 지도 로드 및 초기화 (한 번만 실행)
  useEffect(() => {
    console.log('🔄 useNaverMap useEffect 실행');

    const handleMapLoad = () => {
      if (window.naver?.maps) {
        initializeMap();
      }
    };

    if (window.naver?.maps) {
      initializeMap();
    } else {
      console.log('⏳ 네이버 맵 API 로드 대기 중...');
      window.addEventListener('naver-maps-loaded', handleMapLoad);
    }

    return () => {
      console.log('🧹 useNaverMap cleanup');
      window.removeEventListener('naver-maps-loaded', handleMapLoad);

      // 컴포넌트 언마운트 시에만 마커 정리
      markersRef.current.forEach((marker) => {
        try {
          marker.setMap(null);
        } catch (error) {
          console.warn('마커 정리 중 오류:', error);
        }
      });
      markersRef.current = [];
    };
  }, [initializeMap]); // clearMarkers 의존성 제거!

  return {
    mapRef,
    mapInstance: mapInstanceRef.current,
    isLoaded,
    addMarker,
    clearMarkers,
    setCenter,
    setZoom,
    getMarkers,
  };
}
