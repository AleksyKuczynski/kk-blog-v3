// Type4Blockquote.tsx
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface Type4Props {
  content: string;
  author: string;
  avatarUrl: string;
}

export function Type4Blockquote({ content, author, avatarUrl }: Type4Props) {  const containerStyles = twMerge(
  // Base styles
  'relative mb-6 p-6 overflow-hidden',
  // Theme variants
  'theme-default:bg-sf-cont theme-default:border-l-4 theme-default:border-pr-cont',
  'theme-rounded:bg-sf-cont theme-rounded:rounded-xl theme-rounded:shadow-lg',
  'theme-sharp:bg-sf-cont theme-sharp:border-2 theme-sharp:border-prcolor'
);

  const authorStyles = twMerge(
    // Base styles
    'text-2xl font-bold mb-4 text-on-sf-var',
    // Theme variants
    'theme-default:border-b theme-default:border-prcolor theme-default:pb-2',
    'theme-rounded:bg-prcolor theme-rounded:text-bgcolor theme-rounded:p-2 theme-rounded:rounded-lg',
    'theme-sharp:border-b-2 theme-sharp:border-prcolor theme-sharp:uppercase theme-sharp:tracking-wider'
  );

  const avatarContainerStyles = twMerge(
    // Layout styles
    'float-left mr-4 mb-2 relative w-20 h-20',
    // Theme variants
    'theme-default:rounded',
    'theme-rounded:rounded-full theme-rounded:shadow-md',
    'theme-sharp:border-2 theme-sharp:border-prcolor'
  );

  const contentStyles = twMerge(
    // Base styles
    'text-on-sf-var space-y-4',
    // Theme variants
    'theme-default:italic',
    'theme-rounded:leading-relaxed theme-rounded:font-medium',
    'theme-sharp:leading-snug theme-sharp:pl-4'
  );

  return (
    <blockquote className={containerStyles}>
      <h3 className={authorStyles}>{author}</h3>
      {avatarUrl && (
        <div className={avatarContainerStyles}>
          <Image 
            src={avatarUrl}
            alt=""
            width={80}
            height={80}
            className="object-contain"
          />
        </div>
      )}
      <div className={contentStyles}>
        {content.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </blockquote>
  );
}