// src/main/lib/markdown/parseCarousels.ts

import { convertSimpleMarkdownToHtml } from './markdownToHtml';
import { ContentChunk, CarouselItem, ImageAttributes } from './markdownTypes';
import { fetchAssetMetadata } from '../directus';
import { parseMarkdownImage } from './parseMarkdownImage';
import { analyzeImageSet } from '@/main/components/Article/Carousel/utils/analyzeImageSet';
import { calculateCarouselDimensions } from '@/main/components/Article/Carousel/utils/calculateCarouselDimensions';

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
          
          // SIMPLIFIED: Only detect caption presence/absence at markdown time
          const hasCaption = chunk.type === 'figure' && chunk.caption && chunk.caption.trim() !== '';
          const processedCaption = hasCaption 
            ? convertSimpleMarkdownToHtml(chunk.caption!)
            : ''; // Empty string if no caption
          
          carouselItems.push({
            type: chunk.type as 'image' | 'figure',
            imageAttributes: enrichedAttributes,
            caption: hasCaption ? chunk.caption : undefined,
            processedCaption
            // Removed: captionState - this is now handled client-side
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
        
        const dimensions = calculateCarouselDimensions({
          analysis: imageSetAnalysis,
          viewportWidth: typeof window !== 'undefined' ? window.innerWidth : 1200,
          viewportHeight: typeof window !== 'undefined' ? window.innerHeight : 800,
          mediaRatios
        });

        processedChunks.push({
          type: 'carousel',
          images: carouselItems,
          imageSetAnalysis,
          dimensions
        });
      }
    }

    imageBuffer = [];
  }

  for (const chunk of chunks) {
    if (chunk.type === 'image' || chunk.type === 'figure') {
      imageBuffer.push(chunk);
    } else {
      await processImageBuffer();
      processedChunks.push(chunk);
    }
  }

  await processImageBuffer();
  return processedChunks;
}