// src/main/lib/markdown/parseCarousels.ts

import { ContentChunk, CarouselItem } from './types';
import { convertMarkdownToHtmlSync } from './markdownToHtml';

function convertMarkdownImageToHtml(markdown: string): string {
  const match = markdown.match(/!\[(.*?)\]\((.*?)\)/);
  if (match) {
    const [, alt, src] = match;
    return `<img src="${src}" alt="${alt}" />`;
  }
  return markdown;
}

function convertCaptionToHtml(caption: string | undefined): string | undefined {
  if (!caption) return undefined;
  return convertMarkdownToHtmlSync(caption);
}

export function parseCarousels(chunks: ContentChunk[]): ContentChunk[] {
  const processedChunks: ContentChunk[] = [];
  let currentCarousel: CarouselItem[] = [];

  function addCarousel() {
    if (currentCarousel.length > 1) {
      processedChunks.push({
        type: 'carousel',
        images: currentCarousel.map(item => ({
          ...item,
          content: convertMarkdownImageToHtml(item.content),
          caption: convertCaptionToHtml(item.caption)
        })),
        content: ''
      });
    } else if (currentCarousel.length === 1) {
      processedChunks.push({
        ...currentCarousel[0],
        content: convertMarkdownImageToHtml(currentCarousel[0].content),
        caption: convertCaptionToHtml(currentCarousel[0].caption)
      } as ContentChunk);
    }
    currentCarousel = [];
  }

  for (const chunk of chunks) {
    if (chunk.type === 'image' || chunk.type === 'figure') {
      currentCarousel.push({
        type: chunk.type,
        content: chunk.content || '',
        caption: chunk.type === 'figure' ? chunk.caption : undefined
      });
    } else {
      addCarousel();
      processedChunks.push(chunk);
    }
  }

  addCarousel(); // Handle any remaining carousel items

  return processedChunks;
}