// src/main/components/Article/Carousel/CarouselTrack.tsx
import { CarouselItem } from "@/main/lib/markdown/markdownTypes";
import { CarouselDimensions } from "./carouselTypes";
import { twMerge } from 'tailwind-merge';
import { CarouselSlide } from "./CarouselSlide";
import { getVisibleIndexes } from './utils/getVisibleIndexes';
import { getViewportBreakpoint } from './utils/viewportUtils';

interface CarouselTrackProps {
  images: CarouselItem[];
  currentIndex: number;
  dimensions: CarouselDimensions;
  navigationLayout: 'horizontal' | 'vertical';
  direction?: 'next' | 'prev' | null;
  isTransitioning?: boolean;
  handlers: {
    handleCaptionClick: (index: number) => void;
  };
}

type SlidePosition = -1 | 0 | 1;

export function CarouselTrack({
    images,
    currentIndex,
    dimensions,
    navigationLayout,
    direction = null,
    isTransitioning = false,
    handlers
  }: CarouselTrackProps) {
    
    // Get current viewport dimensions for fallback height calculation
    const currentViewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const currentViewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    
    // Get current breakpoint to determine which maxHeight to use
    const currentBreakpoint = getViewportBreakpoint(currentViewportWidth, currentViewportHeight);
    const breakpointIndex = {
      'mobile-portrait': 0,
      'mobile-landscape': 1,
      'tablet-portrait': 2,
      'tablet-landscape': 3,
      'desktop-portrait': 4,
      'desktop-landscape': 5
    }[currentBreakpoint];
    
    // Get the current breakpoint's maxHeight for fallback
    const fallbackHeight = dimensions.breakpointDimensions[breakpointIndex]?.maxHeight || dimensions.maxHeight || 400;
    
    // Validate ratios to prevent NaN/invalid values
    const validateRatio = (ratio: number): number => {
      if (!ratio || isNaN(ratio) || ratio <= 0) {
        console.warn('Invalid carousel ratio detected:', ratio, 'using fallback 1.5');
        return 1.5;
      }
      return ratio;
    };

    const containerStyles = {
      '--mobile-portrait-ratio': validateRatio(dimensions.breakpointDimensions[0].ratio),
      '--mobile-landscape-ratio': validateRatio(dimensions.breakpointDimensions[1].ratio),
      '--tablet-portrait-ratio': validateRatio(dimensions.breakpointDimensions[2].ratio),
      '--tablet-landscape-ratio': validateRatio(dimensions.breakpointDimensions[3].ratio),
      '--desktop-portrait-ratio': validateRatio(dimensions.breakpointDimensions[4].ratio),
      '--desktop-landscape-ratio': validateRatio(dimensions.breakpointDimensions[5].ratio),
      '--fallback-height': `${fallbackHeight}px`,
      '--carousel-max-height': `${fallbackHeight}px`
    } as React.CSSProperties;
  
    const visibleIndexes = getVisibleIndexes(currentIndex, images.length);
    const is2SlideCarousel = images.length === 2;
    
    // Container transform for strip animation
    const getContainerTransform = (): string => {
      if (!isTransitioning || !direction) {
        return 'translateX(0%)'; // No animation - neutral position
      }
      
      return direction === 'next' 
        ? 'translateX(-100%)' // Going right: shift strip left
        : 'translateX(100%)';  // Going left: shift strip right
    };

    // Debug logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Carousel Track Animation:', {
        is2SlideCarousel,
        direction,
        isTransitioning,
        containerTransform: getContainerTransform(),
        visibleIndexes,
        currentIndex,
        totalSlides: images.length
      });
    }
  
    return (
      <div 
        style={containerStyles}
        className={twMerge(
          'Carousel_carouselContainer__SjVtW relative w-full overflow-hidden',
          navigationLayout === 'horizontal' ? 'pb-16' : 'px-12',
          'sm:pb-12 sm:px-8',
          'max-h-[var(--carousel-max-height)]'
        )}
      >
        {/* Animated slide container - this moves as a strip */}
        <div 
          className="relative w-full max-w-full min-h-[var(--fallback-height)] max-h-[var(--carousel-max-height)] overflow-hidden"
          style={{
            transform: getContainerTransform(),
            transition: isTransitioning 
              ? 'transform 300ms cubic-bezier(0.4, 0.0, 0.2, 1)' 
              : 'none'
          }}
        >
          {visibleIndexes.map((index, i) => {
            const position = (i - 1) as SlidePosition;
            
            // Special key generation for 2-slide carousel to handle duplicates
            const slideKey = is2SlideCarousel 
              ? `slide-${index}-pos-${position}` // Include position to make duplicates unique
              : `slide-${index}`;
            
            return (
              <CarouselSlide
                key={slideKey}
                image={images[index]}
                isActive={index === currentIndex && position === 0} // Only center position is truly active
                position={position}
                dimensions={{
                  ...dimensions,
                  maxHeight: fallbackHeight
                }}
                navigationLayout={navigationLayout}
                onCaptionClick={() => handlers.handleCaptionClick(index)}
                is2SlideCarousel={is2SlideCarousel}
              />
            );
          })}
        </div>
      </div>
    );
  }