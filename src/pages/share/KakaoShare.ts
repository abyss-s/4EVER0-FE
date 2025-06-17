import { useState, useEffect } from 'react';
declare global {
  interface Window {
    Kakao: {
      isInitialized: () => boolean;
      init: (key: string) => void;
      Link: {
        sendDefault: (params: unknown) => void; // 필요하면 더 상세 타입 작성
      };
    };
  }
}

export interface KakaoShareParams {
  title: string;
  description: string;
  imageUrl: string;
  mobileWebUrl: string;
  webUrl: string;
}

export const loadKakaoSDK = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.Kakao) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('카카오 SDK 로드 실패'));
    document.head.appendChild(script);
  });
};

export const useKakaoInit = (jsKey: string) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    loadKakaoSDK()
      .then(() => {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(jsKey);
          console.log('카카오 SDK 초기화 완료');
        }
        setInitialized(true);
      })
      .catch(console.error);
  }, [jsKey]);

  return initialized;
};

// 공유 함수
export const kakaoShare = (params: KakaoShareParams): void => {
  if (!window.Kakao || !window.Kakao.isInitialized()) {
    console.error('Kakao SDK가 초기화되지 않았습니다. initKakao 먼저 호출하세요.');
    return;
  }

  window.Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: params.title,
      description: params.description,
      imageUrl: params.imageUrl,
      link: {
        mobileWebUrl: params.mobileWebUrl,
        webUrl: params.webUrl,
      },
    },
    buttons: [
      {
        title: '웹으로 보기',
        link: {
          mobileWebUrl: params.mobileWebUrl,
          webUrl: params.webUrl,
        },
      },
    ],
    installTalk: true,
  });
};
