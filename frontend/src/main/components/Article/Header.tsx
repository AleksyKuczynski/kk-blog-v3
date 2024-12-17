// src/main/components/Article/Header.tsx
import Image from 'next/image';
import Link from 'next/link';
import { DIRECTUS_URL } from '@/main/lib/directus/constants';
import { AuthorDetails } from '@/main/lib/directus/interfaces';
import { Lang } from '@/main/lib/dictionaries/types';
import { IMAGE_RATIO_STRING } from '../constants';
import { twMerge } from 'tailwind-merge';

interface HeaderProps {
  title: string;
  publishedDate: string;
  authors: AuthorDetails[];
  lang: Lang;
  editorialText: string;
  imagePath?: string;
  lead?: string;
}

export function Header({ 
  title, 
  publishedDate, 
  authors, 
  lang, 
  editorialText, 
  imagePath,
  lead
}: HeaderProps) {
  const containerStyles = twMerge(
    // Base styles
    'relative mb-12 lg:grid grid-cols-2 justify-center',
    // Theme variants
    'theme-default:space-y-4 theme-default:md:space-y-6 theme-default:lg:space-y-0',
    '',
    'theme-sharp:space-y-4'
  );

  const titleStyles = twMerge(
    // Base styles
    'mb-8 lg:pl-6 xl:pl-8 font-bold',
    // Theme variants
    'theme-default:font-custom theme-default:tracking-wide theme-default:text-center theme-default:lg:text-left theme-default:text-3xl theme-default:md:text-4xl theme-default:xl:text-5xl',
    'theme-rounded:font-display',
    'theme-sharp:tracking-tight theme-sharp:font-semibold'
  );

  const imageWrapperStyles = twMerge(
    // Base styles
    `relative mx-auto ${IMAGE_RATIO_STRING} overflow-hidden order-first h-full w-full md:max-lg:w-3/4`,
    // Theme variants
    'theme-default:xl:mx-0 theme-default:rounded-lg',
    'theme-rounded:-mx-6 theme-rounded:xl:mx-0 theme-rounded:rounded-t-2xl theme-rounded:xl:rounded-2xl',
    'theme-sharp:-mx-4 theme-sharp:xl:mx-0'
  );

  const imageStyles = twMerge('w-full h-full object-cover');

  const metaContainerStyles = twMerge(
    // Base styles
    'text-sm text-on-sf-var mx-auto flex justify-between col-span-2 w-full lg:max-w-[800px] lg:py-6',
    // Theme variants
    'theme-default:md:max-lg:w-3/4',
    'theme-rounded:-mx-6 theme-rounded:bg-sf-cont theme-rounded:rounded-b-2xl theme-rounded:xl:rounded-2xl theme-rounded:xl:mt-8 theme-rounded:p-6 theme-rounded:shadow-sm',
  );

  const authorLinkStyles = twMerge(
    // Theme variants
    'theme-default:text-pr-cont theme-default:hover:text-pr-fix theme-default:underline theme-default:underline-offset-4',
    'theme-rounded:text-on-sf theme-rounded:bg-sf-hst theme-rounded:px-3 theme-rounded:py-1 theme-rounded:rounded-full',
    'theme-sharp:text-pr-fix'
  );

  const leadStyles = twMerge(
    // Base styles
    'text-lg xl:text-xl font-light max-w-[800px] mx-auto mb-8 col-span-2',
    // Theme variants
    'theme-default:px-4 theme-default:leading-snug',
    'theme-rounded:pt-6',
  );

  return (
    <header className={containerStyles}>
      <h1 className={titleStyles}>{title}</h1>
      
      {imagePath && (
        <div className={imageWrapperStyles}>
          <Image
            src={`${DIRECTUS_URL}/assets/${imagePath}`}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            priority
            className={imageStyles}
          />
        </div>
      )}

      <div className={metaContainerStyles}>
        <p>{publishedDate}</p>
        <p>
          {authors.length > 0 && authors[0].name !== '::EDITORIAL::' ? (
            authors.map((author, index) => (
              <span key={author.slug}>
                {index > 0 && ", "}
                <Link 
                  href={`/${lang}/authors/${author.slug}`} 
                  className={authorLinkStyles}
                >
                  {author.name}
                </Link>
              </span>
            ))
          ) : (
            <span>{editorialText}</span>
          )}
        </p>
      </div>

      {lead && (
        <div className={leadStyles}>{lead}</div>
      )}
    </header>
  );
}