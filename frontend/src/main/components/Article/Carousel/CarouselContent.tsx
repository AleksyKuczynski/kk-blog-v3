// src/main/components/Article/Carousel/CarouselContent.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CarouselItem } from '@/main/lib/markdown/types';
import { twMerge } from 'tailwind-merge';
import { CarouselDimensions } from '@/main/lib/utils/calculateCarouselDimensions';

interface CarouselContentProps {
  images: CarouselItem[];
  dimensions: CarouselDimensions;
}

export function CarouselContent({ images, dimensions }: CarouselContentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedCaption, setExpandedCaption] = useState(false);

  const imageStyles = twMerge(
    'object-cover transition-all duration-300',
    dimensions.imageDisplayMode === 'center-horizontal' && 'object-[50%_50%]',
    dimensions.imageDisplayMode === 'center-vertical' && 'object-[50%_50%]'
  );

  const captionStyles = twMerge(
    'px-4 py-2 bg-sf-cont text-on-sf-var transition-all duration-300',
    'theme-default:bg-opacity-95',
    'theme-rounded:bg-opacity-90',
    'theme-sharp:border-t theme-sharp:border-prcolor',
    expandedCaption && 'cursor-pointer',
    !expandedCaption && 'line-clamp-4 cursor-pointer'
  );

  const indicatorStyles = twMerge(
    'flex justify-center gap-2 p-2',
    'theme-default:mt-2',
    'theme-rounded:mt-3',
    'theme-sharp:mt-1'
  );

  return (
    <div className="relative h-full">
      <div className="relative h-full" style={{ height: dimensions.imageHeight }}>
        <Image
          src={images[currentIndex].imageAttributes.src}
          alt={images[currentIndex].imageAttributes.alt}
          fill
          className={imageStyles}
          priority={currentIndex === 0}
        />
      </div>

      {images[currentIndex].processedCaption && (
        <div 
          className={captionStyles}
          onClick={() => setExpandedCaption(!expandedCaption)}
          dangerouslySetInnerHTML={{ 
            __html: images[currentIndex].processedCaption || '' 
          }}
        />
      )}

      <div className={indicatorStyles}>
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex 
                ? 'bg-pr-cont w-4' 
                : 'bg-sf-hi'
            }`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
}