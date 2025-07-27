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
    
    // 🔴 CRITICAL FIX: Calculate strip transform to show center slide in viewport
    const getStripTransform = (): string => {
      if (!isTransitioning || !direction) {
        // Default: center slide (position 1 in 3-slide strip) is visible
        return 'translateX(-100%)'; // Show center slide (100% position) in viewport
      }
      
      // During animation: move to show left or right slide
      return direction === 'next' 
        ? 'translateX(-200%)' // Show right slide (200% position) in viewport
        : 'translateX(0%)';   // Show left slide (0% position) in viewport
    };

    // Debug logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Carousel Strip Animation:', {
        is2SlideCarousel,
        direction,
        isTransitioning,
        stripTransform: getStripTransform(),
        visibleIndexes,
        currentIndex,
        layout: `[${visibleIndexes[0]}][${visibleIndexes[1]}][${visibleIndexes[2]}]`
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
        {/* 🔴 VIEWPORT: Fixed frame that shows only center portion */}
        <div 
          className="relative w-full max-w-full min-h-[var(--fallback-height)] max-h-[var(--carousel-max-height)] overflow-hidden"
        >
          {/* 🔴 STRIP: 3x width container with slides laid out side by side */}
          <div 
            className="absolute top-0 left-0 h-full"
            style={{
              width: '300%', // 3x viewport width to hold 3 slides
              transform: getStripTransform(),
              transition: isTransitioning 
                ? 'transform 300ms cubic-bezier(0.4, 0.0, 0.2, 1)' 
                : 'none'
            }}
          >
            {visibleIndexes.map((index, i) => {
              // 🔴 FIXED: Position slides absolutely within the strip
              const slidePositions = ['0%', '100%', '200%']; // Left, Center, Right
              const slidePosition = slidePositions[i];
              
              // Special key generation for 2-slide carousel to handle duplicates
              const slideKey = is2SlideCarousel 
                ? `slide-${index}-pos-${i}` 
                : `slide-${index}`;
              
              return (
                <div
                  key={slideKey}
                  className="absolute top-0 h-full"
                  style={{
                    left: slidePosition,
                    width: '33.333%', // Each slide takes 1/3 of strip width (= 100% of viewport)
                  }}
                >
                  <CarouselSlide
                    image={images[index]}
                    isActive={index === currentIndex && i === 1} // Only center slide (i===1) is active
                    position={(i - 1) as -1 | 0 | 1} // For compatibility with existing logic
                    dimensions={{
                      ...dimensions,
                      maxHeight: fallbackHeight
                    }}
                    navigationLayout={navigationLayout}
                    onCaptionClick={() => handlers.handleCaptionClick(index)}
                    is2SlideCarousel={is2SlideCarousel}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }