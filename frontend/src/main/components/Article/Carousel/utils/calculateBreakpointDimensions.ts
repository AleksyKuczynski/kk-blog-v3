// src/main/components/Article/Carousel/utils/calculateBreakpointDimensions.ts
import { ImageSetAnalysis } from "../carouselTypes";
import { calculateCarouselDimensions } from "./calculateCarouselDimensions";

export function calculateBreakpointDimensions(
  imageSetAnalysis: ImageSetAnalysis, 
  mediaRatios: number[]
) {
  // Predefiniowane breakpointy dla każdego wariantu
  const breakpoints = [
    { width: 375, height: 667 },  // mobile portrait
    { width: 667, height: 375 },  // mobile landscape
    { width: 768, height: 1024 }, // tablet portrait
    { width: 1024, height: 768 }, // tablet landscape
    { width: 1200, height: 1200 }, // desktop portrait
    { width: 1920, height: 1080 } // desktop landscape
  ];

  // Oblicz wymiary dla każdego breakpointa
  const allDimensions = breakpoints.map(bp => 
    calculateCarouselDimensions({
      analysis: imageSetAnalysis,
      viewportWidth: bp.width,
      viewportHeight: bp.height,
      mediaRatios
    })
  );

  // Desktop landscape jako domyślny dla SSR
  return {
    ...allDimensions[5],
    breakpointDimensions: allDimensions
  };
}