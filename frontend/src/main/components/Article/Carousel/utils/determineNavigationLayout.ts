// src/main/components/Article/Carousel/utils/determineNavigationLayout.ts

import { ImageSetAnalysis, NavigationLayout, ViewportBreakpoint } from "../carouselTypes";

export function determineNavigationLayout(
  breakpoint: ViewportBreakpoint,
  imageAnalysis: ImageSetAnalysis
): NavigationLayout {
  // Force vertical layout for landscape orientations on mobile and tablet
  if (breakpoint === 'mobile-landscape' || breakpoint === 'tablet-landscape') {
    return 'vertical';
  }

  // Force vertical layout for portrait-dominant image sets
  if (imageAnalysis.dominance.orientation === 'portrait' && 
      imageAnalysis.dominance.level === 'strong') {
    return 'vertical';
  }

  // Default to horizontal layout for all other cases
  return 'horizontal';
}