// src/main/components/Article/ScrollToTopButton.tsx

'use client';

import { useState, useEffect } from 'react';
import { ChevronUpIcon } from '@/main/components/Interface/Icons';
import { FloatingButton } from '@/main/components/Interface/FloatingButton';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
    >
      <FloatingButton>
        <ChevronUpIcon className="h-6 w-6" />
      </FloatingButton>
    </button>
  );
}