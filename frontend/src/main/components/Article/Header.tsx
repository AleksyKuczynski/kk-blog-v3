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

export function Header({ title, publishedDate, authors, lang, editorialText, imagePath }: HeaderProps) {
  return (
    <header>
      <h1 className="text-7xl text-center my-6">{title}</h1>
      {imagePath && (
        <Image
          src={`${DIRECTUS_URL}/assets/${imagePath}`}
          alt={title}
          width={1200}
          height={630}
          style={{ width: '100%', height: 'auto' }}
          className="my-6"
        />
      )}
      <div className="text-sm text-gray-600 mb-8 text-center">
        <p>{publishedDate}</p>
        <p>
          {authors.length > 0 && authors[0].name !== '::EDITORIAL::' ? (
            authors.map((author, index) => (
              <span key={author.slug}>
                {index > 0 && ", "}
                <Link href={`/${lang}/authors/${author.slug}`} className="text-primary hover:text-primary-dark">
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