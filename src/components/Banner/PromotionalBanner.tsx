import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/Button';

interface PromotionalBannerProps {
  navigate: (path: string) => void;
}

const PromotionalBanner: React.FC<PromotionalBannerProps> = ({ navigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const bannerData = [
    {
      id: 1,
      title: '🤖 AI 챗봇과 대화하세요!',
      description: '타코시그널, 무너말투로 재미있게\n좋아요 기능으로 더 스마트하게',
      buttonText: '챗봇 체험하기',
      action: () => navigate('/chatbot'),
      gradient: 'from-[#F4DE75] to-yellow-300',
    },
    {
      id: 2,
      title: '📅 캘린더로 미션 완성!',
      description: '매일 출석체크하고\n다양한 미션을 완료해보세요',
      buttonText: '캘린더 보기',
      action: () => navigate('/calendar'),
      gradient: 'from-blue-400 to-blue-300',
    },
    {
      id: 3,
      title: '📍 내 주변 핫플레이스',
      description: '위치기반 팝업스토어와\n특별한 쿠폰을 만나보세요',
      buttonText: '핫플 둘러보기',
      action: () => navigate('/hotplace'),
      gradient: 'from-green-400 to-green-300',
    },
    {
      id: 4,
      title: '👤 마이페이지 기능들',
      description: '다양한 개인화 기능과\n맞춤 서비스를 이용하세요',
      buttonText: '내 정보 보기',
      action: () => navigate('/mypage'),
      gradient: 'from-pink-400 to-pink-300',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerData.length) % bannerData.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // 자동 슬라이드 효과
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(nextSlide, 2000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const currentBanner = bannerData[currentSlide];

  return (
    <div className="relative flex flex-col items-center justify-center flex-1 px-6 py-12 min-h-[20vh] bg-gradient-to-br from-[#F4DE75] to-yellow-300 rounded-lg text-center shadow-md mb-4 overflow-hidden">
      {/* 배경 장식 원들 (기존과 동일) */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 rounded-full z-0" />
      <div className="absolute bottom-0 -right-12 w-44 h-44 bg-white/20 rounded-full z-0" />

      {/* 슬라이드 컨텐츠 */}
      <div className="relative z-10 transition-all duration-500 ease-in-out">
        <div className="text-4xl mb-4">{currentBanner.title.match(/[🤖📅📍👤]/)?.[0]}</div>
        <h1 className="text-3xl font-bold text-[#25394B] mb-3">
          {currentBanner.title.replace(/[🤖📅📍👤]\s*/, '')}
        </h1>
        <p className="text-[#25394B] mb-6 whitespace-pre-line">{currentBanner.description}</p>
        <Button variant="link" onClick={currentBanner.action}>
          {currentBanner.buttonText}
        </Button>
      </div>

      {/* 네비게이션 화살표 */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 
                rounded-full p-2 transition-all duration-200 backdrop-blur-sm"
      >
        <ChevronLeft className="w-5 h-5 text-[#25394B]" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 
                rounded-full p-2 transition-all duration-200 backdrop-blur-sm"
      >
        <ChevronRight className="w-5 h-5 text-[#25394B]" />
      </button>

      {/* 하단 컨트롤 영역 */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-between w-48 bg-black/20 rounded-full px-4 py-2 backdrop-blur-sm">
        {/* 인디케이터 dots */}
        <div className="flex space-x-2">
          {bannerData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentSlide ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* 페이지 카운터 */}
        <div className="text-white/80 text-sm font-medium flex items-center mx-3">
          <span>{currentSlide + 1}</span>
          <span className="mx-1">/</span>
          <span>{bannerData.length}</span>
        </div>

        {/* 재생/정지 버튼 */}
        <button
          onClick={togglePlayPause}
          className="bg-white/20 hover:bg-white/30 rounded-full p-1.5 transition-all duration-200 flex-shrink-0"
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
