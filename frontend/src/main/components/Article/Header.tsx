// src/main/components/Article/Header.tsx
import Image from 'next/image';
import Link from 'next/link';
import { DIRECTUS_URL } from '@/main/lib/directus/constants';
import { AuthorDetails } from '@/main/lib/directus/interfaces';
import { Lang } from '@/main/lib/dictionaries/types';
import { createThemeStyles } from '@/main/lib/utils';
import { IMAGE_RATIO_STRING } from '../constants';

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
  const containerStyles = createThemeStyles({
    base: 'relative mb-12',
    default: 'px-6 space-y-4',
    rounded: 'px-8',
    sharp: 'px-4 space-y-4'
  });

  const titleStyles = createThemeStyles({
    base: 'text-4xl md:text-7xl mb-8 font-bold',
    default: 'text-center text-3xl font-custom',
    rounded: 'font-display',
    sharp: 'tracking-tight font-semibold'
  });

  const metaContainerStyles = createThemeStyles({
    base: 'text-sm text-on-sf-var flex justify-between pb-4',
    default: '',
    rounded: '-mx-6 bg-sf-cont rounded-b-2xl p-6 shadow-sm',
    sharp: ''
  });

  const authorLinkStyles = createThemeStyles({
    base: '',
    default: 'underline underline-offset-4',
    rounded: 'text-on-sf bg-sf-hst px-3 py-1 rounded-full',
    sharp: 'text-pr-fix '
  });

  const imageWrapperStyles = createThemeStyles({
    base: `relative ${IMAGE_RATIO_STRING} overflow-hidden`,
    default: '-mx-4 rounded-lg',
    rounded: '-mx-6 rounded-t-2xl',
    sharp: '-mx-4'
  });

  const imageStyles = createThemeStyles({
    base: 'w-full h-full object-cover',
    default: '',
    rounded: '',
    sharp: ''
  });

  const leadStyles = createThemeStyles({
    base: 'text-lead font-light max-w-[800px] mx-auto mb-8',
    default: 'text-center px-4',
    rounded: 'pt-6',
    sharp: 'text-txcolor' // Tylko kolor tekstu
  });

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