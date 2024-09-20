// src/main/lib/markdown/extractImagesAndCaptions.ts

import { ContentChunk } from './types';
import { extractCaption } from './captionUtils';

export function extractImagesAndCaptions(content: string): { chunks: ContentChunk[], remainingContent: string } {
  const chunks: ContentChunk[] = [];
  const lines = content.split('\n');
  let currentMarkdown = '';

  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();

    if (line.match(/^!\[.*?\]\(.*?\)$/)) {
      // If there's accumulated markdown content, create a chunk for it
      if (currentMarkdown.trim()) {
        chunks.push({
          type: 'markdown',
          content: currentMarkdown.trim()
        });
        currentMarkdown = '';
      }

      const { caption, endIndex } = extractCaption(lines, i + 1);

      if (caption) {
        chunks.push({
          type: 'figure',
          content: line,
          caption: caption
        });
        i = endIndex + 1;
      } else {
        chunks.push({
          type: 'image',
          content: line
        });
        i++;
      }
    } else {
      currentMarkdown += line + '\n';
      i++;
    }
  }

  // Add any remaining markdown content as a final chunk
  if (currentMarkdown.trim()) {
    chunks.push({
      type: 'markdown',
      content: currentMarkdown.trim()
    });
  }

  return {
    chunks,
    remainingContent: '' // We've processed all content into chunks
  };
}