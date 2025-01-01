// src/main/components/Article/Blockquote/Type2Blockquote.tsx
import { twMerge } from 'tailwind-merge';

interface Type2Props {
  content: string;
  author: string;
}

export function Type2Blockquote({ content, author }: Type2Props) {
  const containerStyles = twMerge(
    // Base styles
    'relative mb-6 p-6 md:mx-8 lg:mx-auto lg:my-12 lg:w-5/6 xl:w-3/4',
    'before:text-start before:absolute',
    // Theme variants
    'theme-default:border-l-2 theme-default:border-pr-cont',
    'theme-default:xl:px-8',
    'theme-rounded:rounded-xl theme-rounded:shadow-md',
    'theme-rounded:before:content-["“"] theme-rounded:before:font-display theme-rounded:before:text-8xl theme-rounded:before:text-pr-cont',
    'theme-sharp:before:content-["“"] theme-sharp:before:font-sans theme-sharp:before:-ml-4 theme-sharp:before:-ml-8 theme-sharp:before:text-6xl theme-sharp:lg:before:text-8xl theme-sharp:text-ol-var',
  );
  const contentStyles = twMerge(
    // Base styles
    'text-on-sf-var mt-0 mb-4',
    // Theme variants
    'theme-default:text-xl theme-default:font-serif theme-default:font-medium theme-default:leading-relaxed',
    'theme-rounded:pt-12  ',
    'theme-rounded:text-xl theme-rounded:text-center theme-rounded:leading-loose',
    'theme-rounded:font-medium theme-rounded:font-serif',
    'theme-sharp:ml-6 theme-sharp:pt-6',
    'theme-sharp:font-light theme-sharp:text-xl theme-sharp:lg:text-2xl theme-sharp:leading-snug'
  );
  const authorStyles = twMerge(
    // Base styles
    'text-on-sf-var text-right mb-2',
    // Theme variants
    'theme-default:font-medium theme-default:text-base',
    'theme-rounded:text-base theme-rounded:font-medium  theme-rounded:font-serif',
    'theme-sharp:ml-6 theme-sharp:pb-6 theme-sharp:border-b theme-sharp:border-ol-var',
    'theme-sharp:font-semibold theme-sharp:tracking-wide theme-sharp:text-sm'
  );
  
  return (
  <blockquote className={containerStyles}>
  <p className={contentStyles}>{content}</p>
  <p className={authorStyles}>— {author}</p>
  </blockquote>
  );
}