// src/main/components/Article/Carousel/utils/calculateOptimalRatio.ts

import { BREAKPOINT_CONSTRAINTS } from "./breakpointConstraints";
import { ViewportBreakpoint } from "@/main/lib/markdown/types";

export function calculateOptimalRatio(
  analysisRatio: number,
  breakpoint: ViewportBreakpoint,
  mediaRatios: number[]
): number {
  const { maxRatio, minRatio, preferredRatio } = BREAKPOINT_CONSTRAINTS[breakpoint];
  
  // Jeśli mamy tylko jeden obraz, używamy jego proporcji w granicach dozwolonych
  if (mediaRatios.length === 1) {
    return Math.min(Math.max(analysisRatio, minRatio), maxRatio);
  }

  // Sprawdzamy czy preferowana proporcja mieści się w granicach
  if (preferredRatio >= minRatio && preferredRatio <= maxRatio) {
    return preferredRatio;
  }

  // Jeśli nie, używamy średniej proporcji z zestawu w dozwolonych granicach
  return Math.min(Math.max(analysisRatio, minRatio), maxRatio);
}