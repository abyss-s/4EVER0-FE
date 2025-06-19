interface MapLegendProps {
  isShowingSelected: boolean;
  popupCount: number;
  hasCurrentLocation: boolean;
}

export default function MapLegend({
  isShowingSelected,
  popupCount,
  hasCurrentLocation,
}: MapLegendProps) {
  return (
    <div className="absolute top-4 left-4 bg-white shadow-lg rounded-lg px-3 py-2 border">
      <div className="flex items-center gap-2 text-sm">
        <span className="w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></span>
        <span className="font-medium">
          {isShowingSelected ? '선택한' : '전체'} 쿠폰의 매장 {popupCount}개
        </span>
      </div>
      {hasCurrentLocation && (
        <div className="flex items-center gap-2 text-sm mt-1">
          <span className="w-4 h-4 bg-red-500 rounded-full"></span>
          <span className="font-medium">현재 위치</span>
        </div>
      )}
    </div>
  );
}
