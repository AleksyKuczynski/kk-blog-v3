// src/main/components/Article/Carousel/ServerCarousel.tsx
import { CarouselDimensions, CarouselItem } from "@/main/lib/markdown/types";
import Image from 'next/image';
import { twMerge } from "tailwind-merge";
import styles from './Carousel.module.scss';

interface ServerCarouselProps {
  images: CarouselItem[];
  activeIndexes: number[];
  currentIndex: number;
  dimensions: CarouselDimensions;
  handlers: {
    handleCaptionClick: (index: number) => void;
  };
}

export function ServerCarousel({ 
  images,
  activeIndexes,
  currentIndex,
  dimensions,
  handlers
}: ServerCarouselProps) {
  const breakpointStyles = {
    '--mobile-portrait-ratio': dimensions.breakpointDimensions[0].ratio,
    '--mobile-landscape-ratio': dimensions.breakpointDimensions[1].ratio,
    '--tablet-portrait-ratio': dimensions.breakpointDimensions[2].ratio,
    '--tablet-landscape-ratio': dimensions.breakpointDimensions[3].ratio,
    '--desktop-portrait-ratio': dimensions.breakpointDimensions[4].ratio,
    '--desktop-landscape-ratio': dimensions.breakpointDimensions[5].ratio,
    '--carousel-max-height': `${dimensions.maxHeight}px`
  } as React.CSSProperties;

  return (
    <div 
      style={breakpointStyles}
      className={twMerge(
        styles.carouselContainer,
        'relative w-full overflow-hidden'
      )}
    >
    {activeIndexes.map((index) => {
      const image = images[index];
      return (
        <div 
          key={`slide-${index}`}
          className={twMerge(
            'absolute inset-0 w-full h-full',
            'transition-opacity duration-300',
            index === activeIndexes[1] ? 'opacity-100 z-10' : 'opacity-0 z-0'
          )}
        >
          {/* Image container */}
          <div className="absolute inset-0">
            <Image
              src={image.imageAttributes.src}
              alt={image.imageAttributes.alt}
              title={image.imageAttributes.title}
              fill
              sizes={`(max-width: 768px) 100vw, ${dimensions.maxHeight}px`}
              className={twMerge(
                'object-cover transition-transform duration-300',
                dimensions.imageDisplayMode === 'center-horizontal' && 'object-center',
                dimensions.imageDisplayMode === 'center-vertical' && 'object-center'
              )}
              priority={index === currentIndex}
            />
          </div>

          {/* Caption container */}
          {image.processedCaption && (
            <div 
              onClick={() => handlers.handleCaptionClick(index)}
              className={twMerge(
                'absolute left-0 right-0 bottom-0',
                'cursor-pointer',
                image.expandedCaption ? 'h-full' : 'h-10'
              )}
            >
              <div
                className={twMerge(
                  'absolute left-0 right-0 bottom-0',
                  'bg-sf-cont px-4 py-2',
                  'transition-transform duration-300 ease-in-out',
                  // Theme variants
                  'theme-default:bg-sf-cont',
                  'theme-rounded:bg-sf-cont',
                  'theme-sharp:bg-sf-cont border-t border-ol'
                )}
              >
                <div 
                  className="prose-sm text-on-sf"
                  dangerouslySetInnerHTML={{ __html: image.processedCaption }}
                />
              </div>
            </div>
          )}
        </div>
      );
    })}
    </div>
  );
}