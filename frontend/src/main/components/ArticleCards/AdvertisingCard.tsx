// src/main/components/ArticleCards/AdvertisingCard.tsx

import Link from 'next/link';
import Image from 'next/image';
import { DIRECTUS_URL } from '@/main/lib/directus/constants';
import { AdvertisingCardProps } from './interfaces';

export function AdvertisingCard({ article, articleLink, dict, themeClasses }: AdvertisingCardProps) {
  const translation = article.translations[0];
  return (
    <article className={`${themeClasses.container} bg-primary text-text-inverted`}>
      <Link href={article.external_link || articleLink} className="block h-full">
        {article.article_heading_img && (
          <div className="relative h-56 sm:h-64">
            <Image
              src={`${DIRECTUS_URL}/assets/${article.article_heading_img}`}
              alt={translation.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <h2 className={`${themeClasses.title} text-xl sm:text-2xl`}>
            {translation.title}
          </h2>
          <p className="line-clamp-2 text-sm mt-2">{translation.description}</p>
          <div className="mt-4">
            <span className="text-sm font-semibold hover:underline">{dict.common.readMore}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}