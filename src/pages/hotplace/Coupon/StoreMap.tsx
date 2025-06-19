import { useNaverMap } from '@/hooks/useNaverMap';
import { getNearbyCoupons } from '@/apis/coupon/getNearbyCoupons';
import type { PlaceInfo } from '@/types/brand';
import StoreControls from '@/pages/hotplace/Coupon/StoreControls';
import StoreLegend from '@/pages/hotplace/Coupon/StoreLegend';
import StorePopover from '@/pages/hotplace/Coupon/StorePopover';
import { createMarkerClustering, type MarkerClusteringInstance } from '@/utils/markerClustering';
import { useState, useRef, useEffect, useCallback } from 'react';

interface StoreMapProps {
  className?: string;
  style?: React.CSSProperties;
  brandIds: number[]; // 근처 매장 조회시 필요한 브랜드 ID 리스트
}

interface StoreData {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

export default function StoreMap({ className = '', style = {}, brandIds }: StoreMapProps) {
  const [nearbyStores, setNearbyStores] = useState<PlaceInfo[]>([]);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number }>({
    lat: 36.2253017,
    lng: 127.6460516,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAllSelected, setIsAllSelected] = useState(true);
  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>(brandIds);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const [selectedStore, setSelectedStore] = useState<PlaceInfo | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const { mapRef, isLoaded, isApiReady, mapInstance, addMarker, setCenter, setZoom } = useNaverMap({
    center: { lat: 36.2253017, lng: 127.6460516 },
    zoom: 7,
  });

  const markersRef = useRef<naver.maps.Marker[]>([]);
  const markerClusterRef = useRef<MarkerClusteringInstance | null>(null);
  const currentLocationMarkerRef = useRef<naver.maps.Marker | null>(null);
  const mapEventListenersRef = useRef<naver.maps.MapEventListener[]>([]);
  const markersInitializedRef = useRef(false);

  const openPopover = useCallback((store: PlaceInfo) => {
    console.log(`🎯 팝오버 열기: ${store.name}`);
    setSelectedStore(store);
    setPopoverOpen(true);
  }, []);

  const closePopover = useCallback(() => {
    console.log('🔒 팝오버 닫기');
    setSelectedStore(null);
    setPopoverOpen(false);
  }, []);

  useEffect(() => {
    const fetchAllStores = async () => {
      try {
        setLoading(true);

        if (!currentLocation) {
          setError('현재 위치 정보가 없습니다.');
          setLoading(false);
          return;
        }

        const response = await getNearbyCoupons(currentLocation.lat, currentLocation.lng, brandIds);

        // response가 배열인지, 그리고 최소한 undefined/null 아님 검사
        if (Array.isArray(response) && response.length >= 0) {
          setNearbyStores(response);
          setError(null); // 이전 에러 클리어
        } else {
          setError('데이터 형식이 올바르지 않습니다.');
        }
      } catch (e) {
        setError('네트워크 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllStores();
  }, [currentLocation, selectedBrandIds]);

  // 사용 중인 전체 브랜드로 전환
  const toggleSelectAll = useCallback(() => {
    if (isAllSelected) {
      setSelectedBrandIds([]); // 전체 선택 해제 → 빈 배열
    } else {
      setSelectedBrandIds(brandIds); // 전체 선택
    }
    setIsAllSelected(!isAllSelected);
  }, [isAllSelected, brandIds]);

  const toggleBrandSelection = useCallback(
    (brandId: number) => {
      setSelectedBrandIds((prev) => {
        if (prev.includes(brandId)) {
          const filtered = prev.filter((id) => id !== brandId);
          if (filtered.length === 0) setIsAllSelected(false);
          return filtered;
        } else {
          const newSelected = [...prev, brandId];
          if (newSelected.length === brandIds.length) setIsAllSelected(true);
          return newSelected;
        }
      });
    },
    [brandIds],
  );

  // 현재 위치 찾기 및 근처 매장 조회
  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert('이 브라우저는 위치 서비스를 지원하지 않습니다.');
      return;
    }

    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });

        try {
          const nearbyResponse = await getNearbyCoupons(latitude, longitude, brandIds);
          if (Array.isArray(nearbyResponse)) {
            setNearbyStores(nearbyResponse);
            setCenter(latitude, longitude);
            setZoom(14);
            console.log(`주변 매장 조회: ${nearbyResponse.length}개`);
          } else {
            setNearbyStores([]);
            console.log('매장 없음');
          }
        } catch (e) {
          console.error('매장 조회 실패:', e);
          setError('매장 조회 중 오류가 발생했습니다.');
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        console.error('위치 조회 실패:', error);
        alert('위치를 가져올 수 없습니다. 위치 서비스를 허용해주세요.');
        setLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  }, [brandIds, setCenter, setZoom]);

