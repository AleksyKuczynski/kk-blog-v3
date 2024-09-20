// /frontend/src/main/lib/markdown/processBalloonTips.ts

import { ContentChunk } from './types';

const URL_REGEX = /^(https?:\/\/)/i;

export function processBalloonTips(chunks: ContentChunk[]): ContentChunk[] {
  return chunks.map(chunk => {
    if (chunk.type === 'markdown' && chunk.content) {
      chunk.content = chunk.content.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        (match, text, url) => {
          if (URL_REGEX.test(url)) {
            // Regular link, keep as is
            return match;
          } else {
            // Convert to Tailwind-styled tooltip
            return `<span class="relative inline-block group cursor-help border-b border-dotted border-gray-500">
              ${text}
              <span class="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                ${url}
              </span>
            </span>`;
          }
        }
      );
    }
    return chunk;
  });
}