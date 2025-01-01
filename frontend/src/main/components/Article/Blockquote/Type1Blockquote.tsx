// src/main/components/Article/Blockquote/Type1Blockquote.tsx
import { twMerge } from 'tailwind-merge';

interface Type1Props {
  content: string;
}

export function Type1Blockquote({ content }: Type1Props) {
  const containerStyles = twMerge(
    // Base styles
    'relative mb-6 p-6 pt-4 md:mx-8 lg:mx-auto lg:my-12 lg:w-5/6 xl:w-3/4',
    'before:text-start before:absolute',
    // Theme variants
    'theme-default:border-l-2 theme-default:border-pr-cont',
    'theme-default:xl:px-8',
    'theme-rounded:rounded-xl theme-rounded:shadow-md',
    'theme-rounded:before:content-["“"] theme-rounded:before:font-display theme-rounded:before:text-8xl theme-rounded:before:text-pr-cont ',
    'theme-sharp:before:content-["“"] theme-sharp:before:font-sans theme-sharp:before:-ml-4 theme-sharp:before:lg:-ml-8 theme-sharp:before:text-6xl theme-sharp:before:lg:text-8xl theme-sharp:before:text-ol-var '
  );

  const textStyles = twMerge(
    // Base styles
    'text-on-sf-var my-0',
    // Theme variants
    'theme-default:text-2xl theme-default:font-serif theme-default:leading-relaxed',
    'theme-rounded:pt-12 theme-rounded:pb-4',
    'theme-rounded:text-2xl theme-rounded:text-center theme-rounded:leading-relaxed',
    'theme-rounded:font-semibold theme-rounded:font-serif',
    'theme-sharp:ml-6 theme-sharp:py-4 theme-sharp:border-b theme-sharp:border-ol-var',
    'theme-sharp:font-sans theme-sharp:font-light theme-sharp:text-2xl theme-sharp:lg:text-3xl theme-sharp:leading-snug'
  );

  return (
    <blockquote className={containerStyles}>
      <p className={textStyles}>{content}</p>
    </blockquote>
  );
}