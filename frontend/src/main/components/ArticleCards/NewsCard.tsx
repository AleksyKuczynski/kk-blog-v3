// /frontend/src/main/components/ArticleCards/NewsCard.tsx
import Link from 'next/link';
import { NewsCardProps } from './interfaces';
import { twMerge } from 'tailwind-merge';

export function NewsCard({ article, formattedDate, articleLink, dict }: NewsCardProps) {
  const translation = article.translations[0];

  const containerStyles = twMerge(
    // Base styles
    'bg-sf-cont p-4',
    // Theme variants
    'theme-default:border theme-default:border-ol theme-default:rounded-lg',
    'theme-rounded:shadow-sm theme-rounded:rounded-2xl',
    'theme-sharp:border theme-sharp:border-ol'
  );

  const titleStyles = twMerge(
    // Base styles
    'text-lg mb-2',
    // Theme variants
    'theme-default:font-display',
    'theme-rounded:font-display',
    'theme-sharp:font-bold'
  );

  const dateStyles = 'text-xs mb-2';
  
  const descriptionStyles = 'line-clamp-3 text-sm';
  
  const readMoreStyles = twMerge(
    // Base styles
    'text-xs font-semibold mt-2',
    // Theme variants
    'theme-default:hover:underline theme-default:text-pr-cont',
    'theme-rounded:text-pr-cont theme-rounded:hover:text-pr-fix',
    'theme-sharp:text-pr-cont theme-sharp:hover:text-pr-fix'
  );

  return (
    <article className={containerStyles}>
      <Link href={articleLink} className="block h-full">
        <h2 className={titleStyles}>{translation.title}</h2>
        <p className={dateStyles}>{formattedDate}</p>
        <p className={descriptionStyles}>{translation.description}</p>
        <div>
          <span className={readMoreStyles}>{dict.common.readMore}</span>
        </div>
      </Link>
    </article>
  );
}