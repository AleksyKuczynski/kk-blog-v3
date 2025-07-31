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

// Cache for expensive calculations
const calculationCache = new Map<string, CarouselDimensions>();

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
  // Round viewport dimensions to reduce cache misses
  const roundedWidth = Math.round(viewportWidth / 50) * 50;
  const roundedHeight = Math.round(viewportHeight / 50) * 50;
  
  const isSmallVerticalViewport = roundedHeight < 700; // Small phone screens
  const isBigVerticalScreen = roundedWidth < roundedHeight && roundedHeight > 900; // Large tablets/desktop portrait
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
  const carouselWidth = Math.min(roundedWidth * 0.9, 1200); // Max carousel width
  const resultingHeight = carouselWidth / medianRatio;
  const maxAllowedHeight = roundedHeight * 0.7; // 70% of viewport height
  
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

function generateCacheKey(
  medianRatio: number,
  viewportWidth: number,
  viewportHeight: number,
  breakpoint: ViewportBreakpoint,
  analysis: ImageSetAnalysis
): string {
  // Round values to reduce cache key variations
  const roundedRatio = Math.round(medianRatio * 100) / 100;
  const roundedWidth = Math.round(viewportWidth / 100) * 100; // Increased rounding to reduce variations
  const roundedHeight = Math.round(viewportHeight / 100) * 100;
  
  return `${roundedRatio}-${roundedWidth}-${roundedHeight}-${breakpoint}-${analysis.consistency}-${analysis.dominance.level}`;
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
  
  // Generate cache key
  const cacheKey = generateCacheKey(medianRatio, viewportWidth, viewportHeight, breakpoint, analysis);
  
  // Check cache first
  if (calculationCache.has(cacheKey)) {
    const cached = calculationCache.get(cacheKey)!;
    console.log('Using cached carousel dimensions:', cached);
    return cached;
  }
  
  console.log(`Carousel: Calculating new dimensions with median ratio: ${medianRatio.toFixed(2)} from ${mediaRatios.length} images`);
  
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
  
  // Calculate breakpoint dimensions more efficiently
  const allBreakpoints: ViewportBreakpoint[] = [
    'mobile-portrait', 'mobile-landscape', 
    'tablet-portrait', 'tablet-landscape',
    'desktop-portrait', 'desktop-landscape'
  ];
  
  const breakpointDimensions: BreakpointDimensions[] = allBreakpoints.map(bp => {
    // Use simplified viewport dimensions for breakpoint calculations
    const bpViewportWidth = bp.includes('mobile') ? 375 : bp.includes('tablet') ? 768 : 1200;
    const bpViewportHeight = bp.includes('portrait') ? 800 : 600;
    
    const bpRatio = calculateOptimalRatio({
      medianRatio,
      viewportWidth: bpViewportWidth,
      viewportHeight: bpViewportHeight,
      breakpoint: bp
    });
    
    const bpMaxHeight = calculateMaxHeightForBreakpoint(
      bpRatio,
      bpViewportWidth,
      bpViewportHeight,
      bp
    );
    
    return {
      ratio: bpRatio,
      maxHeight: bpMaxHeight,
      imageDisplayMode: determineImageDisplayMode(bpRatio, analysis)
    };
  });
  
  const result: CarouselDimensions = {
    ratio: optimalRatio,
    maxHeight,
    height: maxHeight,
    imageDisplayMode,
    breakpointDimensions
  };
  
  // Cache the result
  calculationCache.set(cacheKey, result);
  
  // Limit cache size to prevent memory leaks - properly handle undefined
  if (calculationCache.size > 50) { // Reduced cache size
    const keys = Array.from(calculationCache.keys());
    const firstKey = keys[0];
    if (firstKey) {
      calculationCache.delete(firstKey);
    }
  }
  
  console.log(`Carousel: Final ratio: ${optimalRatio.toFixed(2)}, maxHeight: ${maxHeight}px, mode: ${imageDisplayMode} (cached: ${cacheKey})`);
  
  return result;
}