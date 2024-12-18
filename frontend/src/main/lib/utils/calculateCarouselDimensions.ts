// src/main/lib/utils/calculateCarouselDimensions.ts
interface ImageDimensions {
  width: number;
  height: number;
}

interface CaptionInfo {
  lines: number;
  isExpandable: boolean;
}

export interface CarouselDimensions {
  width: number;
  height: number;
  imageHeight: number;
  captionHeight: number;
  imageDisplayMode: 'center-horizontal' | 'center-vertical' | 'square';
}

const LINE_HEIGHT = 24; // px
const MAX_VISIBLE_LINES = 4;
const MIN_ASPECT_RATIO = 0.75;
const MAX_VIEWPORT_RATIO = 0.8;

export function calculateCarouselDimensions(
  images: ImageDimensions[],
  captions: CaptionInfo[],
  viewportWidth: number,
  viewportHeight: number
): CarouselDimensions {
  // Calculate average aspect ratio
  const avgAspectRatio = images.reduce((sum, img) => 
    sum + (img.height / img.width), 0) / images.length;

  // Initial dimensions based on viewport
  let width = Math.min(viewportWidth, 1200);
  let imageHeight = width * avgAspectRatio;
  
  // Calculate caption height based on current content
  const maxCaptionLines = Math.max(...captions.map(c => c.lines));
  const captionHeight = maxCaptionLines > 0 
    ? Math.min(maxCaptionLines, MAX_VISIBLE_LINES) * LINE_HEIGHT
    : 0;

  // Total height including buttons
  const totalHeight = imageHeight + captionHeight + 40; // 40px for buttons

  // Adjust if exceeds viewport
  if (totalHeight > viewportHeight * MAX_VIEWPORT_RATIO) {
    const reduction = totalHeight - (viewportHeight * MAX_VIEWPORT_RATIO);
    imageHeight -= reduction;
  }

  // Determine display mode
  const imageDisplayMode = avgAspectRatio > 1 
    ? 'center-vertical' 
    : avgAspectRatio < MIN_ASPECT_RATIO 
      ? 'center-horizontal' 
      : 'square';

  return {
    width,
    height: imageHeight + captionHeight + 40,
    imageHeight,
    captionHeight,
    imageDisplayMode
  };
}