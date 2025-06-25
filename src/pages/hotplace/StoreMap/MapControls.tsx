import React from 'react';
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
  // 스피너 애니메이션을 위한 CSS 클래스
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .spinner-animation {
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        zIndex: 10,
      }}
    >
      {/* 내 위치로 찾기 버튼 */}
      <div
        onClick={loadingLocation ? undefined : onGetCurrentLocation}
        style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          padding: '8px 12px',
          border: '1px solid #e5e7eb',
          transition: 'all 0.2s ease',
          cursor: loadingLocation ? 'not-allowed' : 'pointer',
          opacity: loadingLocation ? 0.5 : 1,
        }}
        onMouseEnter={(e) => {
          if (!loadingLocation) {
            e.currentTarget.style.boxShadow =
              '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow =
            '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {loadingLocation ? (
            <>
              <div
                className="spinner-animation"
                style={{
                  width: '12px',
                  height: '12px',
                  border: '1px solid #d1d5db',
                  borderTop: '1px solid #ef4444',
                  borderRadius: '50%',
                }}
              />
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: '500',
                  color: '#374151',
                  whiteSpace: 'nowrap',
                }}
              >
                위치 찾는 중...
              </span>
            </>
          ) : (
            <>
              <span style={{ fontSize: '12px' }}>📍</span>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: '500',
                  color: '#374151',
                  whiteSpace: 'nowrap',
                }}
              >
                내 위치로 찾기
              </span>
            </>
          )}
        </div>
      </div>

      {/* 브랜드 선택 팝오버 */}
      <div
        style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          padding: '8px 12px',
          border: '1px solid #e5e7eb',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow =
            '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow =
            '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        }}
      >
        <SelectorPopover
          brandIds={brandIds}
          selectedIds={selectedIds}
          onChange={(ids) => {
            onChangeSelectedIds(ids);
          }}
        />
      </div>
    </div>
  );
}
