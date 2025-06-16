import { useNaverMap } from '@/hooks/useNaverMap';
import { getPopups } from '@/apis/popup/getAllPopups';
import { getNearbyPopups } from '@/apis/popup/getNearbyPopups';
import type { GetPopupListResponse, GetNearbyPopupListResponse } from '@/types/popup';
import MapControls from './MapControls';
import MapLegend from './MapLegend';
import MapPopover from './MapPopover';
import { createMarkerClustering, type MarkerClusteringInstance } from '@/utils/markerClustering';
import { useState, useRef, useEffect, useCallback } from 'react';

interface PopupMapProps {
  className?: string;
  style?: React.CSSProperties;
  radius?: number;
  initialOpenPopupId?: number;
}

interface PopupData {
  id: number;
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
}

export default function PopupMap({
  className = '',
  style = {},
  radius = 5,
  initialOpenPopupId,
}: PopupMapProps) {
  const [allPopups, setAllPopups] = useState<GetPopupListResponse | null>(null);
  const [nearbyPopups, setNearbyPopups] = useState<GetNearbyPopupListResponse | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isShowingNearby, setIsShowingNearby] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);

  // 🎯 팝오버 상태만 별도 관리 (마커 재생성과 완전 분리)
  const [selectedPopup, setSelectedPopup] = useState<PopupData | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const { mapRef, isLoaded, mapInstance, addMarker, setCenter, setZoom } = useNaverMap({
    center: { lat: 36.2253017, lng: 127.6460516 },
    zoom: 7,
  });

  const markersRef = useRef<naver.maps.Marker[]>([]);
  const markerClusterRef = useRef<MarkerClusteringInstance | null>(null);
  const currentLocationMarkerRef = useRef<naver.maps.Marker | null>(null);
  const mapEventListenersRef = useRef<naver.maps.MapEventListener[]>([]);

  // 팝오버 열기/닫기 함수 (마커와 독립적)
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
      }
    };
    fetchAllPopups();
  }, []);

  // 현재 위치 찾기 함수
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

  // 🎯 마커 생성 및 초기화 (최적화된 의존성)
  useEffect(() => {
    console.log('🗺️ 마커 초기화 useEffect 실행');

    if (!isLoaded || !mapInstance) {
      console.log('⏸️ 조건 불충족으로 초기화 건너뜀');
      return;
    }

    // 기존 정리
    console.log('🧹 기존 마커들 정리');

    // 직접 마커 정리 (clearMarkers 의존성 없이)
    markersRef.current.forEach((marker, index) => {
      try {
        marker.setMap(null);
      } catch (e) {
        console.warn(`마커 ${index + 1} 제거 중 오류:`, e);
      }
    });
    markersRef.current = [];

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
        markerClusterRef.current.setMap(null);
      } catch (e) {
        console.warn('클러스터 제거 중 오류:', e);
      }
      markerClusterRef.current = null;
    }

    // 현재 위치 마커 정리
    if (currentLocationMarkerRef.current) {
      try {
        currentLocationMarkerRef.current.setMap(null);
      } catch (e) {
        console.warn('현재 위치 마커 제거 중 오류:', e);
      }
      currentLocationMarkerRef.current = null;
    }

    // 표시할 데이터 결정
    const popupsToShow =
      isShowingNearby && nearbyPopups?.data ? nearbyPopups.data : allPopups?.data || [];

    console.log(`🎯 표시할 팝업: ${isShowingNearby ? '근처' : '전체'} ${popupsToShow.length}개`);

    // 현재 위치 마커 추가
    if (currentLocation) {
      try {
        currentLocationMarkerRef.current = addMarker({
          position: { lat: currentLocation.lat, lng: currentLocation.lng },
          title: '현재 위치',
          icon: {
            content: `
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <circle cx="12" cy="12" r="10" fill="#FF6B6B" stroke="white" stroke-width="3"/>
                <circle cx="12" cy="12" r="4" fill="white"/>
                <circle cx="12" cy="12" r="1" fill="#FF6B6B"/>
              </svg>
            `,
            anchor: new naver.maps.Point(12, 12),
          },
        });
      } catch (e) {
        console.error('현재 위치 마커 생성 실패:', e);
      }
    }

    // 팝업 마커들 생성
    popupsToShow.forEach((popup, index) => {
      try {
        const marker = addMarker({
          position: {
            lat: popup.latitude,
            lng: popup.longitude,
          },
          title: popup.name,
          icon: {
            content: `
              <div style="
                width: 24px;
                height: 24px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: 2px solid white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 10px;
                box-shadow: 0 2px 6px rgba(102,126,234,0.3);
                cursor: pointer;
                user-select: none;
                transition: transform 0.2s ease, box-shadow 0.2s ease;
              "
              onmouseover="
                this.style.transform='scale(1.15)';
                this.style.boxShadow='0 4px 12px rgba(102,126,234,0.5)';
              "
              onmouseout="
                this.style.transform='scale(1)';
                this.style.boxShadow='0 2px 6px rgba(102,126,234,0.3)';
              "
              >${isShowingNearby ? index + 1 : '📍'}</div>
            `,
            size: new naver.maps.Size(24, 24),
            anchor: new naver.maps.Point(12, 12),
          },
        });

        if (!marker) return;

        markersRef.current.push(marker);

        // 마커 클릭 이벤트
        const clickListener = naver.maps.Event.addListener(marker, 'click', (e) => {
          if (e.domEvent) {
            e.domEvent.stopPropagation();
          }
          openPopover(popup);
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
        console.error(`마커 ${index + 1} 생성 중 오류:`, e);
      }
    });

    // 클러스터링 적용 (전체 보기일 때만)
    if (!isShowingNearby && markersRef.current.length > 0 && mapInstance) {
      try {
        markerClusterRef.current = createMarkerClustering(mapInstance, markersRef.current);
      } catch (e) {
        console.error('클러스터링 적용 실패:', e);
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
          openPopover(targetPopup);
        }
      }, 500);
    }

    console.log(`🎉 총 ${markersRef.current.length}개 마커 생성 완료`);

    return () => {
      // Cleanup
      if (markerClusterRef.current) {
        try {
          markerClusterRef.current.setMap(null);
        } catch (e) {
          console.warn('클러스터 cleanup 중 오류:', e);
        }
      }
      mapEventListenersRef.current.forEach((listener) => {
        try {
          naver.maps.Event.removeListener(listener);
        } catch (e) {
          console.warn('이벤트 리스너 cleanup 중 오류:', e);
        }
      });
      mapEventListenersRef.current = [];
    };
  }, [
    // 🚨 최적화된 의존성 (clearMarkers 제거!)
    isLoaded,
    mapInstance,
    allPopups,
    nearbyPopups,
    currentLocation,
    isShowingNearby,
    addMarker, // 이것도 빈 의존성 배열이므로 안전
    openPopover,
    closePopover,
    initialOpenPopupId,
    mapRef,
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

  const displayData =
    isShowingNearby && nearbyPopups?.data ? nearbyPopups.data : allPopups?.data || [];

  return (
    <div className={`relative ${className}`} style={{ width: '100%', height: '400px', ...style }}>
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

      {/* 🎯 브라우저 중앙 고정 팝오버 */}
      {selectedPopup && (
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
                pointerEvents: 'auto',
              }}
            />
          </MapPopover>
        </div>
      )}

      {/* 디버깅 정보 */}
      <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
        <div>마커: {markersRef.current.length}</div>
        <div>팝오버: {selectedPopup ? selectedPopup.name : '없음'}</div>
      </div>
    </div>
  );
}
