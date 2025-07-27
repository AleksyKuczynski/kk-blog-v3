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
  onCaptionClick: () => void;
  // 🔄 ADD: Animation direction for proper slide transitions
  animationDirection?: 'next' | 'prev' | null;
  // 🔄 ADD: Animation state for transition control
  isTransitioning?: boolean;
}

export const CarouselSlide = memo(function CarouselSlide({ 
  image, 
  isActive, 
  position,
  dimensions,
  navigationLayout,
  onCaptionClick,
  animationDirection = null,
  isTransitioning = false
}: CarouselSlideProps) {
  
  // 🔄 ENHANCED: Calculate transform based on animation direction and state
  const getTransform = (): string => {
    // If transitioning, use animation-aware positioning
    if (isTransitioning && animationDirection) {
      if (position === 0) {
        // Current slide: slide out in direction opposite to navigation
        return animationDirection === 'next' 
          ? 'translateX(-100%)' // Slide out left when going to next
          : 'translateX(100%)';  // Slide out right when going to prev
      } else if (position === 1) {
        // Next slide: slide in from navigation direction
        return animationDirection === 'next'
          ? 'translateX(0%)'     // Slide in from right when going to next
          : 'translateX(200%)';  // Off-screen right when going to prev
      } else {
        // Previous slide: slide in from opposite direction
        return animationDirection === 'prev'
          ? 'translateX(0%)'     // Slide in from left when going to prev
          : 'translateX(-200%)'; // Off-screen left when going to next
      }
    }
    
    // Default static positioning (no animation)
    return `translateX(${position * 100}%)`;
  };

  // 🔄 ENHANCED: Dynamic transition duration based on state
  const getTransitionDuration = (): string => {
    return isTransitioning ? '300ms' : '0ms';
  };

  return (
    <div 
      className="absolute inset-0 w-full h-full"
      style={{
        transform: getTransform(),
        transition: `transform ${getTransitionDuration()} cubic-bezier(0.4, 0.0, 0.2, 1)`,
        zIndex: isActive ? 10 : position === 0 ? 9 : 0, // Ensure proper layering during transitions
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
          // 🔄 ADD: Constrain caption height to prevent layout impact
          maxHeight={dimensions.maxHeight ? Math.min(120, dimensions.maxHeight * 0.3) : 120}
        />
      )}
    </div>
  );
});