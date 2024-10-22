// src/main/components/Main/AuthorCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { DIRECTUS_URL, AuthorDetails } from '@/main/lib/directus/index';
import { Lang } from '@/main/lib/dictionaries/types';
import { Theme } from '@/main/components/ThemeSwitcher/themeTypes';
import { getTheme } from '../ThemeSwitcher';

interface AuthorCardProps {
  author: AuthorDetails;
  linkToProfile?: boolean;
  lang: Lang;
}

type ThemeSensitiveStyles = {
  [key in Theme]: {
    container: string;
    gridContainer: string;
    imageWrapper: string;
    name: string;
    bio: string;
    image: string;
  }
}

const authorCardStyles = {
  common: {
    container: `
      h-full  
      relative 
      overflow-hidden
      bg-bgcolor-alt 
      shadow-sm
      hover:shadow-md
      dark:hover:shadow-[0px_0px_7px_5px_rgba(255,255,255,0.2)]
      transition-shadow
      duration-200
      group
    `,
    gridContainer: `
      grid
      grid-cols-1
      sm:grid-cols-2
      sm:grid-rows-2
      gap-4
      p-4
    `,
    imageWrapper: `
      relative 
      w-full
      aspect-square
      sm:row-span-1
    `,
    name: `
      font-bold
      transition-colors
      duration-600
      self-end
    `,
    bio: `
      text-txcolor-secondary
      sm:col-span-2
      transition-colors 
      duration-600
      line-clamp-5
    `,
    image: `
      object-cover 
      w-full h-full
      group-hover:scale-105
      transition-transform
      duration-200
    `,
  },
  themeSensitive: {
    default: {
      container: 'rounded-lg',
      gridContainer: '',
      imageWrapper: 'rounded-lg',
      name: 'text-xl sm:text-2xl',
      bio: 'text-sm sm:text-base',
      image: '',
    },
    rounded: {
      container: 'rounded-3xl',
      gridContainer: 'p-6',
      imageWrapper: 'rounded-2xl',
      name: 'text-lg sm:text-xl',
      bio: 'text-sm sm:text-base',
      image: '',
    },
    sharp: {
      container: '',
      gridContainer: '',
      imageWrapper: '',
      name: 'text-xl',
      bio: 'text-sm sm:text-base',
      image: '',
    },
  } as ThemeSensitiveStyles,
};

export default async function AuthorCard({ author, linkToProfile = true, lang }: AuthorCardProps) {
  const theme = await getTheme();

  const getThemeClasses = (key: keyof typeof authorCardStyles.common) => {
    return `${authorCardStyles.common[key]} ${authorCardStyles.themeSensitive[theme][key]}`.trim();
  };

  const CardContent = () => (
    <div className={getThemeClasses('container')}>
      <div className={getThemeClasses('gridContainer')}>
        <div className={getThemeClasses('imageWrapper')}>
          {author.avatar ? (
            <Image
              src={`${DIRECTUS_URL}/assets/${author.avatar}`}
              alt={author.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className={getThemeClasses('image')}
            />
          ) : (
            <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
              <span className="text-4xl text-neutral-400">📷</span>
            </div>
          )}
        </div>
        <h2 className={getThemeClasses('name')}>{author.name}</h2>
        <p className={getThemeClasses('bio')}>{author.bio}</p>
      </div>
    </div>
  );

  if (linkToProfile) {
    return (
      <Link href={`/${lang}/authors/${author.slug}`} className="block">
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
}