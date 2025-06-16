import React, { useEffect, useState, useRef } from 'react';
import { useNaverMap } from '@/hooks/useNaverMap';
import { getNearbyPopupsByLocation } from '@/apis/popup/getNearbyPopupsByLocation';
import type { NearbyPopupsWithLocation } from '@/types/popup';

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
  const [popupData, setPopupData] = useState<NearbyPopupsWithLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { mapRef, isLoaded, mapInstance, addMarker, clearMarkers, setCenter, setZoom } =
    useNaverMap({
      center: { lat: 37.5665, lng: 126.978 },
      zoom: 13,
    });

  const infoWindowsRef = useRef<naver.maps.InfoWindow[]>([]);
  const markersRef = useRef<naver.maps.Marker[]>([]);

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
    if (!isLoaded || !popupData || !mapInstance) {
      console.log('조건 불충족:', { isLoaded, popupData: !!popupData, mapInstance: !!mapInstance });
      return;
    }

    console.log('🗺️ 지도 초기화 시작');

    // 지도 중심 및 줌 설정
    setCenter(popupData.latitude, popupData.longitude);
    setZoom(14);

    // 기존 마커들과 InfoWindow들 정리
    clearMarkers();
    infoWindowsRef.current.forEach((iw) => iw.close());
    infoWindowsRef.current = [];
    markersRef.current = [];

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
    popupData.nearby_popups.forEach((popup, index) => {
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
              background: #667eea;
              color: white;
              border: 2px solid white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              font-size: 14px;
              box-shadow: 0 2px 8px rgba(102,126,234,0.4);
              cursor: pointer;
              user-select: none;
            ">${index + 1}</div>
          `,
          size: new naver.maps.Size(32, 32),
          anchor: new naver.maps.Point(16, 16),
        },
      });

      if (!marker) {
        console.error(`❌ 마커 ${index + 1} 생성 실패`);
        return;
      }

      markersRef.current.push(marker);

      // 🎨 NEW DESIGN - 완전히 새로운 디자인의 InfoWindow 콘텐츠
      const infoWindowContent = `
        <div style="
          padding: 0;
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08);
          min-width: 260px;
          max-width: 320px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 13px;
          color: #1a1a1a;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.06);
        ">
          <!-- 🌟 헤더 부분 -->
          <div style="
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 16px 20px 14px 20px;
            position: relative;
          ">
            <!-- ✕ 닫기 버튼 -->
            <button onclick="
              this.closest('div').style.display = 'none';
            " style="
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
            
            <!-- 🔴 마커 번호 -->
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
            
            <!-- 📝 제목 -->
            <h3 style="
              margin: 8px 30px 0 0;
              font-size: 16px;
              font-weight: 600;
              line-height: 1.3;
              color: white;
            ">${popup.name}</h3>
          </div>
          
          <!-- 📄 본문 부분 -->
          <div style="
            padding: 16px 20px 20px 20px;
            background: white;
          ">
            <!-- 💬 설명 -->
            <p style="
              margin: 0 0 12px 0;
              font-size: 13px;
              color: #4a5568;
              line-height: 1.5;
            ">${popup.description}</p>
            
            <!-- 📍 주소 -->
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
            
            <!-- 🔘 하단 버튼 -->
            <button onclick="
              this.closest('div').parentElement.parentElement.style.display = 'none';
            " style="
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

      // 🎯 InfoWindow 생성 - 커스텀 스타일 사용
      const infoWindow = new naver.maps.InfoWindow({
        content: infoWindowContent,
        borderWidth: 0,
        backgroundColor: 'transparent',
        disableAnchor: true,
        pixelOffset: new naver.maps.Point(0, -10),
      });

      infoWindowsRef.current.push(infoWindow);

      // 🖱️ 마커 클릭 이벤트
      naver.maps.Event.addListener(marker, 'click', function () {
        console.log(`🎯 마커 ${index + 1} 클릭됨`);

        // 모든 InfoWindow 닫기
        infoWindowsRef.current.forEach((iw) => {
          if (iw.getMap()) {
            iw.close();
          }
        });

        // 새로운 InfoWindow 열기
        setTimeout(() => {
          infoWindow.open(mapInstance, marker);
          console.log(`✅ InfoWindow ${index + 1} 열림`);
        }, 50);
      });

      // 🖱️ 호버 효과
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

      console.log(`✅ 마커 ${index + 1} 생성 완료`);
    });

    // 🗺️ 지도 클릭 시 모든 InfoWindow 닫기
    naver.maps.Event.addListener(mapInstance, 'click', () => {
      infoWindowsRef.current.forEach((iw) => {
        if (iw.getMap()) {
          iw.close();
        }
      });
    });

    // 🎯 초기 팝업 열기
    if (initialOpenPopupId !== undefined) {
      setTimeout(() => {
        const targetIndex = popupData.nearby_popups.findIndex(
          (p, idx) => p.id === initialOpenPopupId || idx + 1 === initialOpenPopupId,
        );

        if (targetIndex >= 0 && infoWindowsRef.current[targetIndex]) {
          infoWindowsRef.current[targetIndex].open(mapInstance, markersRef.current[targetIndex]);
          console.log(`🎯 초기 팝업 ${targetIndex + 1} 열림`);
        }
      }, 500);
    }

    console.log(`🎉 총 ${markersRef.current.length}개 마커 생성 완료`);

    return () => {
      clearMarkers();
      infoWindowsRef.current.forEach((iw) => iw.close());
      infoWindowsRef.current = [];
      markersRef.current = [];
    };
  }, [
    isLoaded,
    popupData,
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

  return (
    <div className={`relative ${className}`} style={{ width: '100%', height: '400px', ...style }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

      {/* 📊 범례 */}
      {popupData && (
        <div className="absolute top-4 left-4 bg-white shadow-lg rounded-lg px-3 py-2 border">
          <div className="flex items-center gap-2 text-sm">
            <span className="w-4 h-4 bg-purple-500 rounded-full"></span>
            <span className="font-medium">팝업 {popupData.nearby_popups.length}개</span>
          </div>
        </div>
      )}
    </div>
  );
}
