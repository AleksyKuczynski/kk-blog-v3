// src/main/components/Article/CustomBlockquote.tsx
import Image from 'next/image';
import React from 'react';

export interface CustomBlockquoteProps {
  heading?: string;
  avatar?: string;
  content: string[];
  blockquoteType: '1' | '2' | '3' | '4';
}

const blockquoteBaseStyles = [
  // Base styles
  'p-6 mb-6 overflow-hidden relative',
  // Theme variants
  'theme-default:bg-bgcolor-alt theme-default:border-l-4 theme-default:border-prcolor',
  'theme-rounded:bg-bgcolor-alt theme-rounded:rounded-xl theme-rounded:shadow-lg',
  'theme-sharp:bg-bgcolor-alt theme-sharp:border-2 theme-sharp:border-prcolor'
].join(' ');

const headingStyles = [
  // Base styles
  'text-2xl font-bold mb-4 text-txcolor',
  // Theme variants
  'theme-default:border-b theme-default:border-prcolor theme-default:pb-2',
  'theme-rounded:bg-prcolor theme-rounded:text-bgcolor theme-rounded:p-2 theme-rounded:rounded-lg',
  'theme-sharp:border-b-2 theme-sharp:border-prcolor theme-sharp:uppercase theme-sharp:tracking-wider'
].join(' ');

const contentStyles = [
  // Base styles
  'text-txcolor space-y-4',
  // Theme variants
  'theme-default:italic',
  'theme-rounded:leading-relaxed theme-rounded:font-medium',
  'theme-sharp:leading-snug theme-sharp:pl-4'
].join(' ');

const avatarContainerStyles = [
  // Layout styles
  'float-left mr-4 mb-2 relative w-20 h-20',
  // Theme variants
  'theme-default:rounded',
  'theme-rounded:rounded-full theme-rounded:shadow-md',
  'theme-sharp:border-2 theme-sharp:border-prcolor'
].join(' ');

const avatarStyles = 'object-contain';

export const CustomBlockquote: React.FC<CustomBlockquoteProps> = ({ 
  heading, 
  avatar, 
  content, 
  blockquoteType 
}) => {
  return (
    <blockquote className={`${blockquoteBaseStyles} quote-type-${blockquoteType}`}>
      {heading && <h3 className={headingStyles}>{heading}</h3>}
      {avatar && (
        <div className={avatarContainerStyles}>
          <Image 
            src={avatar}
            alt=""
            width={80}
            height={80}
            className={avatarStyles}
          />
        </div>
      )}
      <div className={contentStyles}>
        {content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </blockquote>
  );
};