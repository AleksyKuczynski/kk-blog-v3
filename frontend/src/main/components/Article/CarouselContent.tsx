// src/main/components/Article/CarouselContent.tsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { CarouselItem } from '@/main/lib/markdown/types';
import { ArticleImage } from './elements/Image';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CarouselContentProps {
  images: CarouselItem[];
}

const captionStyles = [
  // Base styles
  'absolute bottom-0 left-0 right-0 p-4 bg-bgcolor-alt bg-opacity-80',
  'text-sm text-txcolor-secondary',
  // Theme variants
  'theme-default:bg-opacity-90',
  'theme-rounded:bg-opacity-85 theme-rounded:rounded-t-lg',
  'theme-sharp:border-t theme-sharp:border-prcolor'
].join(' ');

export function CarouselContent({ images }: CarouselContentProps) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true, bulletActiveClass: 'swiper-pagination-bullet-active' }}
      className="w-full h-full"
    >
      {images.map((item, index) => (
        <SwiperSlide key={index} className="flex flex-col items-center justify-center w-full h-full">
          <div className="relative w-full h-full">
            <ArticleImage
              src={item.imageAttributes.src}
              alt={item.imageAttributes.alt}
              width={item.imageAttributes.width || 1200}
              height={item.imageAttributes.height || 800}
            />
            {item.processedCaption && (
              <div 
                className={captionStyles}
                dangerouslySetInnerHTML={{ __html: item.processedCaption }}
              />
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}