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
    <div className="absolute top-4 right-4 flex flex-col gap-2">
      {!isShowingNearby ? (
        <button
          onClick={onGetCurrentLocation}
          disabled={loadingLocation}
          className="bg-white shadow-lg rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loadingLocation ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              위치 찾는 중...
            </span>
          ) : (
            '📍 내 위치로 찾기'
          )}
        </button>
      ) : (
        <button
          onClick={onShowAllPopups}
          className="bg-white shadow-lg rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border transition-all"
        >
          🗺️ 전체 보기
        </button>
      )}
    </div>
  );
}
