// src/main/components/Article/Carousel/ImageCarousel.tsx
'use client'

import { CarouselItem } from "@/main/lib/markdown/types";
import { ServerCarousel } from "./ServerCarousel";
import { NavigationButtons } from "./NavigationButtons";
import { twMerge } from "tailwind-merge";
import { CarouselDimensions, ImageSetAnalysis } from "./carouselTypes";
import { useCarouselLayout } from './hooks/useCarouselLayout';
import { useCarousel } from "./hooks/useCarousel";

interface CarouselProps {
  images: CarouselItem[];
  dimensions: CarouselDimensions;
  initialAnalysis: ImageSetAnalysis;
}

export default function ImageCarousel({ 
  images, 
  dimensions,
  initialAnalysis 
}: CarouselProps) {
  const { navigationLayout, setContainerRef } = useCarouselLayout(initialAnalysis);
  
  const { 
    currentIndex,
    activeIndexes,
    images: carouselImages,
    handlers 
  } = useCarousel({ 
    images, 
    initialAnalysis,
    dimensions
  });

  return (
    <div 
      ref={setContainerRef}
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
      <ServerCarousel
        images={carouselImages}
        activeIndexes={activeIndexes}
        currentIndex={currentIndex}
        dimensions={dimensions}
        handlers={handlers}
        navigationLayout={navigationLayout}
      />
      <NavigationButtons
        layout={navigationLayout}
        totalSlides={carouselImages.length}
        currentSlide={currentIndex}
        onPrevious={handlers.handlePrevious}
        onNext={handlers.handleNext}
        onSlideSelect={handlers.handleSlideSelect}
      />
    </div>
  );
}