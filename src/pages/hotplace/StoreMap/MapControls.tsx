import SelectorPopover from './SelectorPopover';

export default function MapControls({
  loadingLocation,
  onGetCurrentLocation,
  brandIds,
  selectedIds,
  onChangeSelectedIds,
}: {
  loadingLocation: boolean;
  onGetCurrentLocation: () => void;
  brandIds: number[];
  selectedIds: number[];
  onChangeSelectedIds: (ids: number[]) => void;
}) {
  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
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

      {/* 브랜드 선택 토글 버튼 제거 */}
      {/* 팝오버는 SelectorPopover 내부의 트리거 버튼으로 열고 닫음 */}

      <SelectorPopover
        brandIds={brandIds}
        selectedIds={selectedIds}
        onChange={(ids) => {
          onChangeSelectedIds(ids);
          // 팝오버 자동 닫기 제거
          // onToggleBrandSelector();
        }}
      />
    </div>
  );
}
