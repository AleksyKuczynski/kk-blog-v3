// src/main/components/Article/elements/Image.tsx
import React from 'react';
import Image from 'next/image';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}

const imageStyles = [
  // Base styles
  'max-w-full h-auto',
  // Theme variants
  'theme-default:shadow-md',
  'theme-rounded:rounded-xl theme-rounded:shadow-lg',
  'theme-sharp:border-2 theme-sharp:border-prcolor'
].join(' ');

const figureStyles = [
  // Base styles
  'my-6',
  // Theme variants
  'theme-default:text-center',
  'theme-rounded:text-center theme-rounded:p-2',
  'theme-sharp:border-l-2 theme-sharp:border-prcolor theme-sharp:pl-4'
].join(' ');

const captionStyles = [
  // Base styles
  'mt-2 text-sm text-txcolor-secondary',
  // Theme variants
  'theme-default:italic',
  'theme-rounded:font-medium theme-rounded:bg-bgcolor-alt theme-rounded:rounded-lg theme-rounded:p-2',
  'theme-sharp:uppercase theme-sharp:text-xs theme-sharp:tracking-wider'
].join(' ');

export const ArticleImage: React.FC<ImageProps> = ({ src, alt, width = 800, height = 600, caption }) => (
  <figure className={figureStyles}>
    <Image 
      src={src} 
      alt={alt} 
      width={width} 
      height={height} 
      className={imageStyles}
    />
    {caption && (
      <figcaption className={captionStyles}>
        {caption}
      </figcaption>
    )}
  </figure>
);