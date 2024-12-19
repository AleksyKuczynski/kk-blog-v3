// src/main/components/Article/Carousel/ServerCarousel.tsx
import { CarouselItem } from "@/main/lib/markdown/types";
import Image from 'next/image';
import { twMerge } from "tailwind-merge";

interface ServerCarouselProps {
    images: CarouselItem[];
    dimensions: {
      width: number;
      height: number;
      imageHeight: number;
    };
    currentIndex: number;
    expandedCaptions: Set<number>;
    onCaptionToggle: (index: number) => void;
    className?: string;
  }
  
  export function ServerCarousel({ 
    images, 
    dimensions,
    currentIndex,
    expandedCaptions,
    onCaptionToggle,
    className 
  }: ServerCarouselProps) {
    return (
      <div 
        className={twMerge(
          "relative w-full overflow-hidden",
          className
        )}
        style={{ height: dimensions.imageHeight }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={twMerge(
              "absolute inset-0 w-full h-full transition-all duration-300",
              index === currentIndex ? "translate-x-0" : 
              index < currentIndex ? "-translate-x-full" : "translate-x-full"
            )}
            data-carousel-item=""
            aria-hidden={index !== currentIndex}
          >
            <Image
              src={image.imageAttributes.src}
              alt={image.imageAttributes.alt}
              fill
              className="object-cover"
              priority={index === currentIndex}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              quality={75}
            />
            {image.processedCaption && (
              <div 
                className={twMerge(
                  "absolute bottom-0 left-0 right-0 bg-bgcolor-alt/75",
                  "transition-[height] duration-300 ease-out"
                )}
                style={{
                  height: expandedCaptions.has(index) ? 'auto' : '5.5rem' // ~4 lines
                }}
              >
                <div 
                  className={twMerge(
                    "prose prose-sm max-w-none text-txcolor p-4",
                    !expandedCaptions.has(index) && "line-clamp-4"
                  )}
                  dangerouslySetInnerHTML={{ __html: image.processedCaption }}
                />
                {image.processedCaption.split('\n').length > 4 && (
                  <button
                    onClick={() => onCaptionToggle(index)}
                    className={twMerge(
                      "absolute bottom-2 right-2 px-2 py-1",
                      "text-xs text-txcolor-secondary",
                      "hover:text-txcolor transition-colors",
                      "theme-default:bg-bgcolor/10 theme-default:hover:bg-bgcolor/20",
                      "theme-rounded:rounded-lg",
                      "theme-sharp:border theme-sharp:border-prcolor/20"
                    )}
                    type="button"
                    aria-expanded={expandedCaptions.has(index)}
                  >
                    {expandedCaptions.has(index) ? 'Show less' : 'Read more'}
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }