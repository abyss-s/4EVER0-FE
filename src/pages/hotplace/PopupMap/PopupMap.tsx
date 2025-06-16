import React, { useEffect, useState, useRef } from 'react';
import { useNaverMap } from '@/hooks/useNaverMap';
import { getPopups } from '@/apis/popup/getAllPopups';
import { getNearbyPopups } from '@/apis/popup/getNearbyPopups';
import type { GetPopupListResponse, GetNearbyPopupListResponse } from '@/types/popup';

// MarkerClustering 타입 정의
interface MarkerClusteringOptions {
  minClusterSize?: number;
  maxZoom?: number;
  map: naver.maps.Map;
  markers: naver.maps.Marker[];
  disableClickZoom?: boolean;
  gridSize?: number;
  icons?: Array<{
    content: string;
    size: naver.maps.Size;
    anchor: naver.maps.Point;
  }>;
  indexGenerator?: number[];
  stylingFunction?: (
    clusterMarker: { getElement: () => HTMLElement | null },
    count: number,
  ) => void;
}

interface MarkerClusteringInstance {
  setMap: (map: naver.maps.Map | null) => void;
}

declare global {
  interface Window {
    MarkerClustering?: new (options: MarkerClusteringOptions) => MarkerClusteringInstance;
  }
}

interface PopupMapProps {
  className?: string;
  style?: React.CSSProperties;
  radius?: number;
  initialOpenPopupId?: number;
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

  const { mapRef, isLoaded, mapInstance, addMarker, clearMarkers, setCenter, setZoom } =
    useNaverMap({
      center: { lat: 36.2253017, lng: 127.6460516 }, // 한국 중심
      zoom: 7, // 전체 보기용 낮은 줌
    });

