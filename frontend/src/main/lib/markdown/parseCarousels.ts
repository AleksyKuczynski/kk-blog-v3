// src/main/lib/markdown/parseCarousels.ts

import { ContentChunk, CarouselItem, ImageAttributes } from './types';

function parseImageAttributes(markdown: string): ImageAttributes {
  const match = markdown.match(/!\[(.*?)\]\((.*?)(\s+".*?")?\)/);
  if (!match) {
    throw new Error('Invalid image markdown format');
  }
  
  const [, alt, src] = match;
  
  // For now, we'll let Next.js handle the image dimensions
  return {
    src: src.trim(),
    alt: alt.trim() || 'Article image',
  };
}

export function parseCarousels(chunks: ContentChunk[]): ContentChunk[] {
  const processedChunks: ContentChunk[] = [];
  let currentCarousel: CarouselItem[] = [];

  function addCarousel() {
    if (currentCarousel.length > 1) {
      processedChunks.push({
        type: 'carousel',
        images: currentCarousel,
        content: ''
      });
    } else if (currentCarousel.length === 1) {
      processedChunks.push({
        type: currentCarousel[0].type,
        imageAttributes: currentCarousel[0].imageAttributes,
        caption: currentCarousel[0].caption
      } as ContentChunk);
    }
    currentCarousel = [];
  }

  for (const chunk of chunks) {
    if (chunk.type === 'image' || chunk.type === 'figure') {
      const imageAttributes = parseImageAttributes(chunk.content || '');
      currentCarousel.push({
        type: chunk.type,
        imageAttributes,
        caption: chunk.type === 'figure' ? chunk.caption : undefined
      });
    } else {
      addCarousel();
      processedChunks.push(chunk);
    }
  }

  addCarousel();
  return processedChunks;
}