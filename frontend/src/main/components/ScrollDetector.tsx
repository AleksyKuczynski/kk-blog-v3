// src/main/components/ScrollDetector.tsx
'use client';

import { useEffect } from 'react';

export default function ScrollDetector() {
  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;

      if (currentScrollY > lastScrollY) {
        document.body.classList.add('scroll-down');
      } else {
        document.body.classList.remove('scroll-down');
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
}