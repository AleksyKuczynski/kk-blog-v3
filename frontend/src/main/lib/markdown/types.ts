// src/main/lib/markdown/types.ts

export interface ContentChunk {
  type: 'markdown' | 'blockquote' | 'carousel' | 'figure' | 'image';
  content?: string;
  blockquoteType?: '1' | '2' | '3' | '4';
  caption?: string;
  images?: CarouselItem[];
}

export interface TocItem {
  id: string;
  text: string;
}

export interface ProcessedContent {
  chunks: ContentChunk[];
  toc: TocItem[];
}

export interface CarouselItem {
  type: 'image' | 'figure';
  content: string;
  caption?: string;
}