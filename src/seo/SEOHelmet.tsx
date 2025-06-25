import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHelmetProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEOHelmet: React.FC<SEOHelmetProps> = ({
  title = 'MoonoZ - AI 기반 요금제 및 구독 서비스 추천',
  description = 'MZ세대를 위한 AI 요금제 추천 서비스. 개인 맞춤형 통신요금제와 구독서비스를 추천받고 혜택을 확인하세요.',
  keywords = '요금제추천, 구독서비스, AI추천, 통신요금제, 쿠폰, 혜택, MZ세대',
  image = '/images/moonoz-og-image.png',
  url = 'https://4-ever-0-fe.vercel.app',
  type = 'website',
}) => {
  return (
    <Helmet>
      {/* 기본 메타데이터 */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter Card */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD 구조화 데이터 */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'MoonoZ',
          description: description,
          url: url,
          applicationCategory: 'UtilityApplication',
          operatingSystem: 'Web Browser',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'KRW',
          },
        })}
      </script>
    </Helmet>
  );
};
