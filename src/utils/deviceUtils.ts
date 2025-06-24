export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;

  // 모바일 기기 감지 (태블릿 제외)
  const userAgent = window.navigator.userAgent;
  const mobileRegex = /Android.*Mobile|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i;

  // 화면 크기로도 체크 (480px 이하는 모바일)
  const isSmallScreen = window.innerWidth <= 480;

  return mobileRegex.test(userAgent) || isSmallScreen;
};

export const isTablet = (): boolean => {
  if (typeof window === 'undefined') return false;

  const userAgent = window.navigator.userAgent;
  const tabletRegex = /iPad|Android(?!.*Mobile)/i;

  // 화면 크기로도 체크 (481px ~ 1024px는 태블릿)
  const isMediumScreen = window.innerWidth > 480 && window.innerWidth <= 1024;

  return tabletRegex.test(userAgent) || isMediumScreen;
};
