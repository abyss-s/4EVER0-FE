import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import React from 'react';
import 'swiper/css/navigation';

interface BaseSwiperProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  slideWidth?: number | string;
}

export function BaseSwiper<T>({ items, renderItem, slideWidth = 280 }: BaseSwiperProps<T>) {
  return (
    <Swiper
      modules={[Pagination, Navigation]}
      spaceBetween={16}
      slidesPerView={'auto'}
      pagination={{ clickable: true }}
      navigation={true}
      className="w-full px-2 !pb-9"
    >
      {items.map((item, idx) => (
        <SwiperSlide
          key={`slide-${idx}`}
          style={{ width: typeof slideWidth === 'number' ? `${slideWidth}px` : slideWidth }}
          className="!w-[280px] flex-shrink-0"
        >
          {renderItem(item)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
