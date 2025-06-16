import React, { useEffect, useState } from 'react';
import { useNaverMap } from '@/hooks/useNaverMap';
import { getNearbyPopupsByLocation } from '@/apis/popup/getNearbyPopupsByLocation';
import type { NearbyPopupsWithLocation } from '@/types/popup';

interface PopupMapProps {
  className?: string;
  style?: React.CSSProperties;
  radius?: number;
}

export default function PopupMap({ className = '', style = {}, radius = 5 }: PopupMapProps) {
  const [popupData, setPopupData] = useState<NearbyPopupsWithLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { mapRef, mapInstance, isLoaded, setCenter } = useNaverMap({
    center: { lat: 37.5665, lng: 126.978 },
    zoom: 13,
    zoomControl: true,
    mapDataControl: true,
    scaleControl: true,
  });

  // API에서 근처 팝업 데이터 가져오기
  useEffect(() => {
    const fetchNearbyPopups = async () => {
      try {
        setLoading(true);
        const response = await getNearbyPopupsByLocation(radius);

        if (response.status === 200 && response.data) {
          setPopupData(response.data);
          setError(null);
        } else {
          setError('데이터를 불러오는데 실패했습니다.');
        }
      } catch (err) {
        setError('네트워크 오류가 발생했습니다.');
        console.error('팝업 데이터 로드 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyPopups();
  }, [radius]);

  // 지도가 로드되고 팝업 데이터가 있을 때 마커 추가
  useEffect(() => {
    if (!isLoaded || !mapInstance || !popupData) return;

    // 현재 위치로 지도 중심 설정
    setCenter(popupData.latitude, popupData.longitude);

    const markers: naver.maps.Marker[] = [];

    // 현재 위치 마커
    const currentLocationMarker = new naver.maps.Marker({
      position: new naver.maps.LatLng(popupData.latitude, popupData.longitude),
      map: mapInstance,
      title: '현재 위치',
      icon: {
        // 간단한 원형 마커로 대체 (이모지 없음)
        url:
          'data:image/svg+xml;charset=utf-8,' +
          encodeURIComponent(`
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="8" fill="#4285f4" stroke="white" stroke-width="2"/>
            <circle cx="10" cy="10" r="3" fill="white"/>
          </svg>
        `),
        size: new naver.maps.Size(20, 20),
        anchor: new naver.maps.Point(10, 10),
      },
    });
    markers.push(currentLocationMarker);

    // 근처 팝업스토어 마커들 추가
    popupData.nearby_popups.forEach((popup) => {
      const popupMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(popup.latitude, popup.longitude),
        map: mapInstance,
        title: `${popup.name} (${popup.distance_km}km)`,
        icon: {
          // 간단한 핀 마커로 대체 (이모지 없음)
          url:
            'data:image/svg+xml;charset=utf-8,' +
            encodeURIComponent(`
            <svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 0C6.7 0 0 6.7 0 15C0 23.3 15 40 15 40S30 23.3 30 15C30 6.7 23.3 0 15 0Z" fill="#ff6b6b"/>
              <circle cx="15" cy="15" r="8" fill="white"/>
              <rect x="11" y="11" width="8" height="6" fill="#ff6b6b" rx="1"/>
              <rect x="9" y="13" width="12" height="2" fill="#ff6b6b"/>
            </svg>
          `),
          size: new naver.maps.Size(30, 40),
          anchor: new naver.maps.Point(15, 40),
        },
      });

      // 마커 클릭 이벤트 추가
      naver.maps.Event.addListener(popupMarker, 'click', () => {
        const infoWindow = new naver.maps.InfoWindow({
          content: `
            <div style="
              padding: 12px; 
              min-width: 200px; 
              max-width: 300px;
              font-family: system-ui, -apple-system, sans-serif;
              line-height: 1.4;
            ">
              <h3 style="
                margin: 0 0 8px 0; 
                font-size: 14px; 
                font-weight: bold; 
                color: #333;
                border-bottom: 1px solid #eee;
                padding-bottom: 4px;
              ">
                ${popup.name}
              </h3>
              <p style="
                margin: 0 0 8px 0; 
                font-size: 12px; 
                color: #666;
                line-height: 1.4;
              ">
                ${popup.description}
              </p>
              <div style="
                display: flex;
                align-items: center;
                gap: 4px;
                margin-bottom: 4px;
                font-size: 11px;
                color: #888;
              ">
                <span style="color: #666;">📍</span>
                <span>${popup.address}</span>
              </div>
              <div style="
                display: flex;
                align-items: center;
                gap: 4px;
                font-size: 11px;
                color: #4285f4;
                font-weight: bold;
              ">
                <span>📏</span>
                <span>${popup.distance_km}km 거리</span>
              </div>
            </div>
          `,
          borderWidth: 1,
          borderColor: '#ddd',
          backgroundColor: 'white',
          anchorSize: new naver.maps.Size(0, 10),
          pixelOffset: new naver.maps.Point(0, -10),
        });

        infoWindow.open(mapInstance, popupMarker);

        // 5초 후 자동으로 닫기
        setTimeout(() => {
          infoWindow.close();
        }, 5000);
      });

      markers.push(popupMarker);
    });

    // 컴포넌트 언마운트 시 마커 정리
    return () => {
      markers.forEach((marker) => marker.setMap(null));
    };
  }, [isLoaded, mapInstance, popupData, setCenter]);

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ width: '100%', height: '400px', ...style }}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <div className="text-gray-500 text-sm">지도를 불러오는 중...</div>
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

  return (
    <div className={`relative ${className}`} style={{ width: '100%', height: '400px', ...style }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

      {/* 우측 범례 */}
      {popupData && (
        <div className="absolute right-4 top-4 space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">{popupData.nearby_popups.length}</span>
            </div>
            <span className="bg-gray-700 text-white px-2 py-1 rounded text-xs">🔖 핫플</span>
          </div>
        </div>
      )}

      {/* 범례 */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg z-10 border">
        <div className="text-xs font-medium text-gray-700 mb-2">범례</div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full border border-white shadow-sm"></div>
          <span className="text-xs text-gray-700">현재 위치</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-400 rounded-sm"></div>
          <span className="text-xs text-gray-700">팝업스토어 (클릭 가능)</span>
        </div>
      </div>

      {/* 도움말 */}
      <div className="absolute top-4 right-4 bg-blue-50 p-2 rounded-lg shadow-sm z-10 border border-blue-200">
        <p className="text-xs text-blue-700">💡 마커를 클릭하면 상세 정보를 볼 수 있습니다</p>
      </div>
    </div>
  );
}
