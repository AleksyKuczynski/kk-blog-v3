// src/main/components/Article/elements/Image.tsx
import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { createThemeStyles } from '@/main/lib/utils';

const ImageViewer = dynamic(() => import('./ImageViewer'), { ssr: false });

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}

const imageStyles = createThemeStyles({
  base: 'w-full h-auto object-contain',
  default: '',
  rounded: 'lg:rounded-xl lg:shadow-lg',
  sharp: ''
});

const figureStyles = createThemeStyles({
  base: 'w-full',
  default: 'text-center',
  rounded: 'overflow-hidden',
  sharp: ''
});

const captionStyles = createThemeStyles({
  base: 'mt-2 text-on-sf-var',
  default: 'text-center italic',
  rounded: 'bg-sf-hi p-2 rounded-lg text-center',
  sharp: 'pl-4 text-sm uppercase tracking-wider'
});

export const ArticleImage = ({ src, alt, width, height, caption }: ImageProps) => {
  const defaultWidth = 1200;
  const defaultHeight = Math.round(defaultWidth * (9/16)); // 16:9 aspect ratio

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
          priority={false}
        />
        <ImageViewer
          src={src}
          alt={alt}
          width={width || defaultWidth}
          height={height || defaultHeight}
        />
      </div>
      {caption && (
        <figcaption className={captionStyles}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
};