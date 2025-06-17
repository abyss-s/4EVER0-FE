import React from 'react';
import SharePopover from '@/pages/share/SharePopover';

const ShareTest: React.FC = () => {
  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">SNS 공유 테스트</h2>
      <SharePopover
        content_title="당신의 컨텐츠를 공유해보세요!" // 앱에서 공유 팝오버에 띄울 메시지
        shareUrl="https://example.com"
        sharemUrl="https://example.com"
        shareimage="https://d3e0ocbonj571p.cloudfront.net/MoonoZ.png"
        sharetitle="깜짝 선물 등장!"
        sharedescription="선물을 열어보세요!"
      />
    </div>
  );
};

export default ShareTest;
