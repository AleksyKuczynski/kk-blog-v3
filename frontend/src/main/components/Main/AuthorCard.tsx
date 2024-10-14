// src/main/components/Main/AuthorCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { DIRECTUS_URL, AuthorDetails } from '@/main/lib/directus/index';
import { Lang } from '@/main/lib/dictionaries/types';

interface AuthorCardProps {
  author: AuthorDetails;
  linkToProfile?: boolean;
  lang: Lang;
}

const authorCardStyles = {
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
    theme-default:rounded-lg
    theme-rounded:rounded-3xl
    theme-sharp:rounded-none
  `,
  contentWrapper: `
    flex flex-col sm:flex-row
    h-full
    theme-rounded:p-2
  `,
  imageWrapper: `
    relative 
    w-full sm:w-1/3
    aspect-square sm:aspect-auto
    theme-rounded:rounded-2xl 
    theme-rounded:overflow-hidden
  `,
  content: `
    grow 
    p-4 
    space-y-2 
    flex flex-col 
    sm:w-2/3
  `,
  name: `
    font-bold
    transition-colors
    duration-600
    theme-default:text-lg theme-default:lg:text-xl
    theme-rounded:text-lg theme-rounded:lg:text-xl
    theme-sharp:text-xl
  `,
  bio: `
    text-txcolor-secondary
    line-clamp-3
    transition-colors 
    duration-600
    theme-default:text-sm theme-default:lg:text-base
    theme-rounded:text-sm theme-rounded:lg:text-base
    theme-sharp:text-sm theme-sharp:lg:text-base
  `,
  image: `
    object-cover 
    w-full h-full
    group-hover:scale-105
    transition-transform
    duration-200
  `,
};

export default function AuthorCard({ author, linkToProfile = true, lang }: AuthorCardProps) {
  const CardContent = () => (
    <div className={authorCardStyles.container}>
      <div className={authorCardStyles.contentWrapper}>
        <div className={authorCardStyles.imageWrapper}>
          {author.avatar ? (
            <Image
              src={`${DIRECTUS_URL}/assets/${author.avatar}`}
              alt={author.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className={authorCardStyles.image}
            />
          ) : (
            <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
              <span className="text-4xl text-neutral-400">📷</span>
            </div>
          )}
        </div>
        <div className={authorCardStyles.content}>
          <h2 className={authorCardStyles.name}>{author.name}</h2>
          <p className={authorCardStyles.bio}>{author.bio}</p>
        </div>
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