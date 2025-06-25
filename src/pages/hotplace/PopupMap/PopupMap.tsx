import { useNaverMap } from '@/hooks/useNaverMap';
import { getPopups } from '@/apis/popup/getAllPopups';
import { getNearbyPopups } from '@/apis/popup/getNearbyPopups';
import type { GetPopupListResponse, GetNearbyPopupListResponse } from '@/types/popup';
import MapControls from './MapControls';
import MapLegend from './MapLegend';
import MapPopover from './MapPopover';
import { createMarkerClustering, type MarkerClusteringInstance } from '@/utils/markerClustering';
import { useState, useRef, useEffect, useCallback } from 'react';
import LoadingMooner from '@/pages/common/LoadingMooner';

interface PopupMapProps {
  className?: string;
  style?: React.CSSProperties;
  radius?: number;
  initialOpenPopupId?: number;
  onLoadingChange?: (loading: boolean) => void;
}

interface PopupData {
  id: number;
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  image_url: string;
}

const MappinSvg = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24" height="24"
  viewBox="0 0 24 24"
  fill = #EC4899
  stroke="white"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/>
  <circle cx="12" cy="10" r="3"/>
</svg>
`;

export default function PopupMap({
  className = '',
  style = {},
  radius = 5,
  initialOpenPopupId,
  onLoadingChange,
}: PopupMapProps) {
  const [allPopups, setAllPopups] = useState<GetPopupListResponse | null>(null);
  const [nearbyPopups, setNearbyPopups] = useState<GetNearbyPopupListResponse | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isShowingNearby, setIsShowingNearby] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);

  // 팝오버 상태 (마커와 완전 분리)
  const [selectedPopup, setSelectedPopup] = useState<PopupData | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const { mapRef, isLoaded, isApiReady, mapInstance, addMarker, setCenter, setZoom } = useNaverMap({
    center: { lat: 36.2253017, lng: 127.6460516 },
    zoom: 7,
  });

  const markersRef = useRef<naver.maps.Marker[]>([]);
  const markerClusterRef = useRef<MarkerClusteringInstance | null>(null);
  const currentLocationMarkerRef = useRef<naver.maps.Marker | null>(null);
  const mapEventListenersRef = useRef<naver.maps.MapEventListener[]>([]);
  const markersInitializedRef = useRef(false); // 마커 초기화 상태

  // 팝오버 제어 함수
  const openPopover = useCallback((popup: PopupData) => {
    console.log(`🎯 팝오버 열기: ${popup.name}`);
    setSelectedPopup(popup);
    setPopoverOpen(true);
  }, []);

  const closePopover = useCallback(() => {
    console.log('🔒 팝오버 닫기');
    setSelectedPopup(null);
    setPopoverOpen(false);
  }, []);

  // 전체 팝업 데이터 로드
  useEffect(() => {
    onLoadingChange?.(true);
    const fetchAllPopups = async () => {
      try {
        setLoading(true);
        const response = await getPopups();
        if (response.status === 200 && response.data) {
          setAllPopups(response);
        } else {
          setError('데이터를 불러오지 못했습니다.');
        }
      } catch (e) {
        setError('네트워크 오류가 발생했습니다.');
      } finally {
        setLoading(false);
        onLoadingChange?.(false);
      }
    };
    fetchAllPopups();
  }, []);

  // 현재 위치 찾기
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
          const nearbyResponse = await getNearbyPopups(latitude, longitude, radius);
          if (nearbyResponse.status === 200 && nearbyResponse.data) {
            setNearbyPopups(nearbyResponse);
            setIsShowingNearby(true);
            setCenter(latitude, longitude);
            setZoom(14);
            console.log(`근처 팝업 조회: ${nearbyResponse.data.length}개`);
          }
        } catch (e) {
          console.error('근처 팝업 조회 실패:', e);
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
  }, [radius, setCenter, setZoom]);

  // 전체 보기로 돌아가기
  const showAllPopups = useCallback(() => {
    setIsShowingNearby(false);
    setNearbyPopups(null);
    setCurrentLocation(null);
    closePopover();
    setCenter(36.2253017, 127.6460516);
    setZoom(7);
  }, [setCenter, setZoom, closePopover]);

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
    console.log('🗺️ 마커 초기화 useEffect 실행');
    console.log('🔍 상태 체크:', {
      isLoaded,
      isApiReady,
      mapInstance: !!mapInstance,
      hasData: !!(allPopups?.data || nearbyPopups?.data),
    });

    // 필수 조건 확인
    if (!isLoaded || !isApiReady || !mapInstance) {
      console.log('⏸️ 필수 조건 불충족으로 초기화 건너뜀');
      markersInitializedRef.current = false;
      return;
    }

    // 데이터 확인
    const popupsToShow =
      isShowingNearby && nearbyPopups?.data ? nearbyPopups.data : allPopups?.data || [];

    if (popupsToShow.length === 0) {
      return;
    }

    // 이미 초기화되었고 같은 데이터라면 스킵
    if (markersInitializedRef.current && markersRef.current.length === popupsToShow.length) {
      return;
    }

    console.log(
      `🎯 ${isShowingNearby ? '근처' : '전체'} 팝업 ${popupsToShow.length}개 초기화 시작`,
    );

    // 기존 정리
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

        if (locationMarker) {
          currentLocationMarkerRef.current = locationMarker;
        }
      }

      // 팝업 마커들 생성
      let successCount = 0;
      popupsToShow.forEach((popup, index) => {
        try {
          const marker = addMarker({
            position: { lat: popup.latitude, lng: popup.longitude },
            title: popup.name,
            icon: {
              content: `
                <div style="
                  width: 32px; height: 32px;
                  display: flex; align-items: center; justify-content: center;
                  border-radius: 50%;
                ">
                    ${MappinSvg}
                  </div>
                `,
              anchor: new naver.maps.Point(16, 16),
              size: new naver.maps.Size(32, 32),
            },
          });
          if (!marker) {
            return;
          }

          markersRef.current.push(marker);
          successCount++;

          // 마커 클릭 이벤트
          const clickListener = naver.maps.Event.addListener(marker, 'click', (e) => {
            try {
              if (e.domEvent) {
                e.domEvent.stopPropagation();
              }
              console.log(`🎯 마커 클릭: ${popup.name}`);
              openPopover(popup);
            } catch (error) {
              console.error('마커 클릭 이벤트 처리 중 오류:', error);
            }
          });
          mapEventListenersRef.current.push(clickListener);

          // 호버 효과
          const mouseoverListener = naver.maps.Event.addListener(marker, 'mouseover', () => {
            if (mapRef.current) {
              mapRef.current.style.cursor = 'pointer';
            }
          });
          const mouseoutListener = naver.maps.Event.addListener(marker, 'mouseout', () => {
            if (mapRef.current) {
              mapRef.current.style.cursor = '';
            }
          });
          mapEventListenersRef.current.push(mouseoverListener, mouseoutListener);
        } catch (e) {
          console.error(`❌ 마커 ${index + 1} 생성 중 오류:`, e);
        }
      });

      console.log(`✅ ${successCount}/${popupsToShow.length}개 마커 생성 완료`);

      // 클러스터링 적용 (전체 보기일 때만)
      if (!isShowingNearby && markersRef.current.length > 0 && mapInstance) {
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

      // 초기 팝업 열기
      if (initialOpenPopupId !== undefined && popupsToShow.length > 0) {
        setTimeout(() => {
          const targetPopup = popupsToShow.find((p) => p.id === initialOpenPopupId);
          if (targetPopup) {
            console.log(`🎯 초기 팝업 열기: ${targetPopup.name}`);
            openPopover(targetPopup);
          }
        }, 1000);
      }

      markersInitializedRef.current = true;
      console.log('🎉 마커 초기화 완료');
    } catch (error) {
      console.error('❌ 마커 초기화 중 치명적 오류:', error);
      markersInitializedRef.current = false;
    }

    return () => {
      // Cleanup
      safeCleanupMarkers();
      markersInitializedRef.current = false;
    };
  }, [
    // 핵심 의존성만 포함 (팝오버 상태 제외)
    isLoaded,
    isApiReady,
    mapInstance,
    allPopups,
    nearbyPopups,
    currentLocation,
    isShowingNearby,
    addMarker,
    openPopover,
    closePopover,
    initialOpenPopupId,
    mapRef,
    safeCleanupMarkers,
  ]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <LoadingMooner />
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

  // API 로딩 상태
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

  const displayData =
    isShowingNearby && nearbyPopups?.data ? nearbyPopups.data : allPopups?.data || [];

  return (
    <div className={`relative ${className}`} style={{ width: '100%', height: '500px', ...style }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

      <MapControls
        isShowingNearby={isShowingNearby}
        loadingLocation={loadingLocation}
        onGetCurrentLocation={getCurrentLocation}
        onShowAllPopups={showAllPopups}
      />

      <MapLegend
        isShowingNearby={isShowingNearby}
        popupCount={displayData.length}
        hasCurrentLocation={!!currentLocation}
      />

      {/* 브라우저 중앙 고정 팝오버 */}
      {selectedPopup && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
          }}
        >
          <MapPopover
            popup={selectedPopup}
            index={
              isShowingNearby ? displayData.findIndex((p) => p.id === selectedPopup.id) : undefined
            }
            showIndex={isShowingNearby}
            open={popoverOpen}
            onOpenChange={(open) => {
              if (!open) {
                closePopover();
              }
            }}
          >
            <div
              style={{
                width: '1px',
                height: '1px',
              }}
            />
          </MapPopover>
        </div>
      )}
    </div>
  );
}
