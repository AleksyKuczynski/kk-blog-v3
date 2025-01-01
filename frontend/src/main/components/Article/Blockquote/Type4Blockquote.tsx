// Type4Blockquote.tsx
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface Type4Props {
  content: string;
  author: string;
  avatarUrl: string;
}

export function Type4Blockquote({ content, author, avatarUrl }: Type4Props) {  
  const containerStyles = twMerge(
    // Base styles
    'mb-6 px-6 md:mx-8 lg:mx-auto lg:my-12 lg:w-5/6 xl:w-3/4',
    'before:text-start before:text-pr-cont before:absolute',
    // Theme variants
    'theme-default:border-l-2 theme-default:border-pr-cont',
    'theme-default:xl:px-8',
    'theme-rounded:grid theme-rounded:grid-cols-2 theme-rounded:pt-6',
    'theme-rounded:bg-sf-cont theme-rounded:rounded-xl theme-rounded:shadow-md',
    'theme-sharp:pb-0'
  );
  const authorStyles = twMerge(
    // Base styles
    'text-on-sf-var',
    // Theme variants
    'theme-default:font-medium theme-default:text-base',
    'theme-rounded:self-center theme-rounded:my-0 theme-rounded:font-serif theme-rounded:font-semibold theme-rounded:text-2xl',
    'theme-sharp:text-base theme-sharp:font-semibold theme-sharp:tracking-wide'
  );

  const avatarContainerStyles = twMerge(
    // Layout styles
    'mr-4 mb-2 relative w-20 h-20 overflow-hidden',
    // Theme variants
    'theme-default:rounded-full',
    'theme-rounded:justify-self-end theme-rounded:rounded-2xl theme-rounded:shadow-md',
    ''
  );

  const contentStyles = twMerge(
    // Base styles
    'text-on-sf-var pb-1',
    // Theme variants
    'theme-default:text-base theme-default:font-serif theme-default:font-medium theme-default:italic theme-default:leading-relaxed',
    'theme-rounded:col-span-2',
    'theme-rounded:pb-3 theme-rounded:text-base theme-rounded:font-medium theme-rounded:font-serif',
    'theme-sharp:ml-6 theme-sharp:border-b theme-sharp:border-ol-var',
    'theme-sharp:font-light theme-sharp:text-lg theme-sharp:leading-snug'
  );

  return (
    <blockquote className={containerStyles}>
      {avatarUrl && (
        <div className={avatarContainerStyles}>
          <Image 
            src={avatarUrl}
            alt=""
            width={80}
            height={80}
            className="h-full w-full object-cover my-0"
          />
        </div>
      )}
      <p className={authorStyles}>{author}</p>
      <div className={contentStyles}>
        {content.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </blockquote>
  );
}