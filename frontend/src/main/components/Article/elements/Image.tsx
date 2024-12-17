// src/main/components/Article/elements/Image.tsx
import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { twMerge } from 'tailwind-merge';

const ImageTrigger = dynamic(() => import('./ImageTrigger'), { ssr: false });

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}

export const ArticleImage = ({ src, alt, width, height, caption }: ImageProps) => {
  const defaultWidth = 1200;
  const defaultHeight = Math.round(defaultWidth * (9/16));

  const figureStyles = twMerge(
    'w-screen md:w-full overflow-hidden',
    'theme-default:-mx-3 theme-default:md:mx-0 theme-default:md:shadow-md theme-default:md:rounded-lg',
    'theme-rounded:md:shadow-lg theme-rounded:bg-sf-hi theme-rounded:md:rounded-3xl',
    ''
  );

  const imageStyles = twMerge(
    'object-cover mt-0 mb-0 w-full'
  );

  const captionStyles = twMerge(
    'text-center text-on-sf-var',
    'theme-default:my-2',
    'theme-rounded:m-3 theme-rounded:font-serif theme-rounded:text-center',
    'theme-sharp:font-medium theme-sharp:tracking-wider'
  );


  return (
    <figure className={figureStyles}>
      <div className="relative">
        <Image 
          src={src} 
          alt={alt} 
          width={width || defaultWidth}
          height={height || defaultHeight}
          className={imageStyles}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          quality={75}
        />
        <ImageTrigger src={src} alt={alt} />
      </div>
      {caption && (
        <figcaption className={captionStyles}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
};