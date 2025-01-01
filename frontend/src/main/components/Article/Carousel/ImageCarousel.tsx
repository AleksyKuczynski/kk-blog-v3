// src/main/components/Article/Carousel/ImageCarousel.tsx
'use client'

import React, { memo } from 'react';
import { CarouselItem } from "@/main/lib/markdown/types";
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

  return (
    <div 
      className={twMerge(
        "relative mx-auto mb-24 outline-none",
        "theme-default:focus:ring-2 theme-default:focus:ring-pr-fix/50",
        "theme-rounded:shadow-xl theme-rounded:rounded-2xl",
        "theme-sharp:border theme-sharp:border-ol"
      )}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Image carousel"
      onKeyDown={handlers.handleKeyDown}
      onTouchStart={handlers.handleTouchStart}
      onTouchEnd={handlers.handleTouchEnd}
    >
      <CarouselTrack
        images={carouselImages}
        currentIndex={currentIndex}
        dimensions={dimensions}
        navigationLayout={navigationLayout}
        handlers={handlers}
      />

      <CarouselNavigation
        layout={navigationLayout}
        totalSlides={carouselImages.length}
        currentSlide={currentIndex}
        onPrevious={handlers.handlePrevious}
        onNext={handlers.handleNext}
        onSlideSelect={handlers.handleSlideSelect}
      />
    </div>
  );
});

export default ImageCarousel;