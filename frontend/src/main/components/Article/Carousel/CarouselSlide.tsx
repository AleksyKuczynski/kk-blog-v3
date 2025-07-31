// src/main/components/Article/Carousel/CarouselSlide.tsx
import { memo } from 'react';
import { CarouselDimensions } from "./carouselTypes";
import { CarouselItemWithBehavior, CaptionMode, Caption } from "../Captions";
import { CarouselImage } from "./CarouselImage";

interface CarouselSlideProps {
  image: CarouselItemWithBehavior;
  isActive: boolean;
  position: -1 | 0 | 1;
  dimensions: CarouselDimensions;
  navigationLayout: 'horizontal' | 'vertical';
  captionsVisible: boolean;
  onCaptionClick: () => void;
  onCaptionModeChange: (mode: CaptionMode) => void;
  captionEvaluationTrigger?: number; // Forces caption re-evaluation
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
  onCaptionModeChange,
  captionEvaluationTrigger, // Now properly used
  is2SlideCarousel = false
}: CarouselSlideProps) {
  
  const shouldShowCaption = (): boolean => {
    // Don't show if captions are globally hidden
    if (!captionsVisible) return false;
    
    // Don't show if no caption content
    if (!image.captionBehavior.hasContent) return false;
    
    // FIXED: In 2-slide carousel, show caption on center position (position === 0)
    // In multi-slide carousel, show caption when slide is active (isActive === true)
    if (is2SlideCarousel) {
      return position === 0; // Center position only
    }
    
    // In multi-slide carousel, show caption when slide is active
    return isActive;
  };
  
  // Debug logging for caption visibility
  console.log(`Slide ${image.imageAttributes.src}: isActive=${isActive}, position=${position}, shouldShow=${shouldShowCaption()}, hasContent=${image.captionBehavior.hasContent}`);
  
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
        <Caption
          content={image.processedCaption}
          behavior={image.captionBehavior}
          visible={captionsVisible}
          onCaptionClick={onCaptionClick}
          onModeChange={onCaptionModeChange}
          navigationLayout={navigationLayout}
          isActive={isActive}
          imageHeight={dimensions.height}
          captionEvaluationTrigger={captionEvaluationTrigger} // FIXED: Now passed properly
        />
      )}
    </div>
  );
});