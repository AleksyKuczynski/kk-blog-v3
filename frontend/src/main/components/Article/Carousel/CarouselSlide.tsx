// src/main/components/Article/Carousel/CarouselSlide.tsx
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
  captionsVisible: boolean; // FIXED: Added missing prop
  onCaptionClick: () => void;
  is2SlideCarousel?: boolean;
}

export const CarouselSlide = memo(function CarouselSlide({ 
  image, 
  isActive, 
  position,
  dimensions,
  navigationLayout,
  captionsVisible, // FIXED: Added missing prop
  onCaptionClick,
  is2SlideCarousel = false
}: CarouselSlideProps) {
  
  const shouldShowCaption = (): boolean => {
    // FIXED: Don't show if captions are globally hidden
    if (!captionsVisible) return false;
    
    // Don't show if no caption content
    if (image.processedCaption.trim() === '') return false;
    
    // In 2-slide carousel, only show caption on center position
    if (is2SlideCarousel) {
      return position === 0; // Center position
    }
    
    // In multi-slide carousel, show caption when slide is active
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
          captionState={image.captionState} // CHANGED from expanded={image.expandedCaption}
          visible={captionsVisible}
          onCaptionClick={onCaptionClick}
          navigationLayout={navigationLayout}
          isActive={isActive}
          imageHeight={dimensions.height}
        />
      )}
    </div>
  );
});