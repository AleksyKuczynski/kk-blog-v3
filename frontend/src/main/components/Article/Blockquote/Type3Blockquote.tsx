// src/main/components/Article/Blockquote/Type3Blockquote.tsx
import { twMerge } from 'tailwind-merge';

interface Type3Props {
  content: string;
  author: string;
  source: string;
}

export function Type3Blockquote({ content, author, source }: Type3Props) {
  const containerStyles = twMerge(
    // Base styles
    'relative mb-6 p-4 pl-12 md:pl-0 md:pr-12 flex flex-col items-end',
    // Theme variants
    'theme-default:pl-12 theme-default:md:pl-0',
    'theme-rounded:pl-12 theme-rounded:md:pl-0',
    'theme-sharp:pl-12'
  );

  const contentStyles = twMerge(
    // Base styles
    'text-on-sf-var mb-4 md:w-1/2',
    // Theme variants
    'theme-default:text-lg theme-default:font-serif theme-default:leading-relaxed theme-default:italic',
    'theme-rounded:text-lg theme-rounded:font-serif',
    'theme-sharp:leading-snug theme-sharp:font-light theme-sharp:text-lg'
  );

  const authorStyles = twMerge(
    // Base styles
    'text-on-sf-var mb-1 md:w-1/2 text-right',
    // Theme variants
    'theme-default:font-medium theme-default:text-base',
    'theme-rounded:font-serif theme-rounded:font-semibold theme-rounded:text-base',
    'theme-sharp:font-semibold theme-sharp:tracking-wide theme-sharp:text-sm'
  );

  const sourceStyles = twMerge(
    // Base styles
    'text-on-sf-var text-right text-sm mt-0',
    // Theme variants
    'theme-default:text-on-sf-var/75 theme-default:italic theme-default:md:w-1/2',
    'theme-rounded:font-serif theme-rounded:text-on-sf-var/80',
    'theme-sharp:tracking-wide'
  );

  return (
    <blockquote className={containerStyles}>
      <p className={contentStyles}>{content}</p>
      <p className={authorStyles}>— {author}</p>
      <p className={sourceStyles}>{source}</p>
    </blockquote>
  );
}