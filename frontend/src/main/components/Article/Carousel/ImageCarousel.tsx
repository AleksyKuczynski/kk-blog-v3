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
    direction,
    isTransitioning,
    captionsVisible, // FIXED: Get caption visibility state
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
        "relative mx-auto mb-24 outline-none max-w-4xl",
        "theme-default:focus:ring-2 theme-default:focus:ring-pr-fix/50",
        "theme-rounded:shadow-xl theme-rounded:rounded-2xl",
        "theme-sharp:border theme-sharp:border-ol",
        // Visual feedback during transitions
        isTransitioning && "cursor-wait"
      )}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label={`Image carousel with ${carouselImages.length} images${captionsVisible ? ' (captions visible)' : ' (captions hidden)'}`}
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
        captionsVisible={captionsVisible} // FIXED: Pass visibility state
        direction={direction}
        isTransitioning={isTransitioning}
        handlers={{
          handleCaptionClick: handlers.handleCaptionClick,
          handleCarouselClick: handlers.handleCarouselClick // FIXED: Pass carousel click handler
        }}
      />

      <CarouselNavigation
        layout={navigationLayout}
        totalSlides={carouselImages.length}
        currentSlide={currentIndex}
        onPrevious={handlers.handlePrevious}
        onNext={handlers.handleNext}
        onSlideSelect={handlers.handleSlideSelect}
        disabled={isTransitioning}
      />

      {/* Keyboard shortcuts hint */}
      <div 
        className={twMerge(
          'absolute -bottom-6 left-0 right-0',
          'text-xs text-center text-on-sf/40',
          'pointer-events-none',
          'transition-opacity duration-300',
          'hover:opacity-100 opacity-0'
        )}
      >
        Press 'C' to toggle captions • Click carousel area to toggle • Click caption to expand
      </div>
    </div>
  );
});

export default ImageCarousel;