// src/main/components/Article/Carousel/ImageCarousel.tsx
'use client';

import { useCallback, useRef, useState } from 'react';
import { CarouselItem } from "@/main/lib/markdown/types";
import { calculateCarouselDimensions } from '@/main/lib/utils/calculateCarouselDimensions';
import { useCarousel } from './useCarousel';
import { ServerCarousel } from "./ServerCarousel";
import { NavigationButtons } from "./NavigationButtons";
import { twMerge } from "tailwind-merge";

interface ImageCarouselProps {
  images: CarouselItem[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const calculateInitialDimensions = useCallback(() => {
    if (typeof window === 'undefined') {
      return {
        width: 0, 
        height: 0, 
        imageHeight: 0, 
        captionHeight: 0,
        imageDisplayMode: 'center-vertical' as const
      };
    }
    
    return calculateCarouselDimensions(
      images.map(img => ({
        width: img.imageAttributes.width || 1200,
        height: img.imageAttributes.height || 800
      })),
      images.map(img => ({
        lines: img.processedCaption?.split('\n').length || 1,
        isExpandable: (img.processedCaption?.split('\n').length || 0) > 4
      })),
      Math.min(window.innerWidth, 1200),
      window.innerHeight
    );
  }, [images]);

  const [dimensions, setDimensions] = useState(() => calculateInitialDimensions());

  const handleResize = useCallback(() => {
    setDimensions(calculateInitialDimensions());
  }, [calculateInitialDimensions]);

  const { state, handlers } = useCarousel({ images, dimensions });


  useState(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;
    
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);
    
    return () => resizeObserver.disconnect();
  });

  return (
    <section 
      ref={containerRef}
      className={twMerge(
        "relative max-w-[1200px] mx-auto",
        "theme-default:shadow-lg",
        "theme-rounded:shadow-xl theme-rounded:rounded-2xl",
        "theme-sharp:border-2 theme-sharp:border-prcolor"
      )}
      style={{ height: dimensions.height }}
      aria-label="Image carousel"
    >
      <ServerCarousel 
        images={images}
        dimensions={dimensions}
        currentIndex={state.currentIndex}
        expandedCaptions={state.captions.expandedIndexes}
        onCaptionToggle={handlers.handleCaptionToggle}
      />
      <NavigationButtons 
        totalSlides={images.length}
        currentSlide={state.currentIndex}
        onPrevious={() => handlers.handleSlideChange('prev')}
        onNext={() => handlers.handleSlideChange('next')}
        onSlideSelect={(index) => handlers.handleSlideChange(index)}
        canGoPrev={state.currentIndex > 0}
        canGoNext={state.currentIndex < images.length - 1}
      />
    </section>
  );
}