// src/main/components/Article/Carousel/ImageCarousel.tsx
'use client';

import { useRef } from 'react';
import { CarouselItem } from "@/main/lib/markdown/types";
import { useCarousel } from './useCarousel';
import { ServerCarousel } from "./ServerCarousel";
import { NavigationButtons } from "./NavigationButtons";
import { twMerge } from "tailwind-merge";

const CAROUSEL_CONSTANTS = {
  MAX_WIDTH: 1200,
  ANIMATION_DURATION: 300,
  SWIPE_THRESHOLD: 50
} as const;

interface ImageCarouselProps {
  images: CarouselItem[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  console.log('ImageCarousel render, images:', images);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { 
    currentIndex,
    activeIndexes,
    handlers,
    dimensions
  } = useCarousel({
    images,
    containerRef
  });

  if (!dimensions) return null;

  return (
    <div 
      ref={containerRef} 
      className={twMerge(
        "relative mx-auto mb-24 outline-none",
        "theme-default:focus:ring-2 theme-default:focus:ring-pr-fix/50",
        "theme-rounded:shadow-xl theme-rounded:rounded-2xl",
        "theme-sharp:border theme-sharp:border-ol"
      )}
      style={{ 
        height: dimensions.height,
        maxWidth: CAROUSEL_CONSTANTS.MAX_WIDTH
      }}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Image carousel"
      onKeyDown={handlers.handleKeyDown}
      onTouchStart={handlers.handleTouchStart}
      onTouchEnd={handlers.handleTouchEnd}
    >
      <ServerCarousel 
        images={images}
        activeIndexes={activeIndexes}
        currentIndex={currentIndex}
      />
      
      <NavigationButtons 
        totalSlides={images.length}
        currentSlide={currentIndex}
        onPrevious={handlers.handlePrevious}
        onNext={handlers.handleNext}
        onSlideSelect={handlers.handleSlideSelect}
      />
    </div>
  );
}