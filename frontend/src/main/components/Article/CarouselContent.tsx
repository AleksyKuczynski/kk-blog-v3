// src/main/components/Article/CarouselContent.tsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { CarouselItem } from '@/main/lib/markdown/types';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CarouselContentProps {
  images: CarouselItem[];
}

export function CarouselContent({ images }: CarouselContentProps) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      className="w-full h-full"
    >
      {images.map((item, index) => (
        <SwiperSlide key={index} className="flex flex-col items-center justify-center w-full h-full">
          <div className="relative w-full h-full">
            <div 
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: item.content || '' }}
            />
          </div>
          {item.caption && (
            <div 
              className="absolute bottom-0 left-0 right-0 p-4 bg-bgcolor-alt bg-opacity-80 text-txcolor"
              dangerouslySetInnerHTML={{ __html: item.caption }} 
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}