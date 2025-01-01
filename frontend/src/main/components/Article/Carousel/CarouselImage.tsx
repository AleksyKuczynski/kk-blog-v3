// src/main/components/Article/Carousel/CarouselImage.tsx
import Image from 'next/image';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';

interface CarouselImageProps {
  src: string;
  alt: string;
  title?: string;
  priority?: boolean;
  displayMode: 'center-horizontal' | 'center-vertical' | 'square';
}

export const CarouselImage = memo(function CarouselImage({
  src,
  alt,
  title,
  priority = false,
  displayMode
}: CarouselImageProps) {
  return (
    <div className="absolute inset-0">
      <Image
        src={src}
        alt={alt}
        title={title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
        className={twMerge(
          'object-cover transition-transform duration-300',
          displayMode === 'center-horizontal' && 'object-center',
          displayMode === 'center-vertical' && 'object-center'
        )}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
      />
    </div>
  );
});