// src/main/lib/markdown/parseCarousels.ts

import { convertSimpleMarkdownToHtml } from './markdownToHtml';
import { ContentChunk, CarouselItem, ImageAttributes } from './types';
import { fetchAssetMetadata } from '../directus';
import { parseMarkdownImage } from '../utils/parseMarkdownImage';

async function enrichImageAttributes(markdown: string): Promise<ImageAttributes> {
  const parsed = parseMarkdownImage(markdown);
  if (!parsed) {
    throw new Error('Invalid image markdown format');
  }
  
  const metadata = await fetchAssetMetadata(parsed.assetId);
  
  return {
    src: parsed.src,
    alt: metadata?.title || parsed.alt,
    width: metadata?.width,
    height: metadata?.height,
    title: metadata?.title,
    filename: metadata?.filename
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
      const enrichedAttributes = await enrichImageAttributes(chunk.content || '');
      currentCarousel.push({
        type: chunk.type,
        imageAttributes: enrichedAttributes,
        caption: chunk.type === 'figure' ? chunk.caption : undefined,
        expandedCaption: false
      });
    } else {
      await addCarousel();
      processedChunks.push(chunk);
    }
  }

  await addCarousel();
  return processedChunks;
}