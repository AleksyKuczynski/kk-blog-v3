// src/main/lib/utils/calculateCarouselDimensions.ts

import { CarouselItem, ImageAttributes } from "../markdown/types";

const BASE_LINE_HEIGHT = 24;
const BASE_PADDING = 16;
const NAVIGATION_HEIGHT = 56; // Wysokość paska nawigacji
const LINE_HEIGHT = 24;
const MAX_COLLAPSED_LINES = 4;
const PADDING = 32;
const VIEWPORT_BREAKPOINTS: ViewportBreakpoint[] = [
  { 
    width: 480,  // mobile
    height: 640,
    maxRatio: 1.2, // bardziej kwadratowe
    minRatio: 0.8
  },
  { 
    width: 768,  // tablet
    height: 1024,
    maxRatio: 1.5,
    minRatio: 0.75
  },
  { 
    width: 1200, // desktop
    height: 800,
    maxRatio: 2,
    minRatio: 0.5
  }
];

interface CaptionInfo {
  lines: number;
  isExpandable: boolean;
}

export interface CarouselDimensions {
  width: number;
  height: number;
  imageHeight: number;
  captionHeight: number;
  maxCaptionHeight: number; // Adding this for expanded captions
  imageDisplayMode: 'center-horizontal' | 'center-vertical' | 'square';
}

interface ViewportInfo {
  width: number;
  height: number;
  orientation: 'portrait' | 'landscape';
  ratio: number;
}

interface ImageInfo {
  width: number;
  height: number;
  ratio: number;
}

interface OptimalDisplay {
  mode: 'portrait' | 'landscape' | 'square';
  ratio: number;
}

interface ViewportBreakpoint {
  width: number;
  height: number;
  maxRatio: number; // maksymalny dopuszczalny ratio
  minRatio: number; // minimalny dopuszczalny ratio
}

export interface CaptionDimensions {
  actualHeight: number;
  collapsedHeight: number;
  isExpandable: boolean;
}

export interface CarouselDimensionsWithCaptions extends CarouselDimensions {
  captionStates: {
    [index: number]: CaptionDimensions;
  };
  shouldCollapseAll: boolean;
}

function getScaledValues(viewportWidth: number) {
  const scale = Math.max(0.75, Math.min(1, viewportWidth / 480));
  return {
    lineHeight: Math.round(BASE_LINE_HEIGHT * scale),
    padding: Math.round(BASE_PADDING * scale)
  };
}

function calculateOptimalDisplay(viewport: ViewportInfo, images: ImageInfo[]): OptimalDisplay {
  // Znajdź odpowiedni breakpoint
  const breakpoint = VIEWPORT_BREAKPOINTS.find(bp => viewport.width <= bp.width) || 
    VIEWPORT_BREAKPOINTS[VIEWPORT_BREAKPOINTS.length - 1];

  // Oblicz optymalne proporcje dla każdego obrazu
  const optimalRatios = images.map(img => ({
    ratio: img.ratio * viewport.ratio,
    orientation: img.ratio > 1 ? 'landscape' : 'portrait'
  }));

  // Średni optymalny ratio
  const avgOptimalRatio = optimalRatios.reduce((sum, r) => sum + r.ratio, 0) / optimalRatios.length;

  if (viewport.orientation === 'portrait') {
    if (avgOptimalRatio > breakpoint.maxRatio) {
      // Zbyt szeroki - ograniczamy
      return { 
        mode: 'landscape', 
        ratio: breakpoint.maxRatio 
      };
    } else if (avgOptimalRatio < breakpoint.minRatio) {
      // Zbyt wysoki - ograniczamy
      return { 
        mode: 'portrait', 
        ratio: breakpoint.minRatio 
      };
    }
    // W dopuszczalnych granicach - używamy średniej
    return { 
      mode: avgOptimalRatio > 1 ? 'landscape' : 'portrait',
      ratio: (avgOptimalRatio + viewport.ratio) / 2 
    };
  } else {
    if (avgOptimalRatio < 1/breakpoint.maxRatio) {
      // Zbyt wysoki - ograniczamy
      return { 
        mode: 'portrait', 
        ratio: 1/breakpoint.maxRatio 
      };
    } else if (avgOptimalRatio > 1/breakpoint.minRatio) {
      // Zbyt szeroki - ograniczamy
      return { 
        mode: 'landscape', 
        ratio: 1/breakpoint.minRatio 
      };
    }
    // W dopuszczalnych granicach - używamy średniej
    return { 
      mode: avgOptimalRatio > 1 ? 'landscape' : 'portrait',
      ratio: (avgOptimalRatio + viewport.ratio) / 2
    };
  }
}

