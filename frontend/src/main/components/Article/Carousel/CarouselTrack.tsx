// src/main/components/Article/Carousel/CarouselTrack.tsx
import { CarouselItem } from "@/main/lib/markdown/markdownTypes";
import { CarouselDimensions } from "./carouselTypes";
import { twMerge } from 'tailwind-merge';
import { CarouselSlide } from "./CarouselSlide";
import { calculateCarouselDimensions } from './utils/calculateCarouselDimensions';
import { getVisibleIndexes } from './utils/getVisibleIndexes';
import { getViewportBreakpoint } from './utils/viewportUtils';

interface CarouselTrackProps {
  images: CarouselItem[];
  currentIndex: number;
  dimensions: CarouselDimensions;
  navigationLayout: 'horizontal' | 'vertical';
  captionsVisible: boolean; // New prop for caption visibility
  direction?: 'next' | 'prev' | null;
  isTransitioning?: boolean;
  handlers: {
    handleCaptionClick: (index: number) => void;
    handleCarouselClick: (e: React.MouseEvent) => void; // New handler
  };
}

export function CarouselTrack({
    images,
    currentIndex,
    dimensions,
    navigationLayout,
    captionsVisible, // New visibility state
    direction = null,
    isTransitioning = false,
    handlers
  }: CarouselTrackProps) {
    
    // Get current viewport dimensions for fallback height calculation
    const currentViewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const currentViewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    const currentBreakpoint = getViewportBreakpoint(currentViewportWidth, currentViewportHeight);
    
    // Calculate and apply constrained dimensions based on current viewport
    const calculatedHeight = calculateCarouselDimensions(dimensions, images.length, currentBreakpoint);
    const finalDimensions: CarouselDimensions = {
      ...dimensions,
      height: calculatedHeight
    };
    
    // Create CSS custom properties for consistent theming
    const containerStyles: React.CSSProperties = {
      '--carousel-height': `${finalDimensions.height}px`,
      '--carousel-max-height': `${finalDimensions.maxHeight}px`,
      '--fallback-height': `${Math.min(400, finalDimensions.maxHeight)}px`,
    };
    
    const totalSlides = images.length;
    const is2SlideCarousel = totalSlides === 2;
    
    // Get the visible slide indexes for the current state
    const visibleIndexes = getVisibleIndexes(currentIndex, totalSlides, direction, isTransitioning);
    
    // Transform calculations for strip positioning
    const getStripTransform = () => {
      if (!isTransitioning || !direction) {
        return 'translateX(-100%)'; // Center position (middle slide visible)
      }
      
      // During transition, we animate the strip to show the correct slide
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
        captionsVisible, // Log caption visibility state
        layout: `[${visibleIndexes[0]}][${visibleIndexes[1]}][${visibleIndexes[2]}]`
      });
    }
  
    return (
      <div 
        style={containerStyles}
        className={twMerge(
          'Carousel_carouselContainer__SjVtW relative w-full overflow-hidden cursor-pointer',
          navigationLayout === 'horizontal' ? 'pb-16' : 'px-12',
          'sm:pb-12 sm:px-8',
          'max-h-[var(--carousel-max-height)]'
        )}
        onClick={handlers.handleCarouselClick} // Add click handler for caption visibility toggle
      >
        {/* Viewport: Fixed frame that shows only center portion */}
        <div 
          className="relative w-full max-w-full min-h-[var(--fallback-height)] max-h-[var(--carousel-max-height)] overflow-hidden"
        >
          {/* Strip: 3x width container with slides laid out side by side */}
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
              // Position slides absolutely within the strip
              const slidePositions = ['0%', '100%', '200%']; // Left, Center, Right
              const slidePosition = slidePositions[i];
              
              // Special key generation for 2-slide carousel to handle duplicates
              const slideKey = is2SlideCarousel 
                ? `slide-${index}-${i}-${direction || 'static'}-${isTransitioning}`
                : `slide-${index}`;
                
              // Determine position for caption behavior (-1: left, 0: center, 1: right)
              const relativePosition = (i - 1) as -1 | 0 | 1;
              
              return (
                <div
                  key={slideKey}
                  className="absolute top-0 h-full"
                  style={{
                    left: slidePosition,
                    width: '33.333%' // Each slide takes 1/3 of strip width
                  }}
                >
                  <CarouselSlide
                    image={images[index]}
                    isActive={index === currentIndex}
                    position={relativePosition}
                    dimensions={finalDimensions}
                    navigationLayout={navigationLayout}
                    captionsVisible={captionsVisible} // Pass visibility state
                    onCaptionClick={() => handlers.handleCaptionClick(index)}
                    is2SlideCarousel={is2SlideCarousel}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Caption visibility indicator */}
        {!captionsVisible && (
          <div 
            className={twMerge(
              'absolute bottom-2 left-1/2 transform -translate-x-1/2',
              'text-xs text-on-sf/30 pointer-events-none',
              'bg-sf-cont/30 px-3 py-1 rounded-full',
              'transition-opacity duration-300',
              'theme-default:rounded-full',
              'theme-rounded:rounded-xl', 
              'theme-sharp:rounded-none'
            )}
          >
            Click to show captions
          </div>
        )}
      </div>
    );
  }