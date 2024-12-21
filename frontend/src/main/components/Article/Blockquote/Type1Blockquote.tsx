// src/main/components/Article/Blockquote/Type1Blockquote.tsx
import { twMerge } from 'tailwind-merge';

interface Type1Props {
  content: string;
}

export function Type1Blockquote({ content }: Type1Props) {
  const containerStyles = twMerge(
    // Base styles
    'relative mb-6 p-6',
    // Theme variants
    'theme-default:bg-sf-cont theme-default:border-l-4 theme-default:border-pr-cont',
    'theme-rounded:bg-sf-cont theme-rounded:rounded-xl theme-rounded:shadow-md',
    'theme-sharp:bg-sf-cont theme-sharp:border theme-sharp:border-pr-fix'
  );

  const textStyles = twMerge(
    // Base styles
    'text-on-sf-var',
    // Theme variants
    'theme-default:text-lg theme-default:font-serif theme-default:leading-relaxed',
    'theme-rounded:text-xl theme-rounded:font-serif theme-rounded:leading-loose',
    'theme-sharp:font-sans theme-sharp:leading-snug'
  );

  return (
    <blockquote className={containerStyles}>
      <p className={textStyles}>{content}</p>
    </blockquote>
  );
}