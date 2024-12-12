// src/main/components/Article/CustomRenderer.tsx

import React from 'react';
import { MarkdownContent } from './MarkdownContent';
import { CustomBlockquote } from './CustomBlockquote';
import dynamic from 'next/dynamic';
import { markdownToBlockquoteProps } from '@/main/lib/markdown/markdownToBlockquoteProps';
import { ContentChunk } from '@/main/lib/markdown/types';
import { ArticleImage } from './elements/Image';

const ImageCarousel = dynamic(() => import('./ImageCarousel'), { ssr: false });

export const CustomRenderer: React.FC<{ chunks: ContentChunk[] }> = ({ chunks }) => {
  return (
    <>
      {chunks.map((chunk, index) => {
        try {
          switch (chunk.type) {
            case 'markdown':
              return chunk.content ? <MarkdownContent key={index} content={chunk.content} /> : null;
            case 'blockquote':
              if (chunk.content && chunk.blockquoteType) {
                const blockquoteProps = markdownToBlockquoteProps(chunk.content, chunk.blockquoteType);
                return <CustomBlockquote key={index} {...blockquoteProps} />;
              }
              return null;
            case 'carousel':
              return chunk.images && chunk.images.length > 0 ? (
                <ImageCarousel key={index} images={chunk.images} />
              ) : null;
              case 'image':
                return chunk.imageAttributes ? (
                  <ArticleImage
                    key={index}
                    {...chunk.imageAttributes}
                  />
                ) : null;
              case 'figure':
                return chunk.imageAttributes ? (
                  <figure key={index}>
                    <ArticleImage
                      {...chunk.imageAttributes}
                      caption={chunk.caption}
                    />
                  </figure>
                ) : null;
              default:
              console.warn(`Unknown chunk type for chunk ${index}: ${chunk.type}`);
              return null;
          }
        } catch (error) {
          console.error(`Error rendering chunk ${index}:`, error);
          return <div key={index}>Error rendering content: {String(error)}</div>;
        }
      })}
    </>
  );
};