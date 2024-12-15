// src/main/components/Article/elements/ImageViewer.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { createThemeStyles } from '@/main/lib/utils';

interface ImageViewerProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const viewerStyles = createThemeStyles({
  base: [
    'fixed inset-0 z-50 bg-bgcolor touch-none md:hidden',
    'transition-all duration-300',
    'flex items-center justify-center'
  ].join(' '),
  default: 'opacity-95',
  rounded: 'opacity-90',
  sharp: 'opacity-100'
});

const imageStyles = createThemeStyles({
  base: [
    'w-full h-full object-cover',
    'transition-transform duration-300',
  ].join(' ')
});

export default function ImageViewer({ src, alt, width, height }: ImageViewerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  if (!isOpen) return null;

  return (
    <div className={viewerStyles} onClick={handleClick}>
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={imageStyles}
          loading="lazy"
          quality={100}
        />
      </div>
    </div>
  );
}