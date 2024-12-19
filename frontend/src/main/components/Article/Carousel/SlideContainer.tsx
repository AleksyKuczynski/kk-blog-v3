// src/main/components/Article/Carousel/SlideContainer.tsx
'use client';

import Image from 'next/image';
import { CarouselItem } from '@/main/lib/markdown/types';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';

interface SlideContainerProps {
  image: CarouselItem;
  position: 'prev' | 'current' | 'next';
  dimensions: {
    width: number;
    height: number;
    imageHeight: number;
  };
  priority?: boolean;
}

export function SlideContainer({
  image,
  position,
  dimensions,
  priority = false
}: SlideContainerProps) {
  const [isCaptionExpanded, setIsCaptionExpanded] = useState(false);
  
  const slideStyles = {
    prev: '-translate-x-full',
    current: 'translate-x-0',
    next: 'translate-x-full'
  };

  const containerStyles = twMerge(
    // Base styles
    'absolute inset-0 w-full h-full',
    'transition-transform duration-300 ease-out',
    slideStyles[position],
    // Theme variants
    'theme-default:overflow-hidden',
    'theme-rounded:overflow-hidden',
    'theme-sharp:border-none'
  );

  const captionStyles = twMerge(
    // Base styles
    'absolute bottom-0 left-0 right-0',
    'bg-bgcolor-alt/75 transition-all duration-300',
    // Theme variants
    'theme-default:border-t theme-default:border-bgcolor/10',
    'theme-rounded:mx-2 theme-rounded:mb-2 theme-rounded:rounded-lg',
    'theme-sharp:border-t theme-sharp:border-prcolor/20'
  );

  const captionContentStyles = twMerge(
    'prose prose-sm max-w-none text-txcolor p-4',
    'transition-[height,opacity] duration-300',
    !isCaptionExpanded && 'line-clamp-4'
  );

  const captionButtonStyles = twMerge(
    'absolute bottom-0 right-0 px-2 py-1 text-xs',
    'text-txcolor-secondary hover:text-txcolor',
    'bg-bgcolor-alt/50 hover:bg-bgcolor-alt/75',
    'transition-colors duration-200',
    'theme-default:rounded-tl',
    'theme-rounded:rounded-lg theme-rounded:m-1',
    'theme-sharp:border-l theme-sharp:border-t theme-sharp:border-prcolor/20'
  );

  return (
    <div className={containerStyles}>
      <Image
        src={image.imageAttributes.src}
        alt={image.imageAttributes.alt}
        fill
        className="object-cover mt-0 mb-0"
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        quality={75}
      />
      {image.processedCaption && (
        <div className={captionStyles}>
          <div 
            className={captionContentStyles}
            dangerouslySetInnerHTML={{ __html: image.processedCaption }}
          />
          {image.processedCaption.split('\n').length > 4 && (
            <button
              onClick={() => setIsCaptionExpanded(!isCaptionExpanded)}
              className={captionButtonStyles}
              type="button"
              aria-expanded={isCaptionExpanded}
            >
              {isCaptionExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}