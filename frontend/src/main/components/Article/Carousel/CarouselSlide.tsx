// src/main/components/Article/Carousel/CarouselSlide.tsx
import { memo } from 'react';
import { CarouselItem } from "@/main/lib/markdown/markdownTypes";
import { CarouselDimensions } from "./carouselTypes";
import { CarouselImage } from "./CarouselImage";
import { CarouselCaption } from "./CarouselCaption";

interface CarouselSlideProps {
  image: CarouselItem;
  isActive: boolean;
  position: -1 | 0 | 1;  // For compatibility (left, center, right)
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
  
  // Caption visibility logic for 2-slide carousel
  const shouldShowCaption = (): boolean => {
    if (!image.processedCaption) return false;
    
    // In 2-slide carousel, only show caption on center position to avoid duplicates
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
        // 🔴 REMOVED: No translateX positioning - slides are positioned by parent strip container
        zIndex: isActive ? 10 : 0,
      }}
    >
      <CarouselImage 
        src={image.imageAttributes.src}
        alt={image.imageAttributes.alt}
        title={image.imageAttributes.title}
        priority={isActive} // Prioritize active slide
        displayMode={dimensions.imageDisplayMode}
      />
      
      {shouldShowCaption() && (
        <CarouselCaption
          content={image.processedCaption}
          expanded={image.expandedCaption}
          onClick={onCaptionClick}
          navigationLayout={navigationLayout}
          isActive={isActive}
          maxHeight={dimensions.maxHeight ? Math.min(120, dimensions.maxHeight * 0.3) : 120}
        />
      )}
    </div>
  );
});