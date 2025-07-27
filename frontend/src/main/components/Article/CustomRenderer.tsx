// FIXED: CustomRenderer.tsx - Exclude carousel from prose styling
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
                // Blockquotes also need to escape prose styling for proper theme control
                <div key={index} className="not-prose">
                  <CustomBlockquote {...chunk.blockquoteProps} />
                </div>
              ) : null;

            case 'carousel':
              if (chunk.images && chunk.images.length > 0 && chunk.dimensions && chunk.imageSetAnalysis) {
                return (
                  // CRITICAL FIX: Use not-prose to exclude carousel from Tailwind Typography
                  <div key={index} className="not-prose my-8">
                    <ImageCarousel 
                      images={chunk.images}
                      dimensions={chunk.dimensions}
                      initialAnalysis={chunk.imageSetAnalysis}
                    />
                  </div>
                );
              }
              return null;

            case 'image':
              return chunk.imageAttributes ? (
                // Single images also excluded for component-level styling control
                <div key={index} className="not-prose">
                  <ArticleImage
                    {...chunk.imageAttributes}
                  />
                </div>
              ) : null;

            case 'figure':
              return chunk.imageAttributes ? (
                <div key={index} className="not-prose">
                  <figure>
                    <ArticleImage
                      {...chunk.imageAttributes}
                      caption={chunk.caption}
                    />
                  </figure>
                </div>
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