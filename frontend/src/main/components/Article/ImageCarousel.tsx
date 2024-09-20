// src/main/components/Article/ImageCarousel.tsx
'use client'

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { CarouselItem } from '@/main/lib/markdown/types';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ImageCarouselProps {
  images: CarouselItem[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.update();
    }
  }, [images, swiperInstance]);

  return (
    <div className="carousel-container w-full h-full">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper: SwiperType) => setSwiperInstance(swiper)}
        onSlideChange={() => console.log('Slide changed')}
        className="w-full h-full"
      >
        {images.map((item, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            {item.type === 'figure' ? (
              <figure className="w-full h-full flex flex-col justify-center items-center">
                <div 
                  dangerouslySetInnerHTML={{ __html: item.content || '' }} 
                  className="w-full h-full flex justify-center items-center"
                />
                {item.caption && (
                  <figcaption 
                    dangerouslySetInnerHTML={{ __html: item.caption }} 
                    className="mt-2 text-center text-sm text-gray-600"
                  />
                )}
              </figure>
            ) : (
              <div 
                dangerouslySetInnerHTML={{ __html: item.content || '' }} 
                className="w-full h-full flex justify-center items-center"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCarousel;