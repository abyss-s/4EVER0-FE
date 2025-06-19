import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/Popover';
import { FocusableButton } from '@/components/Popover/FocusableButton';
import { Copy, MoreHorizontal } from 'lucide-react';
import { AvatarComponent } from '@/components/Avatar';
import { useKakaoInit, kakaoShare, KakaoShareParams } from '@/pages/share/KakaoShare';
import { useFacebookShare } from '@/pages/share/useFacebookShare';
import { useTwitterShare } from '@/pages/share/useTwitterShare';
import { useShare } from '@/pages/share/useShare';
import { ICONS } from '@/constant/iconPath';

interface SharePopoverProps {
  content_title: string;
  shareUrl: string;
  sharemUrl: string;
  shareimage: string;
  sharetitle: string;
  sharedescription: string;
}

const SharePopover: React.FC<SharePopoverProps> = ({
  content_title, // 앱에서 공유 팝오버에 띄울 메시지
  shareUrl,
  sharemUrl,
  shareimage,
  sharetitle,
  sharedescription,
}) => {
  // 카카오톡 SDK 초기화 훅
  const kakaoInitialized = useKakaoInit(import.meta.env.VITE_KAKAO_JS_KEY);

  const shareData: KakaoShareParams = {
    title: sharetitle, // 공유 게시물 제목
    description: sharedescription, // 공유 게시물 설명란
    imageUrl: shareimage, // 공유 게시물 대표 이미지
    mobileWebUrl: sharemUrl, // 모바일 링크
    webUrl: shareUrl, // 웹 링크
  };

  const shareData_etc = {
    title: sharetitle,
    text: sharedescription,
    url: shareUrl,
  };

  // 카카오톡 공유 함수 (초기화 완료 후만 작동)
  const handleKakaoShare = () => {
    if (!kakaoInitialized) {
      alert('카카오 SDK 초기화 중입니다. 잠시만 기다려주세요.');
      return;
    }
    kakaoShare(shareData);
  };

  // 다른 SNS 공유 훅
  const { share: handleFacebookShare } = useFacebookShare({ webUrl: shareUrl });
  const { share: handleTwitterShare } = useTwitterShare(shareData);
  const { share: handleMoreShare } = useShare(shareData_etc);

  const SNS_ICON_DATA = [
    {
      name: '카카오톡',
      onClick: handleKakaoShare,
      fallback: 'KK',
      src: ICONS.KAKAO_ICON,
    },
    {
      name: 'Facebook',
      onClick: handleFacebookShare,
      fallback: 'FB',
      src: ICONS.FACEBOOK_ICON,
    },
    {
      name: 'X',
      onClick: handleTwitterShare,
      fallback: 'X',
      src: ICONS.X_ICON,
    },
    { name: '더보기', onClick: handleMoreShare, icon: <MoreHorizontal className="h-8 w-8" /> },
  ];

  const [copySuccess, setCopySuccess] = useState('');

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess('복사 완료!');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch {
      setCopySuccess('복사 실패');
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FocusableButton
          variant="gradient-pink"
          size="xl"
          className="w-full touch-manipulation flex items-center justify-center gap-3"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <span className="inline-block text-xl">📤</span>
          <span>친구들에게 공유하기</span>
        </FocusableButton>
      </PopoverTrigger>

      <PopoverContent variant="light" side="bottom" sideOffset={8} className="w-80 p-4">
        <h3 className="font-semibold text-lg mb-1">컨텐츠 공유하기</h3>
        <p className="text-sm text-gray-600 mb-4">{content_title}</p>

        <div className="flex justify-between mb-4">
          {SNS_ICON_DATA.map(({ name, onClick, fallback, src, icon }) => (
            <button
              key={name}
              onClick={onClick}
              aria-label={`${name} 공유`}
              className="flex flex-col items-center space-y-1 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
              type="button"
            >
              {icon ? icon : <AvatarComponent src={src} fallback={fallback} />}
              <span className="text-xs">{name}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center border rounded-md border-gray-300 p-2">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="flex-grow bg-transparent text-sm outline-none"
            aria-label="공유 링크"
          />
          <button
            onClick={handleCopyClick}
            aria-label="링크 복사"
            className="ml-2 p-1 rounded hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
            type="button"
          >
            <Copy className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        {copySuccess && <p className="text-xs text-green-600 mt-1">{copySuccess}</p>}
      </PopoverContent>
    </Popover>
  );
};

export default SharePopover;
