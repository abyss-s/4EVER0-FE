import { useCallback } from 'react';

interface ShareData {
  title: string;
  description?: string;
  webUrl: string;
}

export const useTwitterShare = (shareData: ShareData) => {
  const share = useCallback(() => {
    const text = encodeURIComponent(
      `${shareData.title}${shareData.description ? ' - ' + shareData.description : ''}`,
    );
    const url = encodeURIComponent(shareData.webUrl);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;

    // 팝업 크기 예시 (데스크톱 기준)
    const width = 600;
    const height = 400;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    window.open(
      twitterUrl,
      '_blank',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`,
    );
  }, [shareData.title, shareData.description, shareData.webUrl]);

  return { share };
};
