// src/main/components/Article/Carousel/ImageCarousel.tsx
import { CarouselItem } from "@/main/lib/markdown/types";
import { calculateCarouselDimensions } from '@/main/lib/utils/calculateCarouselDimensions';
import { twMerge } from "tailwind-merge";
import { CarouselClient } from "./CarouselClient";

interface ImageCarouselProps {
  images: CarouselItem[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  // Server-side calculation
  const dimensions = calculateCarouselDimensions(
    images.map(img => ({
      width: img.imageAttributes.width || 1200,
      height: img.imageAttributes.height || 800
    })),
    images.map(img => ({
      lines: img.processedCaption?.split('\n').length || 1,
      isExpandable: (img.processedCaption?.split('\n').length || 0) > 4
    })),
    1200, // default width
    800   // default height
  );

  const carouselStyles = twMerge(
    'relative w-full mb-8 transition-all duration-300',
    'theme-default:shadow-lg',
    'theme-rounded:shadow-xl theme-rounded:rounded-2xl theme-rounded:overflow-hidden',
    'theme-sharp:border-2 theme-sharp:border-prcolor'
  );

  return (
    <div 
      className={carouselStyles}
      style={{ 
        height: dimensions.height,
        maxWidth: dimensions.width 
      }}
    >
      <CarouselClient 
        images={images} 
        dimensions={dimensions}
      />
    </div>
  );
}