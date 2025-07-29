// src/main/components/Article/Carousel/CarouselSlide.tsx
import { memo } from 'react';
import { CarouselDimensions } from "./carouselTypes";
import { CarouselItemWithBehavior, CaptionMode } from "./captionTypes";
import { CarouselImage } from "./CarouselImage";
import { CarouselCaption } from "./CarouselCaption";

interface CarouselSlideProps {
  image: CarouselItemWithBehavior; // UPDATED: Use new type with behavior
  isActive: boolean;
  position: -1 | 0 | 1;
  dimensions: CarouselDimensions;
  navigationLayout: 'horizontal' | 'vertical';
  captionsVisible: boolean;
  onCaptionClick: () => void;
  onCaptionModeChange: (mode: CaptionMode) => void; // NEW: Handler for mode changes
  is2SlideCarousel?: boolean;
}

export const CarouselSlide = memo(function CarouselSlide({ 
  image, 
  isActive, 
  position,
  dimensions,
  navigationLayout,
  captionsVisible,
  onCaptionClick,
  onCaptionModeChange, // NEW: Mode change handler
  is2SlideCarousel = false
}: CarouselSlideProps) {
  
  const shouldShowCaption = (): boolean => {
    // Don't show if captions are globally hidden
    if (!captionsVisible) return false;
    
    // Don't show if no caption content
    if (!image.captionBehavior.hasContent) return false;
    
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
          behavior={image.captionBehavior} // UPDATED: Pass behavior object
          visible={captionsVisible}
          onCaptionClick={onCaptionClick}
          onModeChange={onCaptionModeChange} // NEW: Pass mode change handler
          navigationLayout={navigationLayout}
          isActive={isActive}
          imageHeight={dimensions.height}
        />
      )}
    </div>
  );
});