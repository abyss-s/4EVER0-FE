interface MapLegendProps {
  isShowingNearby: boolean;
  popupCount: number;
  hasCurrentLocation: boolean;
}

export default function MapLegend({
  isShowingNearby,
  popupCount,
  hasCurrentLocation,
}: MapLegendProps) {
  return (
    <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
      {/* 팝업 개수 표시 */}
      <div
        className="bg-white rounded-2xl shadow-lg px-3 py-2 transition-all hover:shadow-xl"
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: '16px',
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
          <span className="text-xs font-medium text-gray-700 whitespace-nowrap">
            {isShowingNearby ? '근처' : '전체'} 팝업 {popupCount}개
          </span>
        </div>
      </div>

      {/* 현재 위치 표시 */}
      {hasCurrentLocation && (
        <div
          className="bg-white rounded-2xl shadow-lg px-3 py-2 transition-all hover:shadow-xl"
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: '16px',
          }}
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="text-xs font-medium text-gray-700 whitespace-nowrap">현재 위치</span>
          </div>
        </div>
      )}
    </div>
  );
}
