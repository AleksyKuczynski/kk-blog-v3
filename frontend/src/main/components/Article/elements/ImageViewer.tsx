// src/main/components/Article/elements/ImageViewer.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { createThemeStyles } from '@/main/lib/utils/utils';
import { twMerge } from 'tailwind-merge';

interface ImageViewerProps {
  src: string;
  alt: string;
  onClose: () => void;
}

interface Transform {
  scale: number;
  x: number;
  y: number;
}

interface TouchState {
  x: number;
  y: number;
  distance?: number;
}

const viewerStyles = twMerge(
  // Base styles
  'fixed inset-0 z-50 bg-bgcolor',
  'transition-all duration-300 ease-in-out',
  'flex items-center justify-center',
  'touch-none',
  // Theme variants
  'theme-default:opacity-95',
  'theme-rounded:opacity-90',
  'theme-sharp:opacity-100'
);

export default function ImageViewer({ src, alt, onClose }: ImageViewerProps) {
  const [transform, setTransform] = React.useState<Transform>({ scale: 1, x: 0, y: 0 });
  const touchStateRef = React.useRef<TouchState | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      
      touchStateRef.current = {
        x: (touch1.clientX + touch2.clientX) / 2,
        y: (touch1.clientY + touch2.clientY) / 2,
        distance
      };
    } else if (e.touches.length === 1 && transform.scale > 1) {
      touchStateRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStateRef.current) return;

    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );

      if (touchStateRef.current.distance) {
        const delta = distance / touchStateRef.current.distance;
        const newScale = Math.min(Math.max(transform.scale * delta, 1), 4);
        
        setTransform(prev => ({
          ...prev,
          scale: newScale
        }));

        touchStateRef.current = {
          x: (touch1.clientX + touch2.clientX) / 2,
          y: (touch1.clientY + touch2.clientY) / 2,
          distance
        };
      }
    } else if (e.touches.length === 1 && transform.scale > 1) {
      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStateRef.current.x;
      const deltaY = touch.clientY - touchStateRef.current.y;

      setTransform(prev => ({
        ...prev,
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));

      touchStateRef.current = {
        x: touch.clientX,
        y: touch.clientY
      };
    }
  };

  const handleTouchEnd = () => {
    touchStateRef.current = null;
    if (transform.scale === 1) {
      onClose();
    }
  };

  return (
    <div 
      className={viewerStyles}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={() => transform.scale === 1 && onClose()}
    >
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
            transition: transform.scale === 1 ? 'transform 0.2s' : 'none'
          }}
          priority={false}
          draggable={false}
          unoptimized
        />
      </div>
    </div>
  );
}