export function calculateCarouselDimensions(
  images: Array<{ imageAttributes: ImageAttributes }>,
  captions: CaptionInfo[],
  viewportWidth: number,
  viewportHeight: number
): CarouselDimensions {
  const { lineHeight, padding } = getScaledValues(viewportWidth);
  
  // Obliczamy całkowitą dostępną wysokość
  const availableHeight = viewportHeight - NAVIGATION_HEIGHT - padding * 2;
  
  // Obliczamy wysokość podpisów
  const maxCaptionLines = Math.max(...captions.map(c => c.lines));
  const captionHeight = maxCaptionLines > 0 
    ? Math.min(maxCaptionLines * lineHeight + padding * 2, availableHeight * 0.3) // Max 30% wysokości
    : 0;

  // Obliczamy dostępną wysokość dla obrazu
  const availableImageHeight = availableHeight - captionHeight;

  // Obliczamy proporcje jak wcześniej, ale z nowymi ograniczeniami
  const viewport: ViewportInfo = {
    width: Math.min(viewportWidth, 1200),
    height: availableImageHeight,
    orientation: viewportWidth > availableImageHeight ? 'landscape' : 'portrait',
    ratio: viewportWidth / availableImageHeight
  };

  const imageInfos: ImageInfo[] = images.map(img => ({
    width: img.imageAttributes.width || 1200,
    height: img.imageAttributes.height || 800,
    ratio: (img.imageAttributes.width || 1200) / (img.imageAttributes.height || 800)
  }));

  const optimal = calculateOptimalDisplay(viewport, imageInfos);
  const width = Math.min(viewportWidth, 1200);
  const imageHeight = Math.min(
    width / optimal.ratio,
    availableImageHeight
  );

  return {
    width,
    height: imageHeight + captionHeight,
    imageHeight,
    captionHeight,
    maxCaptionHeight: maxCaptionLines * lineHeight + padding * 2,
    imageDisplayMode: optimal.mode === 'square' ? 'square' : 
                     optimal.mode === 'landscape' ? 'center-horizontal' : 
                     'center-vertical'
  };
}

export function calculateCaptionDimensions(
  activeItems: CarouselItem[],
  containerWidth: number,
  maxHeight: number
) {
  const dimensions: { [index: number]: CaptionDimensions } = {};
  let maxActualHeight = 0;

  activeItems.forEach((item, idx) => {
    if (!item.processedCaption) {
      dimensions[idx] = {
        actualHeight: 0,
        collapsedHeight: 0,
        isExpandable: false
      };
      return;
    }

    // Obliczamy szacowaną wysokość na podstawie ilości linii
    const estimatedLines = Math.ceil(
      (item.processedCaption.length * 0.5 * LINE_HEIGHT) / containerWidth
    );
    
    const actualHeight = estimatedLines * LINE_HEIGHT + PADDING;
    const collapsedHeight = Math.min(MAX_COLLAPSED_LINES * LINE_HEIGHT + PADDING, actualHeight);
    
    maxActualHeight = Math.max(maxActualHeight, actualHeight);

    dimensions[idx] = {
      actualHeight,
      collapsedHeight,
      isExpandable: estimatedLines > MAX_COLLAPSED_LINES
    };
  });

  const shouldCollapseAll = maxActualHeight > maxHeight * 0.4; // 40% maksymalnej wysokości

  return {
    captionStates: dimensions,
    shouldCollapseAll
  };
}