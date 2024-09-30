// src/main/components/ScrollWrapper.tsx
'use client';

import React, { useRef, useEffect, useState } from 'react';

interface ScrollWrapperProps {
  children: React.ReactNode;
  footer: React.ReactNode;
}

export default function ScrollWrapper({ children, footer }: ScrollWrapperProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerVisibility, setFooterVisibility] = useState(0);

  useEffect(() => {
    const contentElement = contentRef.current;
    const footerElement = footerRef.current;
    if (!contentElement || !footerElement) return;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.pageYOffset;
      const footerHeight = footerElement.offsetHeight;

      // Start showing footer when within 1.5 times its height from the bottom
      const thresholdPosition = documentHeight - windowHeight - footerHeight * 1.5;
      
      if (scrollPosition > thresholdPosition) {
        const visibilityPercentage = (scrollPosition - thresholdPosition) / (footerHeight * 1.5);
        setFooterVisibility(Math.min(1, Math.max(0, visibilityPercentage)));
      } else {
        setFooterVisibility(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div ref={contentRef} className="flex-grow">
        {children}
      </div>
      <div 
        ref={footerRef} 
        className="fixed bottom-0 left-0 right-0 transition-transform duration-300"
        style={{ transform: `translateY(${100 - footerVisibility * 100}%)` }}
      >
        {footer}
      </div>
    </div>
  );
}