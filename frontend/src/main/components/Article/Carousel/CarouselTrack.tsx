// src/main/components/Article/Carousel/CarouselTrack.tsx
import { CarouselDimensions } from "./carouselTypes";
import { CarouselItemWithBehavior, CaptionMode } from "./captionTypes";
import { twMerge } from 'tailwind-merge';
import { CarouselSlide } from "./CarouselSlide";
import { getVisibleIndexes } from './utils/getVisibleIndexes';
import { getViewportBreakpoint } from './utils/viewportUtils';

interface CarouselTrackProps {
  images: CarouselItemWithBehavior[];
  currentIndex: number;
  dimensions: CarouselDimensions;
  navigationLayout: 'horizontal' | 'vertical';
  captionsVisible: boolean;
  direction?: 'next' | 'prev' | null;
  isTransitioning?: boolean;
  captionEvaluationTrigger?: number; // NEW: Caption re-evaluation trigger
  handlers: {
    handleCaptionClick: (index: number) => void;
    handleCaptionModeChange: (index: number, mode: CaptionMode) => void;
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
    captionEvaluationTrigger, // NEW: Caption re-evaluation trigger
    handlers
  }: CarouselTrackProps) {
    
    // Get current viewport dimensions for fallback height calculation
    const currentViewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const currentViewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    const breakpoint = getViewportBreakpoint(currentViewportWidth, currentViewportHeight);
    
    // Calculate fallback height for the carousel container
    const aspectRatio = dimensions.ratio || 1.5;
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
    const visibleIndexes = getVisibleIndexes(currentIndex, images.length);

    // Calculate strip transform based on current transition state
    const getStripTransform = (): string => {
      if (!isTransitioning || !direction) {
        return 'translateX(-100%)'; // Default: center slide visible
      }

      // During transition, move strip to show the target slide
      if (is2SlideCarousel) {
        // In 2-slide carousel, alternate between two positions
        return direction === 'next' 
          ? 'translateX(-200%)' // Move to show right slide
          : 'translateX(0%)';    // Move to show left slide
      } else {
        // In multi-slide carousel, standard transform
        return direction === 'next' 
          ? 'translateX(-200%)' // Move left to show next slide
          : 'translateX(0%)';   // Move right to show previous slide
      }
    };

    // Debug logging
    console.log('Carousel Strip Animation:', {
      is2SlideCarousel,
      direction,
      isTransitioning,
      stripTransform: getStripTransform(),
      visibleIndexes,
      currentIndex,
      captionsVisible,
      fallbackHeight,
      layout: `[${visibleIndexes.join('][')}]`
    });

    return (
      <div 
        className="relative w-full overflow-hidden"
        style={{
          height: `${fallbackHeight}px`,
          maxHeight: `${dimensions.maxHeight || 420}px`,
          ...containerStyles
        }}
      >
        {/* The sliding strip containing all visible slides */}
        <div 
          className="relative h-full"
          style={{ 
            width: '300%', // Container for 3 slides (left, center, right)
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
                  onCaptionModeChange={(mode) => handlers.handleCaptionModeChange(index, mode)} // NEW: Pass mode change handler
                  is2SlideCarousel={is2SlideCarousel}
                />
              </div>
            );
          })}
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