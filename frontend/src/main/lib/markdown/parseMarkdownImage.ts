// src/main/lib/markdown/parseMarkdownImage.ts
import { DIRECTUS_URL } from '../directus/directusConstants';

export function parseMarkdownImage(markdown: string): { alt: string; src: string; assetId: string } | null {
  const match = markdown.match(/!\[(.*?)\]\((.*?)(\s+".*?")?\)/);
  if (!match) {
    return null;
  }
  
  const [, alt, rawSrc] = match;
  let src = rawSrc.trim();
  let assetId = '';

  // Handle different URL formats
  if (src.includes('/assets/')) {
    // Extract asset ID from full URL (handles old cached URLs)
    assetId = src.split('/assets/').pop()?.split('?')[0] || '';
    // Reconstruct URL using current DIRECTUS_URL
    src = `${DIRECTUS_URL}/assets/${assetId}`;
  } else {
    // Assume it's just an asset ID
    assetId = src;
    src = `${DIRECTUS_URL}/assets/${assetId}`;
  }

  return {
    alt: alt.trim() || 'Article image',
    src,
    assetId
  };
}