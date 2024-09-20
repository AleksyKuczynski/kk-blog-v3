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

export const ArticleImage: React.FC<ImageProps> = ({ src, alt, width, height, caption }) => (
  <figure className="my-4">
    <Image 
      src={src} 
      alt={alt} 
      width={width || 800} 
      height={height || 600} 
      layout="responsive" 
      className="max-w-full h-auto" 
    />
    {caption && <figcaption className="text-center text-sm mt-2 text-gray-600">{caption}</figcaption>}
  </figure>
);