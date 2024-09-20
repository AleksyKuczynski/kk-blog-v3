// src/main/components/Article/Content.tsx
import React from 'react';
import { CustomRenderer } from './CustomRenderer';
import { ContentChunk, TocItem } from '@/main/lib/markdown/types';

interface ContentProps {
  chunks: ContentChunk[];
  toc: TocItem[];
  title?: string;
  author?: string;
  datePublished?: string;
}

export function Content({ chunks, toc, title, author, datePublished }: ContentProps) {
  const structuredData = title && author && datePublished ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "author": {
      "@type": "Person",
      "name": author
    },
    "datePublished": datePublished,
  } : null;

  return (
    <article className="prose-lg dark:prose-invert max-w-none">
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      <CustomRenderer chunks={chunks} />
    </article>
  );
}