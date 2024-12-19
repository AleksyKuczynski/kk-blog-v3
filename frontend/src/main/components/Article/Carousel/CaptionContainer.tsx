// src/main/components/Article/Carousel/CaptionContainer.tsx
'use client';

import { twMerge } from 'tailwind-merge';
import { ChevronUpIcon } from '../../Interface';

interface CaptionContainerProps {
  caption: string;
  isExpanded: boolean;
  onToggle: () => void;
}

export function CaptionContainer({ caption, isExpanded, onToggle }: CaptionContainerProps) {
    const containerStyles = twMerge(
      'relative bg-bgcolor-alt/75',
      'transition-all duration-300',
      isExpanded ? 'max-h-[500px]' : 'max-h-[96px]', // ~4 lines
      'overflow-hidden'
    );
  
    return (
      <figcaption className={containerStyles}>
        <div className="p-4">
          <div 
            className="prose prose-sm max-w-none text-txcolor"
            dangerouslySetInnerHTML={{ __html: caption }}
          />
        </div>
        
        <button
          onClick={onToggle}
          className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-bgcolor-alt/75 to-transparent"
          aria-label={isExpanded ? "Show less" : "Show more"}
        >
          <span className="sr-only">
            {isExpanded ? "Show less" : "Show more"}
          </span>
          <ChevronUpIcon 
            className={`w-4 h-4 mx-auto transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
          />
        </button>
      </figcaption>
    );
  }