import { useEffect, useRef, useState, useCallback } from 'react';
import type { NaverMapOptions, MarkerOptions } from '@/types/naverMap';

export function useNaverMap(options: NaverMapOptions = {}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<naver.maps.Map | undefined>(undefined);
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isApiReady, setIsApiReady] = useState(false);
  const initializationAttemptedRef = useRef(false); // 초기화 시도 여부
  const retryCountRef = useRef(0); // 재시도 횟수

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

  // 네이버 맵 API 완전 로드 확인용
  const isNaverMapsFullyLoaded = useCallback((): boolean => {
    try {
      const hasWindow = typeof window !== 'undefined';
      const hasNaver = hasWindow && !!window.naver;
      const hasMaps = hasNaver && !!window.naver.maps;
      const hasMap = hasMaps && !!window.naver.maps.Map;
      const hasMarker = hasMaps && !!window.naver.maps.Marker;
      const hasLatLng = hasMaps && !!window.naver.maps.LatLng;
      const hasEvent = hasMaps && !!window.naver.maps.Event;

      const isFullyLoaded =
        hasWindow && hasNaver && hasMaps && hasMap && hasMarker && hasLatLng && hasEvent;

      if (!isFullyLoaded) {
        console.log('네이버 맵 API 로드 상태:', {
          hasWindow,
          hasNaver,
          hasMaps,
          hasMap,
          hasMarker,
          hasLatLng,
          hasEvent,
        });
      }

      return isFullyLoaded;
    } catch (error) {
      console.error('❌ 네이버 맵 API 상태 확인 중 오류:', error);
      return false;
    }
  }, []);

  // 방어적 프로그래밍을 적용한 마커 추가
  const addMarker = useCallback(
    (markerOptions: MarkerOptions) => {
      if (!mapInstanceRef.current) {
        console.warn('지도 인스턴스가 없어서 마커를 추가할 수 없습니다');
        return null;
      }

      if (!isNaverMapsFullyLoaded()) {
        console.warn('네이버 맵 API가 완전히 로드되지 않아서 마커를 추가할 수 없습니다');
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
        console.error('마커 추가 실패:', error);
        return null;
      }
    },
    [isNaverMapsFullyLoaded],
  );

  const clearMarkers = useCallback(() => {
    try {
      markersRef.current.forEach((marker, index) => {
        try {
          if (marker && typeof marker.setMap === 'function') {
            marker.setMap(null);
          }
        } catch (error) {
          console.warn(`마커 ${index + 1} 제거 중 오류:`, error);
        }
      });
      markersRef.current = [];
    } catch (error) {
      console.error('마커 제거 중 오류:', error);
    }
  }, []);

  const setCenter = useCallback(
    (lat: number, lng: number) => {
      if (!mapInstanceRef.current) {
        console.warn('지도 인스턴스가 없어서 중심을 설정할 수 없습니다');
        return;
      }

      if (!isNaverMapsFullyLoaded()) {
        console.warn('네이버 맵 API가 완전히 로드되지 않아서 중심을 설정할 수 없습니다');
        return;
      }

      try {
        mapInstanceRef.current.setCenter(new naver.maps.LatLng(lat, lng));
      } catch (error) {
        console.error('지도 중심 설정 실패:', error);
      }
    },
    [isNaverMapsFullyLoaded],
  );

  const setZoom = useCallback(
    (zoomLevel: number) => {
      if (!mapInstanceRef.current) {
        console.warn('지도 인스턴스가 없어서 줌을 설정할 수 없습니다');
        return;
      }

      if (!isNaverMapsFullyLoaded()) {
        console.warn('네이버 맵 API가 완전히 로드되지 않아서 줌을 설정할 수 없습니다');
        return;
      }

      try {
        mapInstanceRef.current.setZoom(zoomLevel);
      } catch (error) {
        console.error('지도 줌 설정 실패:', error);
      }
    },
    [isNaverMapsFullyLoaded],
  );

  const getMarkers = useCallback(() => {
    return markersRef.current;
  }, []);

  // 지도 초기화 함수
  const initializeMap = useCallback((): boolean => {
    // 이미 초기화 시도했으면 스킵
    if (initializationAttemptedRef.current && mapInstanceRef.current) {
      return true;
    }

    // DOM 요소 확인
    if (!mapRef.current) {
      console.warn('지도 컨테이너 DOM 요소가 없습니다');
      return false;
    }

    // API 로드 상태 확인
    if (!isNaverMapsFullyLoaded()) {
      console.warn('네이버 맵 API가 완전히 로드되지 않았습니다');
      return false;
    }

    try {
      console.log('🗺️ 네이버 지도 초기화 시작');
      initializationAttemptedRef.current = true;

      // 기존 인스턴스 정리
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.destroy?.();
        } catch (e) {
          console.warn('기존 지도 인스턴스 정리 중 오류:', e);
        }
      }

      // 새 지도 인스턴스 생성
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

      // 초기화 완료 확인
      if (mapInstanceRef.current) {
        setIsLoaded(true);
        retryCountRef.current = 0; // 재시도 카운터 리셋

        return true;
      } else {
        return false;
      }
    } catch (error) {
      initializationAttemptedRef.current = false; // 재시도 허용
      return false;
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
    isNaverMapsFullyLoaded,
  ]);

  // 재시도 로직이 포함된 초기화
  const attemptInitialization = useCallback(() => {
    const maxRetries = 10;

    if (retryCountRef.current >= maxRetries) {
      return;
    }

    if (initializeMap()) {
      console.log('지도 초기화 성공');
      return;
    }

    // 재시도
    retryCountRef.current++;
    console.log(`지도 초기화 재시도 ${retryCountRef.current}/${maxRetries}`);

    setTimeout(() => {
      attemptInitialization();
    }, 500 * retryCountRef.current); // 점진적 지연
  }, [initializeMap]);

  // API 상태 모니터링
  useEffect(() => {
    let pollInterval: NodeJS.Timeout | null = null;

    const checkApiStatus = () => {
      const isReady = isNaverMapsFullyLoaded();

      if (isReady !== isApiReady) {
        setIsApiReady(isReady);

        if (isReady) {
          console.log('✅ 네이버 맵 API 준비 완료');
          if (pollInterval) {
            clearInterval(pollInterval);
            pollInterval = null;
          }
          // API 준비되면 초기화 시도
          setTimeout(attemptInitialization, 100);
        }
      }
    };

    // 즉시 확인
    checkApiStatus();

    // API가 준비되지 않았으면 폴링 시작
    if (!isApiReady) {
      pollInterval = setInterval(checkApiStatus, 200);
    }

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [isApiReady, isNaverMapsFullyLoaded, attemptInitialization]);

  // 🎯 메인 초기화 effect
  useEffect(() => {
    console.log('🔄 useNaverMap 메인 useEffect 실행');

    const handleMapLoad = () => {
      console.log('📡 네이버 맵 로드 이벤트 감지');
      setTimeout(attemptInitialization, 100);
    };

    // 이벤트 리스너 등록
    window.addEventListener('naver-maps-loaded', handleMapLoad);

    // 이미 API가 준비되었다면 즉시 초기화
    if (isNaverMapsFullyLoaded()) {
      setTimeout(attemptInitialization, 100);
    }

    return () => {
      console.log('🧹 useNaverMap cleanup');
      window.removeEventListener('naver-maps-loaded', handleMapLoad);

      // 컴포넌트 언마운트 시 정리
      clearMarkers();

      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.destroy?.();
          mapInstanceRef.current = undefined;
        } catch (error) {
          console.warn('지도 인스턴스 정리 중 오류:', error);
        }
      }

      // 플래그 리셋
      initializationAttemptedRef.current = false;
      retryCountRef.current = 0;
      setIsLoaded(false);
      setIsApiReady(false);
    };
  }, [isNaverMapsFullyLoaded, attemptInitialization, clearMarkers]);

  return {
    mapRef,
    mapInstance: mapInstanceRef.current,
    isLoaded,
    isApiReady,
    addMarker,
    clearMarkers,
    setCenter,
    setZoom,
    getMarkers,
  };
}
