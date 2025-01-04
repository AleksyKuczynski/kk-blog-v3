// src/main/lib/markdown/parseCarousels.ts

import { convertSimpleMarkdownToHtml } from './markdownToHtml';
import { ContentChunk, CarouselItem, ImageAttributes } from './markdownTypes';
import { fetchAssetMetadata } from '../directus';
import { parseMarkdownImage } from './parseMarkdownImage';
import { analyzeImageSet } from '@/main/components/Article/Carousel/utils/analyzeImageSet';
import { calculateBreakpointDimensions } from '@/main/components/Article/Carousel/utils/calculateBreakpointDimensions';

export async function parseCarousels(chunks: ContentChunk[]): Promise<ContentChunk[]> {
  const processedChunks: ContentChunk[] = [];
  let imageBuffer: ContentChunk[] = [];

  async function enrichImageAttributes(markdown: string): Promise<ImageAttributes> {
    const parsed = parseMarkdownImage(markdown);
    if (!parsed) {
      throw new Error('Invalid image markdown format');
    }
    
    const metadata = await fetchAssetMetadata(parsed.assetId);
    
    return {
      src: parsed.src,
      alt: metadata?.title || parsed.alt,
      width: metadata?.width || 1200,
      height: metadata?.height || 800,
      title: metadata?.title,
      filename: metadata?.filename
    };
  }

  async function processImageBuffer() {
    if (imageBuffer.length === 0) return;

    if (imageBuffer.length === 1) {
      processedChunks.push(imageBuffer[0]);
    } else {
      const carouselItems: CarouselItem[] = [];
      
      for (const chunk of imageBuffer) {
        try {
          const enrichedAttributes = await enrichImageAttributes(chunk.content || '');
          carouselItems.push({
            type: chunk.type as 'image' | 'figure',
            imageAttributes: enrichedAttributes,
            caption: chunk.type === 'figure' ? chunk.caption : undefined,
            expandedCaption: false
          });
        } catch (error) {
          console.error('Error processing image for carousel:', error);
        }
      }

      if (carouselItems.length > 0) {
        const imageSetAnalysis = analyzeImageSet(carouselItems);
        const mediaRatios = carouselItems.map(item => 
          (item.imageAttributes.width || 1200) / (item.imageAttributes.height || 800)
        );
        const dimensions = calculateBreakpointDimensions(imageSetAnalysis, mediaRatios);

        processedChunks.push({
          type: 'carousel',
          images: carouselItems.map(item => ({
            ...item,
            processedCaption: item.caption 
              ? convertSimpleMarkdownToHtml(item.caption) 
              : undefined
          })),
          imageSetAnalysis,
          dimensions
        });
      }
    }
    
    imageBuffer = [];
  }

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const nextChunk = i < chunks.length - 1 ? chunks[i + 1] : null;

    if (chunk.type === 'image' || chunk.type === 'figure') {
      imageBuffer.push(chunk);

      if (!nextChunk || (nextChunk.type !== 'image' && nextChunk.type !== 'figure')) {
        await processImageBuffer();
      }
    } else {
      await processImageBuffer();
      processedChunks.push(chunk);
    }
  }

  await processImageBuffer();

  return processedChunks;
}