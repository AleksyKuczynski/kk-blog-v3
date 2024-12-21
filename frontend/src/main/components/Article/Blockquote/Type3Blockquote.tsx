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
    'text-on-sf-var text-right mb-1',
    // Theme variants
    'theme-default:font-medium theme-default:text-lg',
    'theme-rounded:font-serif theme-rounded:text-xl',
    'theme-sharp:font-semibold theme-sharp:tracking-wider'
  );

  const sourceStyles = twMerge(
    // Base styles
    'text-on-sf-var text-right text-sm',
    // Theme variants
    'theme-default:text-on-sf-var/75 theme-default:italic',
    'theme-rounded:font-serif theme-rounded:text-on-sf-var/80',
    'theme-sharp:font-medium theme-sharp:tracking-wide theme-sharp:text-pr-cont'
  );

  return (
    <blockquote className={containerStyles}>
      <p className={contentStyles}>{content}</p>
      <p className={authorStyles}>— {author}</p>
      <p className={sourceStyles}>{source}</p>
    </blockquote>
  );
}