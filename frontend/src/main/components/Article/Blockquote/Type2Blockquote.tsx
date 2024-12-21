// src/main/components/Article/Blockquote/Type2Blockquote.tsx
import { twMerge } from 'tailwind-merge';

interface Type2Props {
  content: string;
  author: string;
}

export function Type2Blockquote({ content, author }: Type2Props) {
  const containerStyles = twMerge(
    // Base styles
    'relative mb-6 p-6',
    // Theme variants
    'theme-default:bg-sf-cont theme-default:border-l-4 theme-default:border-pr-cont',
    'theme-rounded:bg-sf-cont theme-rounded:rounded-xl theme-rounded:shadow-md',
    'theme-sharp:bg-sf-cont theme-sharp:border theme-sharp:border-pr-fix'
  );
  const contentStyles = twMerge(
    // Base styles
    'text-on-sf-var mb-4',
    // Theme variants
    'theme-default:text-lg theme-default:font-serif theme-default:leading-relaxed theme-default:italic',
    'theme-rounded:text-xl theme-rounded:font-serif theme-rounded:leading-loose',
    'theme-sharp:font-sans theme-sharp:leading-snug'
  );
  const authorStyles = twMerge(
    // Base styles
    'text-on-sf-var text-right',
    // Theme variants
    'theme-default:font-medium theme-default:text-lg',
    'theme-rounded:font-serif theme-rounded:text-xl',
    'theme-sharp:font-semibold theme-sharp:tracking-wider'
  );
  
  return (
  <blockquote className={containerStyles}>
  <p className={contentStyles}>{content}</p>
  <p className={authorStyles}>— {author}</p>
  </blockquote>
  );
}