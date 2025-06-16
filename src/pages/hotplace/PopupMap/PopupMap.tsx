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

  const { mapRef, isLoaded, addMarker, clearMarkers, setCenter, setZoom } = useNaverMap({
    center: { lat: 37.5665, lng: 126.978 },
    zoom: 13,
  });

  useEffect(() => {
    const fetchNearbyPopups = async () => {
      try {
        setLoading(true);
        const response = await getNearbyPopupsByLocation(radius);
        if (response.status === 200 && response.data) {
          setPopupData(response.data);
        } else {
          setError('데이터를 불러오지 못했습니다.');
        }
      } catch (e) {
        setError('네트워크 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchNearbyPopups();
  }, [radius]);

  useEffect(() => {
    if (!isLoaded || !popupData) return;

    // 지도 중심 및 줌 설정
    setCenter(popupData.latitude, popupData.longitude);
    setZoom(14);

    clearMarkers();

    // 현재 위치 마커 추가
    addMarker({
      position: { lat: popupData.latitude, lng: popupData.longitude },
      title: '현재 위치',
      icon: {
        content: `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
          <circle cx="10" cy="10" r="8" fill="#de3030" stroke="white" stroke-width="2"/>
          <circle cx="10" cy="10" r="3" fill="white"/>
        </svg>
      `,
        anchor: new naver.maps.Point(10, 10),
      },
    });

    // 주변 팝업스토어 마커 추가
    popupData.nearby_popups.forEach((popup) => {
      addMarker({
        position: {
          lat: popup.latitude,
          lng: popup.longitude,
        },
        title: popup.name,
      });
    });
  }, [isLoaded, popupData]);

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

  return (
    <div className={`relative ${className}`} style={{ width: '100%', height: '400px', ...style }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
