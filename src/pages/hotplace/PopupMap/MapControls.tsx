import { Button } from '@/components/Button';
import { cn } from '@/lib/utils';

interface MapControlsProps {
  isShowingNearby: boolean;
  loadingLocation: boolean;
  onGetCurrentLocation: () => void;
  onShowAllPopups: () => void;
}

export default function MapControls({
  isShowingNearby,
  loadingLocation,
  onGetCurrentLocation,
  onShowAllPopups,
}: MapControlsProps) {
  return (
    <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
      {!isShowingNearby ? (
        <Button
          variant="map"
          className={cn('w-fit px-3 py-2', loadingLocation && 'opacity-50 cursor-not-allowed')}
          onClick={loadingLocation ? undefined : onGetCurrentLocation}
        >
          {loadingLocation ? (
            <>
              <div
                className="w-3 h-3 border border-gray-300 border-t-red-500 rounded-full animate-spin"
                aria-hidden
              />
              <span className="text-xs font-medium text-gray-700 whitespace-nowrap">
                위치 찾는 중...
              </span>
            </>
          ) : (
            <>
              <span className="text-xs">📍</span>
              <span className="text-xs font-medium text-gray-700 whitespace-nowrap">
                내 위치로 찾기
              </span>
            </>
          )}
        </Button>
      ) : (
        <Button variant="map" className="w-fit px-3 py-2" onClick={onShowAllPopups}>
          <span className="text-xs">🗺️</span>
          <span className="text-xs font-medium text-gray-700 whitespace-nowrap">전체 보기</span>
        </Button>
      )}
    </div>
  );
}
