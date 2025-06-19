import React from 'react';

interface StoreData {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

interface MapPopoverProps {
  store: StoreData;
  index?: number;
  children: React.ReactNode;
  showIndex?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function StorePopover({
  store,
  index,
  children,
  showIndex = false,
  open = false,
  onOpenChange,
}: MapPopoverProps) {
  if (!open) return <>{children}</>;

  return (
    <>
      {children}

      {/* 🎯 브라우저 중앙 고정 팝오버 */}
      <div
        className="bg-white rounded-lg shadow-2xl border"
        style={{
          width: '320px',
          maxWidth: '90vw',
          maxHeight: '80vh',
          overflow: 'auto',
          pointerEvents: 'auto',
        }}
        onClick={(e) => e.stopPropagation()} // 팝오버 내부 클릭시 닫히지 않음
      >
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 relative rounded-t-lg">
          {/* 인덱스 번호 (근처 보기일 때) */}
          {showIndex && typeof index === 'number' && index >= 0 && (
            <div className="absolute -top-2 -left-2 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold shadow-lg ring-2 ring-white">
              {index + 1}
            </div>
          )}

          {/* 닫기 버튼 */}
          <button
            onClick={() => onOpenChange?.(false)}
            className="absolute top-2 right-2 w-6 h-6 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-colors"
            aria-label="팝오버 닫기"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* 제목 */}
          <h3 className="text-base font-semibold leading-tight pr-8 text-white">{store.name}</h3>
        </div>

        {/* 본문 */}
        <div className="p-4 space-y-3 bg-white">
          {/* 주소 */}
          <div className="space-y-1">
            <h4 className="text-xs font-medium text-gray-900 uppercase tracking-wide flex items-center gap-1">
              <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              위치
            </h4>
            <div className="p-2.5 bg-gray-50 rounded-md border text-xs">
              <p className="text-gray-700 leading-relaxed">{store.address}</p>
            </div>
          </div>

          {/* 좌표 정보 (개발자용)
          <div className="text-xs text-gray-400 border-t pt-2">
            위도: {store.lat.toFixed(6)}, 경도: {store.lng.toFixed(6)}
          </div> */}

          {/* 액션 버튼들 */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => onOpenChange?.(false)}
              className="flex-1 px-3 py-2 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
            >
              닫기
            </button>
            <button
              onClick={() => {
                console.log('상세 정보:', store);
                // 상세 페이지 이동 or 추가 모달 열기 구현
              }}
              className="flex-1 px-3 py-2 text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-md transition-all shadow-sm hover:shadow-md"
            >
              상세보기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