  // 전체 매장 보기 (초기 상태로 복귀)
  const showAllStores = useCallback(() => {
    setNearbyStores([]);
    setCurrentLocation({ lat: 36.2253017, lng: 127.6460516 });
    closePopover();
    setCenter(36.2253017, 127.6460516);
    setZoom(7);
  }, [setCenter, setZoom, closePopover]);

  // 마커 정리
  const safeCleanupMarkers = useCallback(() => {
    markersRef.current.forEach((marker, idx) => {
      try {
        if (marker?.setMap) marker.setMap(null);
      } catch (e) {
        console.warn(`마커 ${idx + 1} 제거 중 오류:`, e);
      }
    });
    markersRef.current = [];

    if (currentLocationMarkerRef.current?.setMap) {
      try {
        currentLocationMarkerRef.current.setMap(null);
      } catch (e) {
        console.warn('현재 위치 마커 제거 중 오류:', e);
      }
      currentLocationMarkerRef.current = null;
    }

    mapEventListenersRef.current.forEach((listener) => {
      try {
        naver.maps.Event.removeListener(listener);
      } catch (e) {
        console.warn('이벤트 리스너 제거 중 오류:', e);
      }
    });
    mapEventListenersRef.current = [];

    if (markerClusterRef.current?.setMap) {
      try {
        markerClusterRef.current.setMap(null);
      } catch (e) {
        console.warn('클러스터 제거 중 오류:', e);
      }
      markerClusterRef.current = null;
    }
  }, []);

  // 마커 생성 및 초기화
  useEffect(() => {
    console.log('🗺️ 마커 초기화 useEffect 실행');
    console.log('🔍 상태 체크:', {
      isLoaded,
      isApiReady,
      mapInstance: !!mapInstance,
      hasData: nearbyStores.length > 0,
    });

    if (!isLoaded || !isApiReady || !mapInstance) {
      markersInitializedRef.current = false;
      return;
    }

    if (nearbyStores.length === 0) return;

    if (markersInitializedRef.current && markersRef.current.length === nearbyStores.length) return;

    safeCleanupMarkers();

    try {
      // 현재 위치 마커 표시
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
      let successCount = 0;
      nearbyStores.forEach((store, idx) => {
        try {
          const marker = addMarker({
            position: { lat: store.lat, lng: store.lng },
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
          if (!marker) return;
          markersRef.current.push(marker);
          successCount++;

          // 마커 클릭 이벤트
          const clickListener = naver.maps.Event.addListener(marker, 'click', (e) => {
            e.domEvent?.stopPropagation();
            console.log(`🎯 마커 클릭: ${store.name}`);
            openPopover(store);
          });
          mapEventListenersRef.current.push(clickListener);

          // 호버 이벤트
          const mouseoverListener = naver.maps.Event.addListener(marker, 'mouseover', () => {
            if (mapRef.current) mapRef.current.style.cursor = 'pointer';
          });
          const mouseoutListener = naver.maps.Event.addListener(marker, 'mouseout', () => {
            if (mapRef.current) mapRef.current.style.cursor = '';
          });
          mapEventListenersRef.current.push(mouseoverListener, mouseoutListener);
        } catch (e) {
          console.error(`❌ 마커 ${idx + 1} 생성 중 오류:`, e);
        }
      });

      console.log(`✅ ${successCount}/${nearbyStores.length}개 마커 생성 완료`);

      // 클러스터링 적용
      if (markersRef.current.length > 0 && mapInstance) {
        try {
          markerClusterRef.current = createMarkerClustering(mapInstance, markersRef.current);
          console.log('✅ 클러스터링 적용 완료');
        } catch (e) {
          console.error('❌ 클러스터링 적용 실패:', e);
        }
      }

      // 지도 클릭 시 팝오버 닫기
      const mapClickListener = naver.maps.Event.addListener(mapInstance, 'click', () => {
        closePopover();
      });
      mapEventListenersRef.current.push(mapClickListener);

      markersInitializedRef.current = true;
      console.log('🎉 마커 초기화 완료');
    } catch (error) {
      console.error('❌ 마커 초기화 중 치명적 오류:', error);
      markersInitializedRef.current = false;
    }

    return () => {
      safeCleanupMarkers();
      markersInitializedRef.current = false;
    };
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
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

      <StoreControls
        loadingLocation={loadingLocation}
        onGetCurrentLocation={getCurrentLocation}
        onShowAllPopups={showAllStores}
      />

      <StoreLegend popupCount={nearbyStores.length} hasCurrentLocation={!!currentLocation} />

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
          <StorePopover
            store={selectedStore}
            showIndex={false}
            open={popoverOpen}
            onOpenChange={(open) => {
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
          </StorePopover>
        </div>
      )}
    </div>
  );
}
