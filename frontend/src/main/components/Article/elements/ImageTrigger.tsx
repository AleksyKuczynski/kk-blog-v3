// src/main/components/Article/elements/ImageTrigger.tsx
'use client';

import React from 'react';
import ImageViewer from './ImageViewer';

interface ImageTriggerProps {
  src: string;
  alt: string;
}

function ImageTrigger({ src, alt }: ImageTriggerProps) {
  const [showViewer, setShowViewer] = React.useState(false);

  const handleClick = () => {
    const isPortrait = window.innerHeight > window.innerWidth;
    const width = window.innerWidth;
    
    if ((isPortrait && width < 768) || (!isPortrait && width < 1024)) {
      setShowViewer(true);
    }
  };

  return (
    <>
      <div 
        className="absolute inset-0 portrait:md:hidden landscape:lg:hidden cursor-zoom-in" 
        onClick={handleClick}
      />
      {showViewer && (
        <ImageViewer 
          src={src} 
          alt={alt} 
          onClose={() => setShowViewer(false)} 
        />
      )}
    </>
  );
}

export default ImageTrigger;