import { useEffect, useState } from 'react';
import { Benefit } from '@/types/uplus';
import { getMonthlyBenefits } from '@/apis/uplus/benefit';
import { calcDday } from '@/utils/calcDday';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
// import styles from './UplusBenefit.module.css';
// import { Card, CardContent } from '@/components/Card';

export const UplusBenefitPreview = () => {
  const [benefits, setBenefits] = useState<Benefit[] | null>(null);

  useEffect(() => {
    getMonthlyBenefits()
      .then((data) => {
        setBenefits(data);
      })
      .catch((err) => {
        console.error('❌ 유플 혜택 조회 실패:', err);
      });
  }, []);

  if (benefits === null) {
    return <p className="text-sm text-gray-400 px-2">혜택을 불러오는 중입니다...</p>;
  }

  // 브랜드별 배경색 매핑
  const getBrandBackgroundColor = (brand: string) => {
    const colorMap: { [key: string]: string } = {
      MIXXO: 'bg-gray-400',
      CGV: 'bg-red-500',
      LG생활건강: 'bg-pink-400',
      GS25: 'bg-blue-500',
      리디셀렉트: 'bg-blue-400',
      배스킨라빈스: 'bg-pink-500',
      CU: 'bg-green-400',
      교보문고: 'bg-blue-600',
      이디야커피: 'bg-blue-800',
      뚜레쥬르: 'bg-green-800',
      맘스터치: 'bg-yellow-300',
      올리브영: 'bg-green-500',
      무신사: 'bg-slate-400',
      티빙: 'bg-red-500',
    };
    return colorMap[brand] || 'bg-gray-400';
  };

  return (
    <div className="w-full">
      <Swiper
        slidesPerView="auto"
        spaceBetween={12}
        freeMode={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[FreeMode, Pagination]}
        className="benefit-swiper"
        style={{
          paddingBottom: '30px', // 페이지네이션 공간 확보
        }}
      >
        {benefits.map((benefit, index) => {
          const dday = calcDday(benefit.date ?? '');

          return (
            <SwiperSlide key={`${benefit.brand}-${benefit.date}-${index}`} className="!w-auto">
              <div
                className={`w-[100px] h-[100px] ${getBrandBackgroundColor(benefit.brand)} flex-shrink-0 rounded-3xl relative overflow-hidden`}
              >
                {/* D-day - 왼쪽 상단 */}
                <div className="absolute top-2.5 left-4 text-white font-semibold text-base z-10 tracking-wider">
                  {dday}
                </div>

                {/* 브랜드 로고 - 오른쪽 하단, 원형 */}
                <div className="absolute bottom-3 right-3 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg z-10">
                  <img
                    src={benefit.imageUrl}
                    alt={benefit.brand}
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const fallbackElement = target.parentElement?.querySelector(
                        '.fallback-text',
                      ) as HTMLElement;
                      if (fallbackElement) {
                        fallbackElement.style.display = 'flex';
                      }
                    }}
                  />
                  <div className="fallback-text w-full h-full rounded-full bg-gray-100 items-center justify-center text-xs font-bold text-gray-600 hidden">
                    {benefit.brand.slice(0, 2)}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
