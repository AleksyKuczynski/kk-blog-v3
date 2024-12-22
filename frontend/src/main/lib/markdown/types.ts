// src/main/lib/markdown/types.ts

export interface ContentChunk {
  type: 'markdown' | 'blockquote' | 'carousel' | 'figure' | 'image';
  content?: string;
  blockquoteType?: '1' | '2' | '3' | '4';
  blockquoteProps?: BlockquoteProps;
  caption?: string;
  images?: CarouselItem[];
  imageAttributes?: ImageAttributes;
  imageSetAnalysis?: ImageSetAnalysis;
  dimensions?: CarouselDimensions;
}

export interface TocItem {
  id: string;
  text: string;
}

export interface ProcessedContent {
  chunks: ContentChunk[];
  toc: TocItem[];
}

export interface ImageAttributes {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  title?: string;
  filename?: string;
}

export interface BreakpointDimensions {
  ratio: number;
  maxHeight: number;
  imageDisplayMode: 'center-horizontal' | 'center-vertical' | 'square';
}

export interface CarouselDimensions extends BreakpointDimensions {
  breakpointDimensions: BreakpointDimensions[];
}

export interface ImageSetAnalysis {
  medianRatio: number;
  averageRatio: number;
  ratioDistribution: {
    landscape: number;
    portrait: number;
    square: number;
  };
  recommendedDisplayMode: 'landscape' | 'portrait' | 'square';
}

export type ViewportOrientation = 'portrait' | 'landscape';
export type DeviceType = 'mobile' | 'tablet' | 'desktop';
export type ViewportBreakpoint = 
  | 'mobile-portrait' 
  | 'mobile-landscape'
  | 'tablet-portrait'
  | 'tablet-landscape'
  | 'desktop-portrait'
  | 'desktop-landscape';

export interface BreakpointConstraints {
  maxRatio: number;
  minRatio: number;
  maxHeight: number;
  preferredRatio: number;
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

export interface CarouselItem {
  type: 'image' | 'figure';
  imageAttributes: ImageAttributes;
  caption?: string;
  processedCaption?: string;
  expandedCaption: boolean;
}

export interface ImageSetAnalysis {
  medianRatio: number;
  averageRatio: number;
  ratioDistribution: {
    landscape: number;
    portrait: number;
    square: number;
  };
  recommendedDisplayMode: 'landscape' | 'portrait' | 'square';
}

export interface BlockquoteBase {
  type: '1' | '2' | '3' | '4';
  content: string;
}

export interface HighlightBlockquote extends BlockquoteBase {
type: '1';
}

export interface QuoteBlockquote extends BlockquoteBase {
type: '2';
author: string;
}

export interface EpigraphBlockquote extends BlockquoteBase {
type: '3';
source: string;
author: string;
}

export interface ProfileBlockquote extends BlockquoteBase {
type: '4';
author: string;
avatarUrl: string;
}

export type BlockquoteProps = 
| HighlightBlockquote 
| QuoteBlockquote 
| EpigraphBlockquote 
| ProfileBlockquote;