  const infoWindowsRef = useRef<naver.maps.InfoWindow[]>([]);
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const markerClusterRef = useRef<MarkerClusteringInstance | null>(null);
  const currentLocationMarkerRef = useRef<naver.maps.Marker | null>(null);

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
  const getCurrentLocation = () => {
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
          // 근처 팝업 조회
          const nearbyResponse = await getNearbyPopups(latitude, longitude, radius);
          if (nearbyResponse.status === 200 && nearbyResponse.data) {
            setNearbyPopups(nearbyResponse);
            setIsShowingNearby(true);

            // 지도 중심 이동
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
  };

  // 전체 보기로 돌아가기
  const showAllPopups = () => {
    setIsShowingNearby(false);
    setNearbyPopups(null);
    setCurrentLocation(null);
    setCenter(36.2253017, 127.6460516);
    setZoom(7);
  };

  // 마커 클러스터링 설정
  const createMarkerClustering = (markers: naver.maps.Marker[]) => {
    if (!window.MarkerClustering || !mapInstance) return;

    // 기존 클러스터 제거
    if (markerClusterRef.current) {
      markerClusterRef.current.setMap(null);
    }

    const htmlMarker1 = {
      content: `<div style="
        cursor: pointer;
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 12px;
        color: white;
        text-align: center;
        font-weight: bold;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 8px rgba(102,126,234,0.4);
      "></div>`,
      size: new naver.maps.Size(40, 40),
      anchor: new naver.maps.Point(20, 20),
    };

    const htmlMarker2 = {
      content: `<div style="
        cursor: pointer;
        width: 50px;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        color: white;
        text-align: center;
        font-weight: bold;
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 12px rgba(245,87,108,0.4);
      "></div>`,
      size: new naver.maps.Size(50, 50),
      anchor: new naver.maps.Point(25, 25),
    };

    const htmlMarker3 = {
      content: `<div style="
        cursor: pointer;
        width: 60px;
        height: 60px;
        line-height: 60px;
        font-size: 16px;
        color: white;
        text-align: center;
        font-weight: bold;
        background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 16px rgba(252,182,159,0.4);
      "></div>`,
      size: new naver.maps.Size(60, 60),
      anchor: new naver.maps.Point(30, 30),
    };

    markerClusterRef.current = new window.MarkerClustering({
      minClusterSize: 2,
      maxZoom: 12,
      map: mapInstance,
      markers: markers,
      disableClickZoom: false,
      gridSize: 120,
      icons: [htmlMarker1, htmlMarker2, htmlMarker3],
      indexGenerator: [10, 50, 100],
      stylingFunction: function (
        clusterMarker: { getElement: () => HTMLElement | null },
        count: number,
      ) {
        const element = clusterMarker.getElement();
        if (element) {
          const div = element.querySelector('div');
          if (div) {
            div.textContent = count.toString();
          }
        }
      },
    });
  };

  // 지도 마커 생성 및 이벤트 설정
  useEffect(() => {
    if (!isLoaded || !mapInstance) return;

    // 기존 마커들과 InfoWindow들 정리
    clearMarkers();
    infoWindowsRef.current.forEach((iw) => iw.close());
    infoWindowsRef.current = [];
    markersRef.current = [];

    // 현재 위치 마커 제거
    if (currentLocationMarkerRef.current) {
      currentLocationMarkerRef.current.setMap(null);
      currentLocationMarkerRef.current = null;
    }

    // 표시할 데이터 결정
    const popupsToShow =
      isShowingNearby && nearbyPopups?.data ? nearbyPopups.data : allPopups?.data || [];

    console.log(`🗺️ ${isShowingNearby ? '근처' : '전체'} 팝업 ${popupsToShow.length}개 표시`);

    // 현재 위치 마커 추가
    if (currentLocation) {
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
    }

    // 팝업 마커들 생성
    popupsToShow.forEach((popup, index) => {
      const marker = addMarker({
        position: {
          lat: popup.latitude,
          lng: popup.longitude,
        },
        title: popup.name,
        icon: {
          content: `
            <div style="
              width: 32px;
              height: 32px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              border: 2px solid white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              font-size: 12px;
              box-shadow: 0 2px 8px rgba(102,126,234,0.4);
              cursor: pointer;
              user-select: none;
            ">${isShowingNearby ? index + 1 : '📍'}</div>
          `,
          size: new naver.maps.Size(32, 32),
          anchor: new naver.maps.Point(16, 16),
        },
      });

      if (!marker) return;

      markersRef.current.push(marker);

      // InfoWindow 콘텐츠 생성
      const infoWindowContent = `
        <div style="
          padding: 0;
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08);
          min-width: 280px;
          max-width: 320px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 13px;
          color: #1a1a1a;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.06);
        ">
          <div style="
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 16px 20px 14px 20px;
            position: relative;
          ">
            <button onclick="this.closest('div').style.display = 'none';" style="
              position: absolute;
              top: 8px;
              right: 8px;
              width: 24px;
              height: 24px;
              background: rgba(255,255,255,0.2);
              color: white;
              border: none;
              border-radius: 50%;
              cursor: pointer;
              font-size: 14px;
              display: flex;
              align-items: center;
              justify-content: center;
            ">×</button>
            
            ${
              isShowingNearby
                ? `
            <div style="
              position: absolute;
              top: -8px;
              left: 16px;
              width: 28px;
              height: 28px;
              background: #ff6b6b;
              color: white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 13px;
              font-weight: bold;
              box-shadow: 0 2px 8px rgba(255,107,107,0.3);
            ">${index + 1}</div>
            `
                : ''
            }
            
            <h3 style="
              margin: 8px 30px 0 0;
              font-size: 16px;
              font-weight: 600;
              line-height: 1.3;
              color: white;
            ">${popup.name}</h3>
          </div>
          
          <div style="padding: 16px 20px 20px 20px; background: white;">
            <p style="
              margin: 0 0 12px 0;
              font-size: 13px;
              color: #4a5568;
              line-height: 1.5;
            ">${popup.description}</p>
            
            <div style="
              display: flex;
              align-items: flex-start;
              padding: 10px 12px;
              background: #f8fafc;
              border-radius: 8px;
              border-left: 3px solid #667eea;
              margin-bottom: 16px;
            ">
              <span style="margin-right: 8px; margin-top: 1px;">📍</span>
              <p style="
                margin: 0;
                font-size: 11px;
                color: #718096;
                line-height: 1.4;
              ">${popup.address}</p>
            </div>
            
            <button onclick="this.closest('div').parentElement.parentElement.style.display = 'none';" style="
              width: 100%;
              padding: 10px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              border: none;
              border-radius: 8px;
              cursor: pointer;
              font-size: 13px;
              font-weight: 500;
            ">닫기</button>
          </div>
        </div>
      `;

      const infoWindow = new naver.maps.InfoWindow({
        content: infoWindowContent,
        borderWidth: 0,
        backgroundColor: 'transparent',
        disableAnchor: true,
        pixelOffset: new naver.maps.Point(0, -10),
      });

      infoWindowsRef.current.push(infoWindow);

      // 마커 클릭 이벤트
      naver.maps.Event.addListener(marker, 'click', function () {
        // 모든 InfoWindow 닫기
        infoWindowsRef.current.forEach((iw) => {
          if (iw.getMap()) {
            iw.close();
          }
        });

        // 새로운 InfoWindow 열기
        setTimeout(() => {
          infoWindow.open(mapInstance, marker);
        }, 50);
      });

      // 호버 효과
      naver.maps.Event.addListener(marker, 'mouseover', () => {
        if (mapRef.current) {
          mapRef.current.style.cursor = 'pointer';
        }
      });

      naver.maps.Event.addListener(marker, 'mouseout', () => {
        if (mapRef.current) {
          mapRef.current.style.cursor = '';
        }
      });
    });

    // 클러스터링 적용 (전체 보기일 때만)
    if (!isShowingNearby && markersRef.current.length > 0) {
      createMarkerClustering(markersRef.current);
    }

    // 지도 클릭 시 모든 InfoWindow 닫기
    naver.maps.Event.addListener(mapInstance, 'click', () => {
      infoWindowsRef.current.forEach((iw) => {
        if (iw.getMap()) {
          iw.close();
        }
      });
    });

    // 초기 팝업 열기
    if (initialOpenPopupId !== undefined) {
      setTimeout(() => {
        const targetIndex = popupsToShow.findIndex(
          (p, idx) => p.id === initialOpenPopupId || idx + 1 === initialOpenPopupId,
        );

        if (targetIndex >= 0 && infoWindowsRef.current[targetIndex]) {
          infoWindowsRef.current[targetIndex].open(mapInstance, markersRef.current[targetIndex]);
        }
      }, 500);
    }

    console.log(`🎉 총 ${markersRef.current.length}개 마커 생성 완료`);

    return () => {
      if (markerClusterRef.current) {
        markerClusterRef.current.setMap(null);
      }
      clearMarkers();
      infoWindowsRef.current.forEach((iw) => iw.close());
      infoWindowsRef.current = [];
      markersRef.current = [];
    };
  }, [
    isLoaded,
    allPopups,
    nearbyPopups,
    currentLocation,
    isShowingNearby,
    mapInstance,
    addMarker,
    clearMarkers,
    setCenter,
    setZoom,
    initialOpenPopupId,
  ]);

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ width: '100%', height: '400px', ...style }}
      >
        <div className="text-gray-500 text-sm">지도를 불러오는 중...</div>
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

      {/* 컨트롤 버튼들 */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        {!isShowingNearby ? (
          <button
            onClick={getCurrentLocation}
            disabled={loadingLocation}
            className="bg-white shadow-lg rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border disabled:opacity-50"
          >
            {loadingLocation ? '위치 찾는 중...' : '📍 내 위치로 찾기'}
          </button>
        ) : (
          <button
            onClick={showAllPopups}
            className="bg-white shadow-lg rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border"
          >
            🗺️ 전체 보기
          </button>
        )}
      </div>

      {/* 범례 */}
      <div className="absolute top-4 left-4 bg-white shadow-lg rounded-lg px-3 py-2 border">
        <div className="flex items-center gap-2 text-sm">
          <span className="w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></span>
          <span className="font-medium">
            {isShowingNearby ? '근처' : '전체'} 팝업 {displayData.length}개
          </span>
        </div>
        {currentLocation && (
          <div className="flex items-center gap-2 text-sm mt-1">
            <span className="w-4 h-4 bg-red-500 rounded-full"></span>
            <span className="font-medium">현재 위치</span>
          </div>
        )}
      </div>
    </div>
  );
}
