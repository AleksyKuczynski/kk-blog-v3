// src/main/components/Article/Carousel/utils/calculateCarouselDimensions.ts
import { 
  BreakpointDimensions, 
  ImageSetAnalysis,
  ViewportBreakpoint,
  CarouselDimensions
} from "../carouselTypes";
import { getViewportBreakpoint } from "./viewportUtils";
import { BREAKPOINT_CONSTRAINTS } from "./breakpointConstraints";

interface CarouselDimensionsInput {
  analysis: ImageSetAnalysis;
  viewportWidth: number;
  viewportHeight: number;
  mediaRatios: number[];
}

interface ResponsiveCarouselConfig {
  medianRatio: number;
  viewportWidth: number;
  viewportHeight: number;
  breakpoint: ViewportBreakpoint;
}

function calculateMedianRatio(ratios: number[]): number {
  if (ratios.length === 0) return 1.5; // fallback
  
  const sorted = [...ratios].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

function calculateOptimalRatio({
  medianRatio,
  viewportWidth,
  viewportHeight,
  breakpoint
}: ResponsiveCarouselConfig): number {
  const isSmallVerticalViewport = viewportHeight < 700; // Small phone screens
  const isBigVerticalScreen = viewportWidth < viewportHeight && viewportHeight > 900; // Large tablets/desktop portrait
  const isHorizontalMedian = medianRatio > 1.1; // Landscape-oriented content
  
  // Case 1: Small vertical viewport + horizontal median → force square
  if (isSmallVerticalViewport && isHorizontalMedian) {
    console.log('Carousel: Using square ratio for small vertical viewport with horizontal content');
    return 1.0;
  }
  
  // Case 2: Big vertical screen + horizontal median → keep median
  if (isBigVerticalScreen && isHorizontalMedian) {
    console.log('Carousel: Using median ratio for large vertical screen');
    return medianRatio;
  }
  
  // Case 3: Check if resulting height would exceed viewport
  const carouselWidth = Math.min(viewportWidth * 0.9, 1200); // Max carousel width
  const resultingHeight = carouselWidth / medianRatio;
  const maxAllowedHeight = viewportHeight * 0.7; // 70% of viewport height
  
  if (resultingHeight > maxAllowedHeight) {
    const constrainedRatio = carouselWidth / maxAllowedHeight;
    console.log(`Carousel: Constraining ratio from ${medianRatio.toFixed(2)} to ${constrainedRatio.toFixed(2)} to fit viewport`);
    return constrainedRatio;
  }
  
  // Default: use median ratio
  return medianRatio;
}

function calculateMaxHeightForBreakpoint(
  ratio: number,
  viewportWidth: number,
  viewportHeight: number,
  breakpoint: ViewportBreakpoint
): number {
  const constraints = BREAKPOINT_CONSTRAINTS[breakpoint];
  
  // Calculate ideal width for this breakpoint
  const idealWidth = breakpoint.includes('mobile') 
    ? Math.min(viewportWidth * 0.95, 500)
    : breakpoint.includes('tablet')
    ? Math.min(viewportWidth * 0.9, 800)
    : Math.min(viewportWidth * 0.85, 1200);
  
  // Calculate resulting height from ratio
  const calculatedHeight = idealWidth / ratio;
  
  // Apply viewport constraints
  const maxViewportHeight = viewportHeight * (
    breakpoint.includes('mobile') ? 0.6 : 0.7
  );
  
  // Use the more restrictive limit
  return Math.min(
    calculatedHeight,
    maxViewportHeight,
    constraints.maxHeight
  );
}

function determineImageDisplayMode(
  ratio: number,
  analysis: ImageSetAnalysis
): 'center-horizontal' | 'center-vertical' | 'square' {
  // High consistency with strong dominance → use orientation-based mode
  if (analysis.consistency === 'high' && analysis.dominance.level === 'strong') {
    switch (analysis.dominance.orientation) {
      case 'landscape': return 'center-horizontal';
      case 'portrait': return 'center-vertical';
      default: return 'square';
    }
  }
  
  // Fallback to ratio-based decision
  if (ratio > 1.3) return 'center-horizontal';
  if (ratio < 0.8) return 'center-vertical';
  return 'square';
}

export function calculateCarouselDimensions({
  analysis,
  viewportWidth,
  viewportHeight,
  mediaRatios
}: CarouselDimensionsInput): CarouselDimensions {
  const breakpoint = getViewportBreakpoint(viewportWidth, viewportHeight);
  
  // Calculate median ratio from actual image data
  const medianRatio = calculateMedianRatio(mediaRatios);
  
  console.log(`Carousel: Calculated median ratio: ${medianRatio.toFixed(2)} from ${mediaRatios.length} images`);
  
  // Calculate optimal ratio considering responsive cases
  const optimalRatio = calculateOptimalRatio({
    medianRatio,
    viewportWidth,
    viewportHeight,
    breakpoint
  });
  
  // Calculate max height for current breakpoint
  const maxHeight = calculateMaxHeightForBreakpoint(
    optimalRatio,
    viewportWidth,
    viewportHeight,
    breakpoint
  );
  
  // Determine display mode
  const imageDisplayMode = determineImageDisplayMode(optimalRatio, analysis);
  
  // Calculate all breakpoint dimensions
  const allBreakpoints: ViewportBreakpoint[] = [
    'mobile-portrait', 'mobile-landscape', 
    'tablet-portrait', 'tablet-landscape',
    'desktop-portrait', 'desktop-landscape'
  ];
  
  const breakpointDimensions = allBreakpoints.map(bp => {
    const bpRatio = calculateOptimalRatio({
      medianRatio,
      viewportWidth: bp.includes('mobile') ? 375 : bp.includes('tablet') ? 768 : 1200,
      viewportHeight: bp.includes('portrait') ? 800 : 600,
      breakpoint: bp
    });
    
    const bpMaxHeight = calculateMaxHeightForBreakpoint(
      bpRatio,
      bp.includes('mobile') ? 375 : bp.includes('tablet') ? 768 : 1200,
      bp.includes('portrait') ? 800 : 600,
      bp
    );
    
    return {
      ratio: bpRatio,
      maxHeight: bpMaxHeight,
      imageDisplayMode: determineImageDisplayMode(bpRatio, analysis)
    };
  });
  
  console.log(`Carousel: Final ratio: ${optimalRatio.toFixed(2)}, maxHeight: ${maxHeight}px, mode: ${imageDisplayMode}`);
  
  return {
    ratio: optimalRatio,
    maxHeight,
    imageDisplayMode,
    breakpointDimensions
  };
}