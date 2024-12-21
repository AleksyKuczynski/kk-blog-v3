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
  const slideBaseStyles = twMerge(
    'absolute inset-0 w-full h-full',
    'transition-transform duration-300',
    'theme-default:rounded-lg theme-default:shadow-md',
    'theme-rounded:rounded-xl theme-rounded:shadow-lg',
    'theme-sharp:border theme-sharp:border-ol'
  );

  const slideContentStyles = twMerge(
    'relative w-full h-full',
    'flex flex-col' // Use flexbox for layout
  );

  const imageContainerStyles = twMerge(
    'relative flex-grow' // Take all available space except caption
  );

  const captionContainerStyles = twMerge(
    'w-full flex-shrink-0', // Don't shrink caption
    'transition-all duration-300',
    // Zwinięty podpis - stała wysokość
    'group-[&.collapsed]:h-24',
    // Rozwinięty podpis - overlay na obrazie
    'group-[&.expanded]:absolute group-[&.expanded]:inset-0',
    'group-[&.expanded]:overflow-y-auto',
    // Theme variants
    'theme-default:bg-sf-cont',
    'theme-rounded:bg-sf-cont',
    'theme-sharp:bg-sf-cont theme-sharp:border-t theme-sharp:border-ol'
  );

  const captionTextStyles = twMerge(
    'prose prose-sm max-w-none p-4',
    'group-[&.collapsed]:line-clamp-3',
    'group-[&.expanded]:h-full',
    // Theme variants
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
        const slideKey = `slide-${currentIndex}-${assetId}-${positionKey}`;
        
        return (
          <div
            key={slideKey}
            className={`${slideBaseStyles} group`}
            data-expanded={image.expandedCaption}
            aria-hidden={index !== currentIndex}
            style={{
              transform: `translateX(${positionKey * 100}%)`,
            }}
          >
            <div className={slideContentStyles}>
              <div className={imageContainerStyles}>
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
              </div>
              {image.processedCaption && (
                <div 
                  className={`${captionContainerStyles} ${image.expandedCaption ? 'expanded' : 'collapsed'}`}
                  onClick={() => image.expandedCaption = !image.expandedCaption}
                  role="button"
                  tabIndex={0}
                  aria-label={`${image.expandedCaption ? 'Collapse' : 'Expand'} caption`}
                >
                  <div 
                    className={captionTextStyles}
                    dangerouslySetInnerHTML={{ 
                      __html: image.processedCaption 
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}