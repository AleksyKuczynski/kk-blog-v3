// Updated CarouselSlide.tsx to pass imageHeight to caption

import { memo } from 'react';
import { CarouselItem } from "@/main/lib/markdown/markdownTypes";
import { CarouselDimensions } from "./carouselTypes";
import { CarouselImage } from "./CarouselImage";
import { CarouselCaption } from "./CarouselCaption";

interface CarouselSlideProps {
  image: CarouselItem;
  isActive: boolean;
  position: -1 | 0 | 1;
  dimensions: CarouselDimensions;
  navigationLayout: 'horizontal' | 'vertical';
  onCaptionClick: () => void;
  is2SlideCarousel?: boolean;
}

export const CarouselSlide = memo(function CarouselSlide({ 
  image, 
  isActive, 
  position,
  dimensions,
  navigationLayout,
  onCaptionClick,
  is2SlideCarousel = false
}: CarouselSlideProps) {
  
  const shouldShowCaption = (): boolean => {
    if (image.processedCaption.trim() === '') return false;
    
    if (is2SlideCarousel) {
      return position === 0; // Center position
    }
    
    return isActive;
  };
  
  return (
    <div 
      className="relative w-full h-full"
      style={{
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
      
      {shouldShowCaption() && (
        <CarouselCaption
          content={image.processedCaption}
          expanded={image.expandedCaption}
          onClick={onCaptionClick}
          navigationLayout={navigationLayout}
          isActive={isActive}
          imageHeight={dimensions.height} // Pass actual image height
        />
      )}
    </div>
  );
});