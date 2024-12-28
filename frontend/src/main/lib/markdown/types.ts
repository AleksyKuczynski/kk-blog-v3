// src/main/lib/markdown/types.ts

import { CarouselDimensions, ImageSetAnalysis } from "@/main/components/Article/Carousel/carouselTypes";

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

export interface CarouselItem {
  type: 'image' | 'figure';
  imageAttributes: ImageAttributes;
  caption?: string;
  processedCaption?: string;
  expandedCaption: boolean;
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