import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { IMAGES } from '@/constant/imagePath';
import { NavigateFunction } from 'react-router-dom';

interface PromotionalBannerProps {
  navigate: NavigateFunction;
}

interface BannerItem {
  id: number;
  action: () => void;
  mobileImage: string;
  desktopImage: string;
}

const PromotionalBanner: React.FC<PromotionalBannerProps> = ({ navigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const bannerData: BannerItem[] = [
    {
      id: 1,
      action: () => navigate('/chatbot'),
      mobileImage: IMAGES.BANNER.TACO_SIGNAL,
      desktopImage: IMAGES.BANNER.TACO_SIGNAL_DESKTOP,
    },
    {
      id: 2,
      action: () => navigate('/plans'),
      mobileImage: IMAGES.BANNER.NERGET_PLAN,
      desktopImage: IMAGES.BANNER.NERGET_PLAN_DESKTOP,
    },
    {
      id: 3,
      action: () => navigate('/hotplace'),
      mobileImage: IMAGES.BANNER.HOTPLACE,
      desktopImage: IMAGES.BANNER.HOTPLACE_DESKTOP,
    },
    {
      id: 4,
      action: () => navigate('/mission', { state: { scrollTo: 'uplus' } }),
      mobileImage: IMAGES.BANNER.UPTP,
      desktopImage: IMAGES.BANNER.UPTP_DESKTOP,
    },
  ];

  const currentBanner = bannerData[currentSlide];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % bannerData.length);
  }, [bannerData.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + bannerData.length) % bannerData.length);
  }, [bannerData.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // 자동 슬라이드 효과
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(nextSlide, 5000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, nextSlide]);

  return (
    <div className="relative w-full md:max-w-4xl md:mx-auto rounded-lg overflow-hidden shadow-lg mb-4">
      {/* 모바일용 */}
      <div className="block md:hidden" style={{ aspectRatio: '327/263' }}>
        <img
          src={currentBanner.mobileImage}
          alt={`배너 이미지 ${currentSlide + 1}`}
          className="w-full h-full object-cover transition-all duration-500 ease-in-out cursor-pointer"
          onClick={currentBanner.action}
        />
      </div>

      {/* 크로스플랫폼 대응 */}
      <div className="hidden md:block" style={{ aspectRatio: '581/168' }}>
        <img
          src={currentBanner.desktopImage}
          alt={`배너 이미지 ${currentSlide + 1}`}
          className="w-full h-full object-cover transition-all duration-500 ease-in-out cursor-pointer"
          onClick={currentBanner.action}
        />
      </div>

      {/* 네비게이션 화살표 */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 transform -translate-y-1/2 left-2
                   w-7 h-7 flex items-center justify-center
                   bg-black/10 hover:bg-black/30 
                   rounded-full transition-all duration-200 backdrop-blur-sm"
        aria-label="이전 슬라이드"
      >
        <ChevronLeft className="text-white w-3 h-3 md:w-5 md:h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 transform -translate-y-1/2 right-2
                   w-7 h-7 flex items-center justify-center
                   bg-black/10 hover:bg-black/30 
                   rounded-full transition-all duration-200 backdrop-blur-sm"
        aria-label="다음 슬라이드"
      >
        <ChevronRight className="text-white w-3 h-3 md:w-5 md:h-5" />
      </button>

      {/* 하단 컨트롤 영역 */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 
                      flex items-center justify-center 
                      bg-black/10 rounded-full backdrop-blur-sm
                      bottom-2 md:bottom-1 space-x-2 md:space-x-1 px-4 md:px-2 py-2 md:py-1"
      >
        {/* 인디케이터 dots */}
        <div className="flex space-x-2">
          {bannerData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-200 
                         ${
                           index === currentSlide
                             ? 'bg-white w-4 h-2'
                             : 'bg-white/50 hover:bg-white/70 w-2 h-2'
                         }`}
              aria-label={`슬라이드 ${index + 1}로 이동`}
            />
          ))}
        </div>

        {/* 재생/정지 버튼 */}
        <button
          onClick={togglePlayPause}
          className="w-6 h-6 flex items-center justify-center
                     bg-white/20 hover:bg-white/30 rounded-full 
                     transition-all duration-200 ml-2"
          aria-label={isPlaying ? '자동 재생 정지' : '자동 재생 시작'}
        >
          {isPlaying ? (
            <Pause className="w-3 h-3 text-white" />
          ) : (
            <Play className="w-3 h-3 text-white ml-0.5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PromotionalBanner;
