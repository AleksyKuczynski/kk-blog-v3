// src/main/lib/utils/parseMarkdownImage.ts
export function parseMarkdownImage(markdown: string): { alt: string; src: string; assetId: string } | null {
  const match = markdown.match(/!\[(.*?)\]\((.*?)(\s+".*?")?\)/);
  if (!match) {
    return null;
  }
  
  const [, alt, src] = match;
  const assetId = src.split('/').pop() || '';

  return {
    alt: alt.trim() || 'Article image',
    src: src.trim(),
    assetId
  };
}