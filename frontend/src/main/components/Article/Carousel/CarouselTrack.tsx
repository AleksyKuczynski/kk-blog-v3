// src/main/components/Article/Carousel/CarouselTrack.tsx
import { CarouselItem } from "@/main/lib/markdown/types";
import { CarouselDimensions } from "./carouselTypes";
import { twMerge } from 'tailwind-merge';
import { CarouselSlide } from "./CarouselSlide";
import { getVisibleIndexes } from './utils/getVisibleIndexes';

interface CarouselTrackProps {
  images: CarouselItem[];
  currentIndex: number;
  dimensions: CarouselDimensions;
  navigationLayout: 'horizontal' | 'vertical';
  handlers: {
    handleCaptionClick: (index: number) => void;
  };
}

type SlidePosition = -1 | 0 | 1;

export function CarouselTrack({
    images,
    currentIndex,
    dimensions,
    navigationLayout,
    handlers
  }: CarouselTrackProps) {
    const containerStyles = {
      '--mobile-portrait-ratio': dimensions.breakpointDimensions[0].ratio,
      '--mobile-landscape-ratio': dimensions.breakpointDimensions[1].ratio,
      '--tablet-portrait-ratio': dimensions.breakpointDimensions[2].ratio,
      '--tablet-landscape-ratio': dimensions.breakpointDimensions[3].ratio,
      '--desktop-portrait-ratio': dimensions.breakpointDimensions[4].ratio,
      '--desktop-landscape-ratio': dimensions.breakpointDimensions[5].ratio,
    } as React.CSSProperties;
  
    const visibleIndexes = getVisibleIndexes(currentIndex, images.length);
  
    return (
      <div 
        style={containerStyles}
        className={twMerge(
          'Carousel_carouselContainer__SjVtW relative w-full overflow-hidden h-full',
          navigationLayout === 'horizontal' ? 'pb-16' : 'px-12',
          'sm:pb-12 sm:px-8'
        )}
      >
        <div className="relative h-full w-full">
          {visibleIndexes.map((index, i) => {
            const position = (i - 1) as SlidePosition;
            return (
              <CarouselSlide
                key={`slide-${index}`}
                image={images[index]}
                isActive={index === currentIndex}
                position={position}
                dimensions={dimensions}
                navigationLayout={navigationLayout}
                onCaptionClick={() => handlers.handleCaptionClick(index)}
              />
            );
          })}
        </div>
      </div>
    );
  }