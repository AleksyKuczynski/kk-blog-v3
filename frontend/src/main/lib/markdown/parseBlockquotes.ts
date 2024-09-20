// src/main/lib/markdown/parseBlockquotes.ts

import { ContentChunk } from './types';

export async function parseBlockquotes(content: string): Promise<ContentChunk[]> {
  const chunks: ContentChunk[] = [];
  const parts = content.split(/(:::[1-4]|:::)/);
  let isInBlockquote = false;
  let currentBlockquote = '';
  let blockquoteType: '1' | '2' | '3' | '4' | undefined;
  let currentMarkdown = '';

  for (let part of parts) {
    part = part.trim();
    
    if (part.startsWith(':::') && part.length === 4) {
      if (currentMarkdown) {
        chunks.push({
          type: 'markdown',
          content: currentMarkdown
        });
        currentMarkdown = '';
      }
      isInBlockquote = true;
      blockquoteType = part.slice(3) as '1' | '2' | '3' | '4';
      currentBlockquote = '';
    } else if (part === ':::') {
      if (isInBlockquote) {
        chunks.push({
          type: 'blockquote',
          content: currentBlockquote,
          blockquoteType
        });
        isInBlockquote = false;
        blockquoteType = undefined;
        currentBlockquote = '';
      }
    } else if (isInBlockquote) {
      currentBlockquote += part + '\n\n';
    } else {
      currentMarkdown += part + '\n\n';
    }
  }

  if (currentMarkdown) {
    chunks.push({
      type: 'markdown',
      content: currentMarkdown
    });
  }

  return chunks;
}