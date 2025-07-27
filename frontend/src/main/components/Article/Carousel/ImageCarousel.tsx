// src/main/components/Article/Carousel/ImageCarousel.tsx
'use client'

import React, { memo } from 'react';
import { CarouselItem } from "@/main/lib/markdown/markdownTypes";
import { CarouselDimensions, ImageSetAnalysis } from "./carouselTypes";
import { CarouselTrack } from './CarouselTrack';
import { CarouselNavigation } from './CarouselNavigation';
import { twMerge } from "tailwind-merge";
import { determineNavigationLayout } from "./utils/carouselUtils";
import { useCarousel } from './hooks/useCarousel';

interface CarouselProps {
  images: CarouselItem[];
  dimensions: CarouselDimensions;
  initialAnalysis: ImageSetAnalysis;
}

const ImageCarousel = memo(function ImageCarousel({ 
  images, 
  dimensions,
  initialAnalysis 
}: CarouselProps) {
  const { 
    currentIndex,
    previousIndex,
    direction,
    isTransitioning,
    images: carouselImages,
    handlers 
  } = useCarousel({ 
    images, 
    dimensions
  });

  const navigationLayout = determineNavigationLayout(
    typeof window !== 'undefined' ? window.innerWidth : 1200,
    typeof window !== 'undefined' ? window.innerHeight : 800,
    initialAnalysis
  );

  // 🔄 ADD: Debug logging for development
  if (process.env.NODE_ENV === 'development') {
    console.log('Carousel State:', {
      currentIndex,
      previousIndex,
      direction,
      isTransitioning,
      totalImages: carouselImages.length
    });
  }

  return (
    <div 
      className={twMerge(
        "relative mx-auto mb-24 outline-none max-w-4xl",
        "theme-default:focus:ring-2 theme-default:focus:ring-pr-fix/50",
        "theme-rounded:shadow-xl theme-rounded:rounded-2xl",
        "theme-sharp:border theme-sharp:border-ol",
        // 🔄 ADD: Visual feedback during transitions
        isTransitioning && "cursor-wait"
      )}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label={`Image carousel with ${carouselImages.length} images`}
      aria-live="polite"
      aria-atomic="false"
      onKeyDown={handlers.handleKeyDown}
      onTouchStart={handlers.handleTouchStart}
      onTouchEnd={handlers.handleTouchEnd}
    >
      <CarouselTrack
        images={carouselImages}
        currentIndex={currentIndex}
        dimensions={dimensions}
        navigationLayout={navigationLayout}
        // 🔄 ADD: Pass animation state
        direction={direction}
        isTransitioning={isTransitioning}
        previousIndex={previousIndex}
        handlers={handlers}
      />

      <CarouselNavigation
        layout={navigationLayout}
        totalSlides={carouselImages.length}
        currentSlide={currentIndex}
        onPrevious={handlers.handlePrevious}
        onNext={handlers.handleNext}
        onSlideSelect={handlers.handleSlideSelect}
        // 🔄 ADD: Disable navigation during transitions
        disabled={isTransitioning}
      />
    </div>
  );
});

export default ImageCarousel;