// src/main/components/Article/Carousel/CarouselClient.tsx
'use client';

import Image from 'next/image';
import { CarouselItem } from '@/main/lib/markdown/types';
import { CarouselDimensions } from '@/main/lib/utils/calculateCarouselDimensions';
import { useCarousel } from './useCarousel';
import { twMerge } from 'tailwind-merge';
import { useEffect, useState } from 'react';

interface CarouselClientProps {
  images: CarouselItem[];
  dimensions: CarouselDimensions;
  autoAdvance?: boolean;
}

export function CarouselClient({ 
  images, 
  dimensions,
  autoAdvance = false
}: CarouselClientProps) {
  const { state, handlers } = useCarousel({ 
    images, 
    dimensions, 
    autoAdvance 
  });

  // Progress bar state
  const [progress, setProgress] = useState(0);

  // Reset and start progress when slide changes or auto-advance toggles
  useEffect(() => {
    if (!autoAdvance || state.caption.isExpanded) {
      setProgress(0);
      return;
    }

    setProgress(0);
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed / 5000) * 100; // 5000ms = 5s (AUTO_ADVANCE_INTERVAL)
      
      if (newProgress >= 100) {
        setProgress(0);
      } else {
        setProgress(newProgress);
      }
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [state.currentIndex, autoAdvance, state.caption.isExpanded]);

  const imageContainerHeight = state.caption.isExpanded 
    ? dimensions.imageHeight - (dimensions.captionHeight * 2) 
    : dimensions.imageHeight;

  const imageStyles = twMerge(
    'object-cover transition-all duration-300',
    dimensions.imageDisplayMode === 'center-horizontal' && 'object-[50%_50%]',
    dimensions.imageDisplayMode === 'center-vertical' && 'object-[50%_50%]',
    state.isTransitioning && 'opacity-50'
  );

  const captionStyles = twMerge(
    'absolute left-0 right-0 bg-sf-cont text-on-sf-var',
    'transition-all duration-300 ease-in-out',
    'px-4 py-2',
    'theme-default:bg-opacity-95',
    'theme-rounded:bg-opacity-90',
    'theme-sharp:border-t theme-sharp:border-prcolor',
    state.caption.isExpanded 
      ? `bottom-10 max-h-[${dimensions.captionHeight * 3}px] overflow-y-auto` 
      : `bottom-10 max-h-[${dimensions.captionHeight}px] overflow-hidden`
  );

  return (
    <div 
      className="relative h-full focus:outline-none"
      tabIndex={0}
      role="region"
      aria-label="Image carousel"
      onTouchStart={handlers.handleTouchStart}
      onTouchEnd={handlers.handleTouchEnd}
    >
      <div 
        className="relative w-full transition-all duration-300"
        style={{ height: imageContainerHeight }}
      >
        <Image
          src={images[state.currentIndex].imageAttributes.src}
          alt={images[state.currentIndex].imageAttributes.alt}
          fill
          className={imageStyles}
          priority={state.currentIndex === 0}
        />
        
        {/* Progress bar for auto-advance */}
        {autoAdvance && !state.caption.isExpanded && (
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-sf-cont">
            <div 
              className="h-full bg-pr-cont transition-all duration-16"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {images[state.currentIndex].processedCaption && (
        <div 
          className={captionStyles}
          onClick={handlers.handleCaptionToggle}
          role="button"
          tabIndex={0}
          aria-expanded={state.caption.isExpanded}
        >
          <div dangerouslySetInnerHTML={{ 
            __html: images[state.currentIndex].processedCaption || '' 
          }} />
        </div>
      )}

      <div 
        className="absolute bottom-0 left-0 right-0 h-10 flex justify-center items-center gap-2"
        role="tablist"
      >
        {images.map((_, idx) => (
          <button
            key={idx}
            role="tab"
            aria-selected={idx === state.currentIndex}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === state.currentIndex 
                ? 'bg-pr-cont w-4' 
                : 'bg-sf-hi'
            }`}
            onClick={() => handlers.handleSlideChange(idx)}
          />
        ))}
      </div>

      {/* Navigation buttons for keyboard users */}
      <button
        className="sr-only focus:not-sr-only focus:absolute focus:top-1/2 focus:left-4"
        onClick={() => handlers.handleSlideChange('prev')}
        disabled={state.currentIndex === 0}
      >
        Previous
      </button>
      <button
        className="sr-only focus:not-sr-only focus:absolute focus:top-1/2 focus:right-4"
        onClick={() => handlers.handleSlideChange('next')}
        disabled={state.currentIndex === images.length - 1}
      >
        Next
      </button>
    </div>
  );
}