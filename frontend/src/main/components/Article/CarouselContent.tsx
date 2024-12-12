// src/main/components/Article/CarouselContent.tsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ArticleImage } from './elements/Image';
import { CarouselItem } from '@/main/lib/markdown/types';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CarouselContentProps {
  images: CarouselItem[];
  styles: {
    slide: string;
    figure: string;
    caption: string;
  };
}

export function CarouselContent({ images, styles }: CarouselContentProps) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      className="w-full h-full"
    >
      {images.map((item, index) => {
        const match = item.content.match(/!\[(.*?)\]\((.*?)\)/);
        if (!match) return null;
        
        const [, alt, src] = match;
        
        return (
          <SwiperSlide key={index} className={styles.slide}>
            <div className="flex items-center justify-center w-full h-full">
              <ArticleImage 
                src={src} 
                alt={alt} 
                caption={item.caption}
              />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}