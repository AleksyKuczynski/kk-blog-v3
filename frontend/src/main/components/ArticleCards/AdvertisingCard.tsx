// /frontend/src/main/components/ArticleCards/AdvertisingCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { DIRECTUS_URL } from '@/main/lib/directus/directusConstants';
import { AdvertisingCardProps } from './interfaces';
import { twMerge } from 'tailwind-merge';

export function AdvertisingCard({ article, articleLink, dict }: AdvertisingCardProps) {
  const translation = article.translations[0];

  const containerStyles = twMerge(
    // Base styles
    'bg-sf-cont',
    // Theme variants
    'theme-default:shadow-sm theme-default:hover:shadow-md theme-default:rounded-lg',
    'theme-rounded:border theme-rounded:border-ol-var theme-rounded:rounded-2xl',
    'theme-sharp:border theme-sharp:border-ol-var'
  );

  const imageWrapperStyles = 'relative h-56 sm:h-64';

  const contentStyles = 'p-4';

  const titleStyles = twMerge(
    // Base styles
    'text-xl sm:text-2xl mb-2',
    // Theme variants
    'theme-default:font-display',
    'theme-rounded:font-display',
    'theme-sharp:font-bold'
  );

  const descriptionStyles = 'line-clamp-2 text-sm mt-2';

  const readMoreStyles = twMerge(
    // Base styles
    'text-sm font-semibold mt-4',
    // Theme variants
    'theme-default:hover:underline theme-default:text-pr-cont',
    'theme-rounded:text-pr-cont theme-rounded:hover:text-pr-fix',
    'theme-sharp:text-pr-cont theme-sharp:hover:text-pr-fix'
  );

  return (
    <article className={containerStyles}>
      <Link href={article.external_link || articleLink} className="block h-full">
        {article.article_heading_img && (
          <div className={imageWrapperStyles}>
            <Image
              src={`${DIRECTUS_URL}/assets/${article.article_heading_img}`}
              alt={translation.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        )}
        <div className={contentStyles}>
          <h2 className={titleStyles}>{translation.title}</h2>
          <p className={descriptionStyles}>{translation.description}</p>
          <div>
            <span className={readMoreStyles}>{dict.common.readMore}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}