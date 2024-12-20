// src/main/components/Article/Carousel/ServerCarousel.tsx
import { CarouselItem } from "@/main/lib/markdown/types";
import Image from 'next/image';
import { twMerge } from "tailwind-merge";

interface ServerCarouselProps {
  images: CarouselItem[];
  activeIndexes: number[];
  currentIndex: number;
}

export function ServerCarousel({ 
  images,
  activeIndexes,
  currentIndex,
}: ServerCarouselProps) {
  // Dodajmy logging dla debugowania
  console.log('ServerCarousel render:', {
    activeIndexes,
    currentIndex,
    imagesData: images.map(img => ({
      src: img.imageAttributes.src,
      width: img.imageAttributes.width,
      height: img.imageAttributes.height
    }))
  });

  const slideBaseStyles = twMerge(
    'absolute inset-0 w-full h-full',
    'transition-transform duration-300',
    'theme-default:rounded-lg theme-default:shadow-md',
    'theme-rounded:rounded-xl theme-rounded:shadow-lg',
    'theme-sharp:border theme-sharp:border-ol'
  );

  const captionBaseStyles = twMerge(
    'absolute bottom-0 w-full p-4',
    'theme-default:bg-sf-cont/90',
    'theme-rounded:bg-sf-cont/95 theme-rounded:backdrop-blur-sm',
    'theme-sharp:bg-sf-cont theme-sharp:border-t theme-sharp:border-ol'
  );

  const captionTextStyles = twMerge(
    'prose prose-sm max-w-none',
    'theme-default:text-on-sf',
    'theme-rounded:text-on-sf-var',
    'theme-sharp:text-on-sf-var'
  );

  const getPositionKey = (arrayIndex: number): -1 | 0 | 1 => {
    const relativeIndex = arrayIndex - 1;
    return relativeIndex as -1 | 0 | 1;
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {activeIndexes.map((index, arrayIndex) => {
        const image = images[index];
        const { imageAttributes } = image;
        const positionKey = getPositionKey(arrayIndex);
        const assetId = imageAttributes.src.split('/').pop() || '';
        
        // Utworzenie unikalnego klucza
        const slideKey = `slide-${currentIndex}-${assetId}-${positionKey}`;
        
        return (
          <div
            key={slideKey}
            className={slideBaseStyles}
            aria-hidden={index !== currentIndex}
            style={{
              transform: `translateX(${positionKey * 100}%)`,
            }}
          >
            <Image
              src={imageAttributes.src}
              alt={imageAttributes.alt}
              title={imageAttributes.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              className="object-cover"
              priority={index === currentIndex}
              quality={75}
            />
            {image.processedCaption && (
              <div className={captionBaseStyles}>
                <div 
                  className={captionTextStyles}
                  dangerouslySetInnerHTML={{ 
                    __html: image.processedCaption 
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}