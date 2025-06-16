import { useEffect, useRef, useState, useCallback } from 'react';
import type { NaverMapOptions, MarkerOptions } from '@/types/naverMap';

export function useNaverMap(options: NaverMapOptions = {}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<naver.maps.Map | undefined>(undefined);
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const {
    center = { lat: 37.5665, lng: 126.978 },
    zoom = 14,
    mapTypeId = naver.maps.MapTypeId.NORMAL,
    minZoom = 6,
    maxZoom = 20,
    zoomControl = false,
    mapDataControl = false,
    scaleControl = false,
    logoControl = false,
  } = options;

  const initializeMap = useCallback(() => {
    if (!mapRef.current || !window.naver?.maps) return;

    mapInstanceRef.current = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(center.lat, center.lng),
      zoom,
      mapTypeId,
      minZoom,
      maxZoom,
      zoomControl,
      mapDataControl,
      scaleControl,
      logoControl,
    });

    setIsLoaded(true);
  }, [
    center,
    zoom,
    mapTypeId,
    minZoom,
    maxZoom,
    zoomControl,
    mapDataControl,
    scaleControl,
    logoControl,
  ]);

  const addMarker = useCallback((markerOptions: MarkerOptions) => {
    if (!mapInstanceRef.current) {
      return null;
    }

    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(markerOptions.position.lat, markerOptions.position.lng),
      map: mapInstanceRef.current,
      title: markerOptions.title,
      icon: markerOptions.icon,
      clickable: markerOptions.clickable ?? true,
    });

    markersRef.current.push(marker);
    return marker;
  }, []);

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  }, []);

  const setCenter = useCallback((lat: number, lng: number) => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.setCenter(new naver.maps.LatLng(lat, lng));
  }, []);

  const setZoom = useCallback((zoomLevel: number) => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.setZoom(zoomLevel);
  }, []);

  const getMarkers = useCallback(() => {
    return markersRef.current;
  }, []);

  useEffect(() => {
    const handleMapLoad = () => {
      if (window.naver?.maps) {
        initializeMap();
      }
    };

    if (window.naver?.maps) {
      initializeMap();
    } else {
      window.addEventListener('naver-maps-loaded', handleMapLoad);
    }

    return () => {
      window.removeEventListener('naver-maps-loaded', handleMapLoad);
      clearMarkers();
    };
  }, [initializeMap, clearMarkers]);

  return {
    mapRef,
    mapInstance: mapInstanceRef.current,
    isLoaded,
    addMarker,
    clearMarkers,
    setCenter,
    setZoom,
    getMarkers,
  };
}
