// src/main/components/Article/Carousel/CarouselSlide.tsx
import { memo } from 'react';
import { CarouselItem } from "@/main/lib/markdown/markdownTypes";
import { CarouselDimensions } from "./carouselTypes";
import { CarouselImage } from "./CarouselImage";
import { CarouselCaption } from "./CarouselCaption";

interface CarouselSlideProps {
  image: CarouselItem;
  isActive: boolean;
  position: -1 | 0 | 1;  // pozycja względna: poprzedni, aktualny, następny
  dimensions: CarouselDimensions;
  navigationLayout: 'horizontal' | 'vertical';
  onCaptionClick: () => void;
}

export const CarouselSlide = memo(function CarouselSlide({ 
  image, 
  isActive, 
  position,
  dimensions,
  navigationLayout,
  onCaptionClick
}: CarouselSlideProps) {
  return (
    <div 
      className="absolute inset-0 w-full h-full transition-transform duration-300"
      style={{
        transform: `translateX(${position * 100}%)`,
        zIndex: isActive ? 10 : 0,
      }}
    >
      <CarouselImage 
        src={image.imageAttributes.src}
        alt={image.imageAttributes.alt}
        title={image.imageAttributes.title}
        priority={isActive}
        displayMode={dimensions.imageDisplayMode}
      />
      {image.processedCaption && (
        <CarouselCaption
          content={image.processedCaption}
          expanded={image.expandedCaption}
          onClick={onCaptionClick}
          navigationLayout={navigationLayout}
          isActive={isActive}
        />
      )}
    </div>
  );
});