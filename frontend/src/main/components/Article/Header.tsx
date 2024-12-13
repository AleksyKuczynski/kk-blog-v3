// src/main/components/Article/Header.tsx
import Image from 'next/image';
import Link from 'next/link';
import { DIRECTUS_URL } from '@/main/lib/directus/constants';
import { AuthorDetails } from '@/main/lib/directus/interfaces';
import { Lang } from '@/main/lib/dictionaries/types';

interface HeaderProps {
  title: string;
  publishedDate: string;
  authors: AuthorDetails[];
  lang: Lang;
  editorialText: string;
  imagePath?: string;
}

export function Header({ 
  title, 
  publishedDate, 
  authors, 
  lang, 
  editorialText, 
  imagePath 
}: HeaderProps) {
  const containerStyles = [
    // Base styles
    'my-8',
    // Theme variants
    'theme-default:border-b theme-default:border-prcolor',
    'theme-rounded:bg-bgcolor-alt theme-rounded:rounded-2xl theme-rounded:p-6 theme-rounded:shadow-lg',
    'theme-sharp:border-l-2 theme-sharp:border-prcolor theme-sharp:pl-6'
  ].join(' ');

  const titleStyles = [
    // Base styles
    'text-5xl md:text-7xl mb-6 transition-colors duration-200',
    // Theme variants
    'theme-default:text-center theme-default:text-prcolor',
    'theme-rounded:text-prcolor theme-rounded:font-bold',
    'theme-sharp:text-prcolor theme-sharp:uppercase theme-sharp:tracking-tight'
  ].join(' ');

  const metaContainerStyles = [
    // Base styles
    'text-sm text-txcolor-secondary mb-8',
    // Theme variants
    'theme-default:text-center theme-default:border-t theme-default:border-prcolor theme-default:pt-4',
    'theme-rounded:bg-bgcolor theme-rounded:rounded-xl theme-rounded:p-4',
    'theme-sharp:border-l theme-sharp:border-prcolor theme-sharp:pl-4'
  ].join(' ');

  const authorLinkStyles = [
    // Base styles
    'transition-colors duration-200',
    // Theme variants
    'theme-default:text-prcolor theme-default:hover:text-prcolor-dark theme-default:underline',
    'theme-rounded:text-prcolor theme-rounded:hover:text-prcolor-dark theme-rounded:bg-bgcolor-accent theme-rounded:px-2 theme-rounded:py-1 theme-rounded:rounded',
    'theme-sharp:text-prcolor theme-sharp:hover:text-prcolor-dark theme-sharp:border-b theme-sharp:border-prcolor'
  ].join(' ');

  const imageStyles = [
    // Base styles
    'w-full my-6 transition-all duration-200',
    // Theme variants
    'theme-default:shadow-md',
    'theme-rounded:rounded-2xl theme-rounded:shadow-xl',
    'theme-sharp:border-2 theme-sharp:border-prcolor'
  ].join(' ');

  return (
    <header className={containerStyles}>
      <h1 className={titleStyles}>{title}</h1>
      
      {imagePath && (
        <Image
          src={`${DIRECTUS_URL}/assets/${imagePath}`}
          alt={title}
          width={1200}
          height={630}
          style={{ width: '100%', height: 'auto' }}
          className={imageStyles}
        />
      )}

      <div className={metaContainerStyles}>
        <p className="mb-2">{publishedDate}</p>
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
    </header>
  );
}