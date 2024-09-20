// src/main/lib/markdown/markdownToBlockquoteProps.ts

import { CustomBlockquoteProps } from '@/main/components/Article/CustomBlockquote';

export function markdownToBlockquoteProps(content: string, blockquoteType: '1' | '2' | '3' | '4'): CustomBlockquoteProps {
  const lines = content.split('\n');
  let heading: string | undefined;
  let avatar: string | undefined;
  const paragraphs: string[] = [];

  lines.forEach(line => {
    line = line.trim();
    if (line.startsWith('### ')) {
      heading = line.slice(4).trim();
    } else if (line.startsWith('![')) {
      const match = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
      if (match) {
        avatar = match[2];
      }
    } else if (line.length > 0) {
      paragraphs.push(line);
    }
  });

  return {
    heading,
    avatar,
    content: paragraphs,
    blockquoteType
  };
}