import { useNaverMap } from '@/hooks/useNaverMap';
import { getNearbyCoupons } from '@/apis/coupon/getNearbyCoupons';
import type { PlaceInfo } from '@/types/brand';
import MapControls from '@/pages/hotplace/StoreMap/MapControls';
import MapLegend from '@/pages/hotplace/StoreMap/MapLegend';
import MapPopover from '@/pages/hotplace/StoreMap/MapPopover';
import { createMarkerClustering, type MarkerClusteringInstance } from '@/utils/markerClustering';
import { useState, useRef, useEffect, useCallback } from 'react';

interface StoreMapProps {
  className?: string;
  style?: React.CSSProperties;
  allBrandIds: number[]; // 전체 브랜드 아이디 목록
  selectedIds: number[]; // 선택된 브랜드 아이디 목록
}

interface StoreData {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export default function StoreMap({
  className = '',
  style = {},
  allBrandIds,
  selectedIds,
}: StoreMapProps) {
  // 선택 브랜드 아이디 상태 (선택 보기)
  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>([]);
  // 구독한 모든 아이디 상태 (전체 보기)
  const [subscribedBrandIds, setSubscribedBrandIds] = useState<number[]>([]);
  // 전체보기 모드 여부 (false면 선택보기)
  const [isShowingSelected, setIsShowingSelected] = useState(false);

  const [nearbyStores, setNearbyStores] = useState<StoreData[]>([]);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number }>({
    lat: 37.503325874722,
    lng: 127.04403462366,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const [selectedStore, setSelectedStore] = useState<StoreData | null>();
  const [popoverOpen, setPopoverOpen] = useState(false);

  const { mapRef, isLoaded, isApiReady, mapInstance, addMarker, setCenter, setZoom } = useNaverMap({
    center: { lat: 37.503325874722, lng: 127.04403462366 },
    zoom: 7,
  });

  const markersRef = useRef<naver.maps.Marker[]>([]);
  const markerClusterRef = useRef<MarkerClusteringInstance | null>(null);
  const currentLocationMarkerRef = useRef<naver.maps.Marker | null>(null);
  const mapEventListenersRef = useRef<naver.maps.MapEventListener[]>([]);
  const markersInitializedRef = useRef(false);

  useEffect(() => {
    setSubscribedBrandIds(allBrandIds);
  }, [allBrandIds]);

  useEffect(() => {
    setSelectedBrandIds(selectedIds);
  }, [selectedBrandIds]);

  // 팝오버 열기/닫기
  const openPopover = useCallback((store: StoreData) => {
    setSelectedStore(store);
    setPopoverOpen(true);
  }, []);

  const closePopover = useCallback(() => {
    setSelectedStore(null);
    setPopoverOpen(false);
  }, []);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!currentLocation) {
          setError('현재 위치 정보가 없습니다.');
          setLoading(false);
          return;
        }

        const brandIdsToQuery = isShowingSelected ? selectedBrandIds : subscribedBrandIds;

        if (brandIdsToQuery.length === 0) {
          setNearbyStores([]);
          setLoading(false);
          return;
        }

        const response = await getNearbyCoupons(
          currentLocation.lat,
          currentLocation.lng,
          brandIdsToQuery,
        );

        if (Array.isArray(response)) {
          const stores: StoreData[] = response.map((place: PlaceInfo) => ({
            id: place.id,
            name: place.name,
            address: place.address,
            latitude: place.lat,
            longitude: place.lng,
          }));
          setNearbyStores(stores);
        } else {
          setError('데이터 형식이 올바르지 않습니다.');
        }
      } catch {
        setError('매장 조회 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, [currentLocation, isShowingSelected, selectedBrandIds, subscribedBrandIds]);

  // 현재 위치 찾기
  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert('이 브라우저는 위치 서비스를 지원하지 않습니다.');
      setError('이 브라우저는 위치 서비스를 지원하지 않습니다.');
      return;
    }
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setError(null); // 성공 시 에러 초기화
        setLoadingLocation(false);
      },
      (error) => {
        console.error('위치 조회 실패:', error);
        alert('위치 권한이 없거나 위치를 가져올 수 없습니다.');
        setError('위치 권한이 없거나 위치를 가져올 수 없습니다.');
        setLoadingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 },
    );
  }, []);

  // 전체보기 버튼 클릭
  const onShowAllStores = useCallback(() => {
    setIsShowingSelected(false);
    setSelectedBrandIds([]);
    closePopover();
    setCenter(36.2253017, 127.6460516);
    setZoom(7);
  }, [closePopover, setCenter, setZoom]);

  // 선택보기 버튼 클릭
  const onShowSelectedStores = useCallback(() => {
    if (selectedBrandIds.length === 0) {
      alert('브랜드를 하나 이상 선택해주세요.');
      return;
    }
    setIsShowingSelected(true);
    closePopover();
    setCenter(currentLocation.lat, currentLocation.lng);
    setZoom(14);
  }, [
    selectedBrandIds,
    closePopover,
    currentLocation.lat,
    currentLocation.lng,
    setCenter,
    setZoom,
  ]);

  // 마커 정리 함수
  const safeCleanupMarkers = useCallback(() => {
    markersRef.current.forEach((marker, index) => {
      try {
        if (marker && typeof marker.setMap === 'function') {
          marker.setMap(null);
        }
      } catch (e) {
        console.warn(`마커 ${index + 1} 제거 중 오류:`, e);
      }
    });
    markersRef.current = [];

    // 현재 위치 마커 정리
    if (currentLocationMarkerRef.current) {
      try {
        if (typeof currentLocationMarkerRef.current.setMap === 'function') {
          currentLocationMarkerRef.current.setMap(null);
        }
      } catch (e) {
        console.warn('현재 위치 마커 제거 중 오류:', e);
      }
      currentLocationMarkerRef.current = null;
    }

    // 이벤트 리스너 정리
    mapEventListenersRef.current.forEach((listener) => {
      try {
        naver.maps.Event.removeListener(listener);
      } catch (e) {
        console.warn('이벤트 리스너 제거 중 오류:', e);
      }
    });
    mapEventListenersRef.current = [];

    // 클러스터 정리
    if (markerClusterRef.current) {
      try {
        if (typeof markerClusterRef.current.setMap === 'function') {
          markerClusterRef.current.setMap(null);
        }
      } catch (e) {
        console.warn('클러스터 제거 중 오류:', e);
      }
      markerClusterRef.current = null;
    }
  }, []);

  // 마커 생성 및 초기화
  useEffect(() => {
    if (!isLoaded || !isApiReady || !mapInstance) {
      markersInitializedRef.current = false;
      return;
    }

    if (markersInitializedRef.current && markersRef.current.length === nearbyStores.length) return;

    safeCleanupMarkers();

    try {
      // 현재 위치 마커 추가
      if (currentLocation) {
        const locationMarker = addMarker({
          position: { lat: currentLocation.lat, lng: currentLocation.lng },
          title: '현재 위치',
          icon: {
            content: `
              <div style="
                width: 20px;
                height: 20px;
                background: var(--color-brand-red);
                border: 3px solid white;
                border-radius: 50%;
                box-shadow: 0 3px 10px rgba(221, 70, 64, 0.4);
                position: relative;
              ">
                <div style="
                  width: 6px;
                  height: 6px;
                  background: white;
                  border-radius: 50%;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                "></div>
              </div>
            `,
            anchor: new naver.maps.Point(10, 10),
          },
        });
        if (locationMarker) currentLocationMarkerRef.current = locationMarker;
      }

      // 매장 마커 생성
      nearbyStores.forEach((store, idx) => {
        const marker = addMarker({
          position: { lat: store.latitude, lng: store.longitude },
          title: store.name,
          icon: {
            content: `
              <div style="
                width: 28px;
                height: 28px;
                background: linear-gradient(135deg, var(--color-brand-darkblue) 0%, var(--color-brand-red) 100%);
                color: white;
                border: 3px solid white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 11px;
                box-shadow: 0 4px 12px rgba(37, 57, 75, 0.3);
                cursor: pointer;
                user-select: none;
                transition: all 0.2s ease;
              "
              onmouseover="
                this.style.transform='scale(1.2)';
                this.style.boxShadow='0 6px 20px rgba(37, 57, 75, 0.5)';
                this.style.zIndex='1000';
              "
              onmouseout="
                this.style.transform='scale(1)';
                this.style.boxShadow='0 4px 12px rgba(37, 57, 75, 0.3)';
                this.style.zIndex='100';
              "
              >${idx + 1}</div>
            `,
            size: new naver.maps.Size(28, 28),
            anchor: new naver.maps.Point(14, 14),
          },
        });
        if (marker) markersRef.current.push(marker);

        // 마커 클릭 이벤트
        const clickListener = naver.maps.Event.addListener(marker, 'click', (e) => {
          e.domEvent?.stopPropagation();
          openPopover(store);
        });
        mapEventListenersRef.current.push(clickListener);

        // 마커 호버 이벤트
        const mouseoverListener = naver.maps.Event.addListener(marker, 'mouseover', () => {
          if (mapRef.current) mapRef.current.style.cursor = 'pointer';
        });
        const mouseoutListener = naver.maps.Event.addListener(marker, 'mouseout', () => {
          if (mapRef.current) mapRef.current.style.cursor = '';
        });
        mapEventListenersRef.current.push(mouseoverListener, mouseoutListener);
      });

      // 클러스터링 적용
      if (markersRef.current.length > 0 && mapInstance) {
        markerClusterRef.current = createMarkerClustering(mapInstance, markersRef.current);
      }

      // 지도 클릭 시 팝오버 닫기
      const mapClickListener = naver.maps.Event.addListener(mapInstance, 'click', () => {
        closePopover();
      });
      mapEventListenersRef.current.push(mapClickListener);

      markersInitializedRef.current = true;
    } catch {
      markersInitializedRef.current = false;
    }
  }, [
    isLoaded,
    isApiReady,
    mapInstance,
    nearbyStores,
    currentLocation,
    addMarker,
    openPopover,
    closePopover,
    mapRef,
    safeCleanupMarkers,
  ]);

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ width: '100%', height: '400px', ...style }}
      >
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          지도를 불러오는 중...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ width: '100%', height: '400px', ...style }}
      >
        <div className="text-center">
          <div className="text-red-500 text-sm mb-2">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="text-xs text-blue-500 hover:underline"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  if (!isApiReady) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ width: '100%', height: '400px', ...style }}
      >
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          지도 API 연결 중...
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width: '100%', height: '400px', ...style }}>
      {/* 지도 영역 */}
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

      {/* 브랜드 선택 토글 및 위치 찾기 버튼 */}
      <MapControls
        isShowingSelected={isShowingSelected}
        loadingLocation={loadingLocation}
        onShowSelectedStores={onShowSelectedStores}
        onShowAllStores={onShowAllStores}
        onGetCurrentLocation={getCurrentLocation}
      />

      {/* 범례 */}
      <MapLegend
        isShowingSelected={isShowingSelected}
        popupCount={nearbyStores.length}
        hasCurrentLocation={!!currentLocation}
      />

      {/* 팝오버 */}
      {selectedStore && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        >
          <MapPopover
            store={selectedStore}
            showIndex={false}
            open={popoverOpen}
            onOpenChange={(open: boolean) => {
              if (!open) closePopover();
            }}
          >
            <div
              style={{
                width: '1px',
                height: '1px',
                pointerEvents: 'auto',
              }}
            />
          </MapPopover>
        </div>
      )}
    </div>
  );
}
