// src/main/lib/markdown/processContent.ts

import { parseBlockquotes } from './parseBlockquotes';
import { parseCarousels } from './parseCarousels';
import { generateToc } from './generateToc';
import { ProcessedContent, ContentChunk } from './markdownTypes';
import { extractImagesAndCaptions } from './extractImagesAndCaptions';
import { convertMarkdownToHtmlSync } from './markdownToHtml';
import { createAddHeadingIds } from './addHeadingIds';
import { processBalloonTips } from './processBalloonTips';

export async function processContent(content: string): Promise<ProcessedContent> {
  const addHeadingIds = createAddHeadingIds();

  try {
    // Wszystkie operacje są asynchroniczne
    const blockquoteChunks = await parseBlockquotes(content);
    let processedChunks: ContentChunk[] = [];

    for (const chunk of blockquoteChunks) {
      if (chunk.type === 'markdown' && chunk.content) {
        // Czekamy na zakończenie extractImagesAndCaptions
        const { chunks } = await extractImagesAndCaptions(chunk.content);
        // Carousels też musi być async
        const carouselChunks = await parseCarousels(chunks);
        const balloonTipChunks = processBalloonTips(carouselChunks);
        
        const htmlChunks = await Promise.all(balloonTipChunks.map(async (c) => {
          if (c.type === 'markdown' && c.content) {
            const htmlContent = convertMarkdownToHtmlSync(c.content);
            const contentWithIds = addHeadingIds(htmlContent);
            return { ...c, content: contentWithIds };
          }
          return c;
        }));
        
        processedChunks = [...processedChunks, ...htmlChunks];
      } else {
        processedChunks.push(chunk);
      }
    }

    const toc = generateToc(processedChunks
      .filter(chunk => chunk.type === 'markdown' && chunk.content)
      .map(chunk => chunk.content!)
      .join('\n'));

    return { chunks: processedChunks, toc };
  } catch (error) {
    console.error('Error in processContent:', error);
    return { 
      chunks: [{ type: 'markdown', content: `Error processing content: ${error instanceof Error ? error.message : String(error)}` }], 
      toc: [] 
    };
  }
}