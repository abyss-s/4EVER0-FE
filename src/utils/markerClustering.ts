interface MarkerClusteringOptions {
  minClusterSize?: number;
  maxZoom?: number;
  map: naver.maps.Map;
  markers: naver.maps.Marker[];
  disableClickZoom?: boolean;
  gridSize?: number;
  icons?: Array<{
    content: string;
    size: naver.maps.Size;
    anchor: naver.maps.Point;
  }>;
  indexGenerator?: number[];
  stylingFunction?: (
    clusterMarker: { getElement: () => HTMLElement | null },
    count: number,
  ) => void;
}

export interface MarkerClusteringInstance {
  setMap: (map: naver.maps.Map | null) => void;
}

declare global {
  interface Window {
    MarkerClustering?: new (options: MarkerClusteringOptions) => MarkerClusteringInstance;
  }
}

export const createClusterIcons = () => {
  const baseStyle = `
    cursor: pointer;
    color: white;
    text-align: center;
    font-weight: bold;
    border-radius: 50%;
    border: 2px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  return [
    {
      content: `<div style="${baseStyle}
        width: 40px;
        height: 40px;
        font-size: 12px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        box-shadow: 0 2px 8px rgba(102,126,234,0.4);
      "></div>`,
      size: new naver.maps.Size(40, 40),
      anchor: new naver.maps.Point(20, 20),
    },
    {
      content: `<div style="${baseStyle}
        width: 50px;
        height: 50px;
        font-size: 14px;
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        box-shadow: 0 2px 12px rgba(245,87,108,0.4);
      "></div>`,
      size: new naver.maps.Size(50, 50),
      anchor: new naver.maps.Point(25, 25),
    },
    {
      content: `<div style="${baseStyle}
        width: 60px;
        height: 60px;
        font-size: 16px;
        background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
        box-shadow: 0 2px 16px rgba(252,182,159,0.4);
      "></div>`,
      size: new naver.maps.Size(60, 60),
      anchor: new naver.maps.Point(30, 30),
    },
  ];
};

export const createMarkerClustering = (
  mapInstance: naver.maps.Map,
  markers: naver.maps.Marker[],
): MarkerClusteringInstance | null => {
  if (!window.MarkerClustering) {
    console.warn('MarkerClustering 라이브러리가 로드되지 않았습니다.');
    return null;
  }

  const icons = createClusterIcons();

  return new window.MarkerClustering({
    minClusterSize: 2,
    maxZoom: 12,
    map: mapInstance,
    markers: markers,
    disableClickZoom: false,
    gridSize: 120,
    icons: icons,
    indexGenerator: [10, 50, 100],
    stylingFunction: function (
      clusterMarker: { getElement: () => HTMLElement | null },
      count: number,
    ) {
      const element = clusterMarker.getElement();
      if (element) {
        const div = element.querySelector('div');
        if (div) {
          div.textContent = count.toString();
        }
      }
    },
  });
};
