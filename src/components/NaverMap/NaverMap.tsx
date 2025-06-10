import React from 'react';
import { useNaverMap } from '@/hooks/useNaverMap';
import type { NaverMapOptions } from '@/types/naverMap';

interface NaverMapProps {
  className?: string;
  style?: React.CSSProperties;
  options?: NaverMapOptions;
  onMapLoad?: (map: naver.maps.Map) => void;
  children?: React.ReactNode;
}

export default function NaverMap({
  className = '',
  style = {},
  options = {},
  onMapLoad,
  children,
}: NaverMapProps) {
  const { mapRef, mapInstance, isLoaded } = useNaverMap(options);

  React.useEffect(() => {
    if (isLoaded && mapInstance && onMapLoad) {
      onMapLoad(mapInstance);
    }
  }, [isLoaded, mapInstance, onMapLoad]);

  return (
    <div className={`naver-map ${className}`} style={{ width: '100%', height: '400px', ...style }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

      {isLoaded && children}
    </div>
  );
}
