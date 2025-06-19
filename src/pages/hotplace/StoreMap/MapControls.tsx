interface MapControlsProps {
  isShowingSelected: boolean;
  loadingLocation: boolean;
  onShowSelectedStores: () => void;
  onShowAllStores: () => void;
  onGetCurrentLocation: () => void; // 현재 위치 탐색은 별개로 받음
}

export default function StoreControls({
  isShowingSelected,
  loadingLocation,
  onShowSelectedStores,
  onShowAllStores,
  onGetCurrentLocation,
}: MapControlsProps) {
  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2">
      {/* 현재 위치 탐색 버튼 (별개) */}
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

      {/* 상태에 따라 버튼 텍스트 및 콜백 분기 */}
      <button
        onClick={() => {
          if (isShowingSelected) {
            onShowAllStores();
          } else {
            onShowSelectedStores();
          }
        }}
        className="bg-white shadow-lg rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border transition-all"
      >
        {isShowingSelected ? '🗺️ 전체 보기' : '선택 보기'}
      </button>
    </div>
  );
}
