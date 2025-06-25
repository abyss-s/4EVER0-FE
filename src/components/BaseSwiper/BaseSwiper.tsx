import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import React from 'react';

interface BaseSwiperProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  slideWidth?: number | string; // 사용 안 할 경우엔 제거 가능
}

export function BaseSwiper<T>({ items, renderItem }: BaseSwiperProps<T>) {
  const isSingleSlide = items.length === 1;

  return (
    <div className="w-full max-w-sm mx-auto">
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={16}
        slidesPerView={1}
        pagination={isSingleSlide ? false : { clickable: true }}
        navigation={!isSingleSlide}
        className={isSingleSlide ? '' : '!pb-12'}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>{renderItem(item)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
