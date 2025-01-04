// src/main/components/Article/CustomRenderer.tsx

import React from 'react';
import { MarkdownContent } from './MarkdownContent';
import { CustomBlockquote } from './Blockquote/CustomBlockquote';
import { ContentChunk } from '@/main/lib/markdown/markdownTypes';
import { ArticleImage } from './elements/Image';
import ImageCarousel from './Carousel/ImageCarousel';

export const CustomRenderer: React.FC<{ chunks: ContentChunk[] }> = ({ chunks }) => {
  return (
    <>
      {chunks.map((chunk, index) => {
        try {
          switch (chunk.type) {
            case 'markdown':
              return chunk.content ? <MarkdownContent key={index} content={chunk.content} /> : null;
              
            case 'blockquote':
              return chunk.blockquoteProps ? (
                <CustomBlockquote key={index} {...chunk.blockquoteProps} />
              ) : null;

            case 'carousel':
              if (chunk.images && chunk.images.length > 0 && chunk.dimensions && chunk.imageSetAnalysis) {
                return (
                  <ImageCarousel 
                    key={index} 
                    images={chunk.images}
                    dimensions={chunk.dimensions}
                    initialAnalysis={chunk.imageSetAnalysis}
                  />
                );
              }
              return null;

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
          return null;
        }
      })}
    </>
  );
};