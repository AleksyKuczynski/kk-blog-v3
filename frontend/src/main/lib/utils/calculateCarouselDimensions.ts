// src/main/lib/utils/calculateCarouselDimensions.ts

import { ImageAttributes } from "../markdown/types";

const LINE_HEIGHT = 24; // px
const CAPTION_PADDING = 32; // 2rem for top and bottom padding

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
  
  const viewport: ViewportInfo = {
    width: viewportWidth,
    height: viewportHeight,
    orientation: viewportWidth > viewportHeight ? 'landscape' : 'portrait',
    ratio: viewportWidth / viewportHeight
  };

  const imageInfos: ImageInfo[] = images.map(img => ({
    width: img.imageAttributes.width || 1200,
    height: img.imageAttributes.height || 800,
    ratio: (img.imageAttributes.width || 1200) / (img.imageAttributes.height || 800)
  }));

  const optimal = calculateOptimalDisplay(viewport, imageInfos);

  // Calculate dimensions based on optimal display
  const width = Math.min(viewportWidth, 1200); // Max width still applies
  let height: number;

  if (optimal.mode === 'square') {
    height = width;
  } else {
    height = width / optimal.ratio;
  }

  // Add caption height
  const maxCaptionLines = Math.max(...captions.map(c => c.lines));
  const captionHeight = maxCaptionLines > 0 
    ? Math.min(maxCaptionLines, 4) * LINE_HEIGHT + CAPTION_PADDING 
    : 0;

  return {
    width,
    height: height + captionHeight,
    imageHeight: height,
    captionHeight,
    maxCaptionHeight: maxCaptionLines * LINE_HEIGHT + CAPTION_PADDING,
    imageDisplayMode: optimal.mode === 'square' ? 'square' : 
                     optimal.mode === 'landscape' ? 'center-horizontal' : 
                     'center-vertical'
  };
}