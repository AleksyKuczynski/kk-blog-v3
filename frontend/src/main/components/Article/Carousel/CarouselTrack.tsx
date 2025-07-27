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
  // 🔄 ADD: Animation state props
  direction?: 'next' | 'prev' | null;
  isTransitioning?: boolean;
  previousIndex?: number;
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
    previousIndex = 0,
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
    
    // 🔄 ADD: Calculate caption max height based on carousel dimensions
    const captionMaxHeight = Math.min(120, fallbackHeight * 0.25); // Max 25% of carousel height or 120px
  
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
        {/* 🔄 FIXED: Maintain strict height bounds for fixed-height requirement */}
        <div className="relative w-full max-w-full min-h-[var(--fallback-height)] max-h-[var(--carousel-max-height)] overflow-hidden">
          {visibleIndexes.map((index, i) => {
            const position = (i - 1) as SlidePosition;
            
            // 🔄 ADD: Determine if this slide is involved in current animation
            const isCurrentSlide = index === currentIndex;
            const isPreviousSlide = index === previousIndex;
            const isInvolvedInTransition = isTransitioning && (isCurrentSlide || isPreviousSlide);
            
            return (
              <CarouselSlide
                key={`slide-${index}`}
                image={images[index]}
                isActive={isCurrentSlide}
                position={position}
                dimensions={{
                  ...dimensions,
                  maxHeight: fallbackHeight // Pass calculated height to slide
                }}
                navigationLayout={navigationLayout}
                onCaptionClick={() => handlers.handleCaptionClick(index)}
                // 🔄 ADD: Pass animation props
                animationDirection={direction}
                isTransitioning={isInvolvedInTransition}
              />
            );
          })}
        </div>
      </div>
    );
  }