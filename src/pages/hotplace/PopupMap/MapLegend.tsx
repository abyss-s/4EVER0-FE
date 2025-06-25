import { MapLegendBox } from '@/components/NaverMap/MapLegendBox';

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
      <MapLegendBox>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#EC4899] rounded-full" />
          <span className="text-xs font-medium text-gray-700 whitespace-nowrap">
            {isShowingNearby ? '근처' : '전체'} 팝업 {popupCount}개
          </span>
        </div>
      </MapLegendBox>

      {/* 현재 위치 표시 */}
      {hasCurrentLocation && (
        <MapLegendBox>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="text-xs font-medium text-gray-700 whitespace-nowrap">현재 위치</span>
          </div>
        </MapLegendBox>
      )}
    </div>
  );
}
