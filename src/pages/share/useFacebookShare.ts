import { useCallback } from 'react';

interface ShareData {
  webUrl: string;
}

export const useFacebookShare = (shareData: ShareData) => {
  const share = useCallback(() => {
    const url = encodeURIComponent(shareData.webUrl);
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;

    // 모바일 팝업 크기: iPhone se 크기 기준 예시
    const width = 375;
    const height = 667;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    window.open(
      facebookUrl,
      '_blank',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`,
    );
  }, [shareData.webUrl]);

  return { share };
};
