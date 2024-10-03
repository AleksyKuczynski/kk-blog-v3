// src/main/components/ArticleCards/NewsCard.tsx

import Link from 'next/link';
import { NewsCardProps } from './interfaces';

export function NewsCard({ article, formattedDate, articleLink, dict, themeClasses }: NewsCardProps) {
  const translation = article.translations[0];
  return (
    <article className={`${themeClasses.container} bg-bgcolor-alt border border-accent p-4`}>
      <Link href={articleLink} className="block h-full">
        <h2 className={`${themeClasses.title} text-lg`}>
          {translation.title}
        </h2>
        <p className="text-xs mb-2">{formattedDate}</p>
        <p className="line-clamp-3 text-sm">{translation.description}</p>
        <div className="mt-2">
          <span className="text-xs font-semibold hover:underline">{dict.common.readMore}</span>
        </div>
      </Link>
    </article>
  );
}