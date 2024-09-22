// src/main/useScrollbarWidth.ts

'use client';

import { useLayoutEffect } from 'react';

export function useScrollbarWidth() {
  useLayoutEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
  }, []);
}