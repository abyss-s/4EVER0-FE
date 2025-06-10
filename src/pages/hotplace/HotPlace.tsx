import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

const Hotplace = () => {
  const [selectedLocation, setSelectedLocation] = useState<{ id: number; name: string } | null>(
    null,
  );

  type LocationType = {
    id: number;
    name: string;
    x: number;
    y: number;
    number: number;
  };

  const handleLocationClick = (location: LocationType) => {
    setSelectedLocation(location);
  };

  // 지도 위 장소 데이터
  const locations = [
    { id: 1, name: '서울', x: 35, y: 40, number: 6 },
    { id: 2, name: '강원', x: 65, y: 25, number: 1 },
    { id: 3, name: '경기', x: 45, y: 50, number: 9 },
    { id: 4, name: '충북', x: 55, y: 65, number: 3 },
    { id: 5, name: '대전', x: 50, y: 75, number: 2 },
    { id: 6, name: '경북', x: 70, y: 70, number: 4 },
    { id: 7, name: '전북', x: 35, y: 85, number: 9 },
    { id: 8, name: '광주', x: 30, y: 95, number: 2 },
    { id: 9, name: '경남', x: 65, y: 85, number: 4 },
    { id: 10, name: '제주', x: 25, y: 110, number: 2 },
  ];

  // BEST 혜택 데이터
  const bestDeals = [
    {
      rank: 1,
      title: '팝업맵 오픈기념',
      subtitle: '팝업스토어 정보를 한눈에!',
      discount: '30%할인',
      badge: '신규',
    },
    {
      rank: 2,
      title: '건국대 직영점 홍대 오픈 이벤트',
      subtitle: '',
      discount: '₩5,000원',
      badge: '할인',
    },
    {
      rank: 3,
      title: '음료 쿠폰북@CGV 극장별 한정판',
      subtitle: '',
      discount: '₩3,000원',
      badge: '쿠폰',
    },
  ];

  return (
    <ScrollArea className="h-screen w-full">
      <div className="max-w-md mx-auto bg-pink-50 min-h-screen"></div>
      <div className="max-w-md mx-auto bg-pink-50 min-h-screen">
        {/* 상단 지도 섹션 */}
        <div className="relative p-4">
          {/* 헤더 */}
          <div className="flex justify-center mb-4">
            <div className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm">
              ⭐ 요즘 핫한 MZ들의 PICK은?!
            </div>
          </div>

          {/* 지도 배경 */}
          <div className="relative bg-yellow-300 rounded-2xl p-6 mb-4" style={{ height: '300px' }}>
            {/* 한국 지도 모양 (간단한 형태) */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <svg viewBox="0 0 100 120" className="w-full h-full">
                <path
                  d="M20 30 L25 25 L35 20 L45 15 L55 18 L65 22 L75 28 L80 35 L85 45 L82 55 L78 65 L75 75 L70 85 L65 90 L55 95 L45 92 L35 88 L30 82 L25 75 L22 65 L18 55 L15 45 L18 35 Z"
                  fill="rgba(255,255,255,0.3)"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="1"
                />
              </svg>
            </div>

            {/* 장소 마커들 */}
            {locations.map((location) => (
              <div
                key={location.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${location.x}%`, top: `${location.y}%` }}
                onClick={() => handleLocationClick(location)}
              >
                <div className="relative">
                  <div className="w-8 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-300">
                    <span className="text-xs font-bold text-gray-700">{location.number}</span>
                  </div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap">
                    {location.name}
                  </div>
                </div>
              </div>
            ))}

            {/* 우측 범례 */}
            <div className="absolute right-4 top-4 space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">9</span>
                </div>
                <span className="bg-gray-700 text-white px-2 py-1 rounded text-xs">많음</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <span className="bg-gray-700 text-white px-2 py-1 rounded text-xs">🔖 핫플</span>
              </div>
            </div>

            {/* 하단 프로필 아이콘 */}
            <div className="absolute bottom-4 right-4">
              <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">👤</span>
              </div>
            </div>
          </div>
        </div>

        {/* BEST 혜택 섹션 */}
        <div className="px-4">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm">
              ⭐ BEST 혜택 3위
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {bestDeals.map((deal, index) => (
              <div key={index} className="relative">
                {/* 순위 배지 */}
                <div
                  className={`absolute -top-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold z-10 ${
                    index === 0 ? 'bg-red-500' : index === 1 ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}
                >
                  {deal.rank}위
                </div>

                {/* 카드 */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-24 bg-gradient-to-br from-purple-100 to-pink-100 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center">
                        <span className="text-2xl">📱</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-xs mb-1 line-clamp-2">{deal.title}</h3>
                    {deal.subtitle && <p className="text-gray-600 text-xs mb-2">{deal.subtitle}</p>}
                    <div className="flex items-center justify-between">
                      <span className="text-red-500 font-bold text-xs">{deal.discount}</span>
                      <span
                        className={`px-2 py-1 rounded text-xs text-white ${
                          deal.badge === '신규'
                            ? 'bg-blue-500'
                            : deal.badge === '할인'
                              ? 'bg-red-500'
                              : 'bg-green-500'
                        }`}
                      >
                        {deal.badge}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 선택된 위치 표시 (디버깅용) */}
        {selectedLocation && (
          <div className="fixed bottom-4 left-4 bg-black text-white px-3 py-2 rounded">
            {selectedLocation.name} 클릭됨!
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default Hotplace;
