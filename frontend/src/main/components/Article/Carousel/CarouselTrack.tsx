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
  captionsVisible: boolean;
  direction?: 'next' | 'prev' | null;
  isTransitioning?: boolean;
  handlers: {
    handleCaptionClick: (index: number) => void;
    // FIXED: Removed handleCarouselClick since it's now on the main container
  };
}

export function CarouselTrack({
    images,
    currentIndex,
    dimensions,
    navigationLayout,
    captionsVisible,
    direction = null,
    isTransitioning = false,
    handlers
  }: CarouselTrackProps) {
    
    // Get current viewport dimensions for fallback height calculation
    const currentViewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const currentViewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    const breakpoint = getViewportBreakpoint(currentViewportWidth);
    
    // Calculate fallback height for the carousel container
    const aspectRatio = dimensions.aspectRatio || 1.5;
    const fallbackHeight = Math.min(
      currentViewportWidth / aspectRatio,
      dimensions.height || 400
    );
    
    const containerStyles = {
      '--mobile-portrait-ratio': aspectRatio.toString(),
      '--mobile-landscape-ratio': '1',
      '--tablet-portrait-ratio': aspectRatio.toString(),
      '--tablet-landscape-ratio': '1',
      '--desktop-portrait-ratio': aspectRatio.toString(),
      '--desktop-landscape-ratio': '1',
      '--fallback-height': `${fallbackHeight}px`,
      '--carousel-max-height': `${dimensions.maxHeight || 420}px`
    } as React.CSSProperties;

    // Handle special case of 2-slide carousel
    const is2SlideCarousel = images.length === 2;
    const visibleIndexes = getVisibleIndexes(currentIndex, images.length, is2SlideCarousel);

    // Calculate strip transform based on current transition state
    const getStripTransform = (): string => {
      if (!isTransitioning || !direction) {
        return 'translateX(-100%)'; // Default: center slide visible
      }

      // During transition, move strip to show the target slide
      if (is2SlideCarousel) {
        // In 2-slide carousel, alternate between two positions
        return direction === 'next' 
          ? 'translateX(-200%)' // Show right slide (200% position) in viewport
          : 'translateX(0%)';   // Show left slide (0% position) in viewport
      }

      // In multi-slide carousel, standard transitions
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
        captionsVisible,
        fallbackHeight,
        layout: `[${visibleIndexes[0]}][${visibleIndexes[1]}][${visibleIndexes[2]}]`
      });
    }
  
    return (
      <div 
        style={containerStyles}
        className={twMerge(
          'Carousel_carouselContainer__SjVtW relative w-full overflow-hidden',
          // FIXED: Removed cursor-pointer since click handling is now on main container
          navigationLayout === 'horizontal' ? 'pb-16' : 'px-12',
          'sm:pb-12 sm:px-8',
          'max-h-[var(--carousel-max-height)]'
        )}
        // FIXED: Removed onClick handler - it's now on the main ImageCarousel container
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
                    dimensions={{
                      ...dimensions,
                      height: fallbackHeight
                    }}
                    navigationLayout={navigationLayout}
                    captionsVisible={captionsVisible}
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