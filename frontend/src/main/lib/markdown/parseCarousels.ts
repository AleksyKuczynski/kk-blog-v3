// src/main/lib/markdown/parseCarousels.ts

import { convertSimpleMarkdownToHtml } from './markdownToHtml';
import { ContentChunk, CarouselItem, ImageAttributes } from './types';

function parseImageAttributes(markdown: string): ImageAttributes {
  const match = markdown.match(/!\[(.*?)\]\((.*?)(\s+".*?")?\)/);
  if (!match) {
    throw new Error('Invalid image markdown format');
  }
  
  const [, alt, src] = match;
  
  return {
    src: src.trim(),
    alt: alt.trim() || 'Article image',
  };
}

export async function parseCarousels(chunks: ContentChunk[]): Promise<ContentChunk[]> {
  const processedChunks: ContentChunk[] = [];
  let currentCarousel: CarouselItem[] = [];

  async function addCarousel() {
    if (currentCarousel.length > 1) {
      processedChunks.push({
        type: 'carousel',
        images: currentCarousel.map(item => ({
          ...item,
          processedCaption: item.caption ? convertSimpleMarkdownToHtml(item.caption) : undefined
        })),
        content: ''
      });
    } else if (currentCarousel.length === 1) {
      const item = currentCarousel[0];
      processedChunks.push({
        type: item.type,
        imageAttributes: item.imageAttributes,
        caption: item.caption,
        processedCaption: item.caption ? convertSimpleMarkdownToHtml(item.caption) : undefined
      } as ContentChunk);
    }
    currentCarousel = [];
  }

  for (const chunk of chunks) {
    if (chunk.type === 'image' || chunk.type === 'figure') {
      currentCarousel.push({
        type: chunk.type,
        imageAttributes: chunk.imageAttributes!,
        caption: chunk.type === 'figure' ? chunk.caption : undefined
      });
    } else {
      await addCarousel();
      processedChunks.push(chunk);
    }
  }

  await addCarousel();
  return processedChunks;
}