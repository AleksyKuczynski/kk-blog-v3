// /frontend/src/main/components/ArticleCards/StandardCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from '../Interface/Icons';
import { StandardCardProps } from './interfaces';
import { twMerge } from 'tailwind-merge';

export function StandardCard({
  article,
  formattedDate,
  articleLink,
  dict,
  imageProps,
  layout = 'regular',
  lang,
}: StandardCardProps) {
  const translation = article.translations[0];

  const containerStyles = twMerge(
    // Base styles
    'relative bg-sf-cont',
    // Theme & Layout variants
    'theme-default:shadow-sm theme-default:hover:shadow-md theme-default:rounded-lg theme-default:transition-shadow theme-default:duration-200',
    'theme-rounded:border theme-rounded:border-ol-var theme-rounded:shadow-sm theme-rounded:hover:shadow-lg theme-rounded:rounded-2xl',
    'theme-sharp:border theme-sharp:border-ol-var theme-sharp:p-2',
    // Layout-specific styles
    layout === 'promoted' && 'h-full sm:max-lg:pb-6',
    layout === 'latest' && 'px-2 sm:px-0'
  );

  const contentWrapperStyles = twMerge(
    // Base styles
    'flex flex-col',
    // Theme & Layout variants
    'theme-default:gap-4 theme-default:2xl:gap-6',
    'theme-rounded:bg-sf-cont theme-rounded:rounded-3xl theme-rounded:overflow-hidden',
    'theme-sharp:gap-2 theme-sharp:bg-sf theme-sharp:p-3',
    // Layout-specific styles
    layout === 'regular' && 'lg:h-full sm:max-lg:grid xl:grid grid-cols-3',
    layout === 'promoted' && 'h-full sm:max-xl:grid grid-cols-3 lg:grid-cols-2',
    layout === 'latest' && 'lg:h-full sm:max-md:grid xl:grid grid-cols-3'
  );

  const imageWrapperStyles = twMerge(
    // Base styles
    'relative overflow-hidden',
    // Theme variants
    'theme-default:rounded-lg theme-default:shadow-md theme-default:group-hover:shadow-xl',
    'theme-rounded:rounded-xl',
    'theme-sharp:border theme-sharp:border-ol-var',
    // Layout-specific styles
    layout === 'regular' && 'w-full aspect-[12/10] sm:max-lg:aspect-[11/12] xl:aspect-[11/12]',
    layout === 'promoted' && 'aspect-video',
    layout === 'latest' && 'xl:h-full xl:aspect-[11/12]'
  );

  const contentStyles = twMerge(
    // Base styles
    'flex flex-col',
    // Theme variants
    'theme-default:p-4',
    'theme-rounded:p-6',
    'theme-sharp:p-2',
    // Layout-specific styles
    layout === 'regular' && 'grow space-y-2 col-span-2 mb-1',
    layout === 'promoted' && 'sm:max-lg:col-span-2',
    layout === 'latest' && 'col-span-2'
  );

  const titleStyles = twMerge(
    // Base styles
    'transition-colors duration-600 mb-2',
    // Theme variants
    'theme-default:text-lg theme-default:lg:text-xl theme-default:max-sm:font-sans theme-default:max-sm:font-semibold theme-default:font-display',
    'theme-rounded:text-lg theme-rounded:lg:text-xl theme-rounded:max-sm:font-sans theme-rounded:max-sm:font-semibold theme-rounded:font-display',
    'theme-sharp:text-xl theme-sharp:max-sm:font-sans theme-sharp:font-bold',
    // Layout-specific styles
    layout === 'regular' && 'line-clamp-3',
    layout === 'promoted' && 'text-2xl lg:max-xl:text-3xl',
    layout === 'latest' && 'line-clamp-3 text-lg 2xl:text-xl'
  );

  const dateStyles = twMerge(
    'text-xs lg:text-sm text-on-sf-var',
    layout === 'regular' && 'mb-2',
    layout === 'promoted' && 'sm:max-lg:grow',
    layout === 'latest' && 'sm:max-lg:grow xl:grow'
  );

  const descriptionStyles = twMerge(
    // Base styles
    'text-sm lg:text-base line-clamp-3 mb-4',
    // Layout specific
    layout === 'regular' && 'max-sm:hidden',
    layout === 'promoted' && 'xl:grow',
    layout === 'latest' && ''
  );

  const readMoreStyles = twMerge(
    // Base styles
    'text-xs lg:text-sm font-medium transition-colors duration-200 flex justify-end items-end',
    // Theme variants
    'theme-default:text-pr-cont theme-default:hover:text-pr-fix',
    'theme-rounded:text-pr-cont theme-rounded:hover:text-pr-fix',
    'theme-sharp:text-pr-cont theme-sharp:hover:text-pr-fix',
    // Layout specific
    layout === 'regular' && 'grow',
    layout === 'promoted' && '',
    layout === 'latest' && 'xl:grow'
  );

  return (
    <div className={containerStyles}>
      <Link href={articleLink} className="block h-full">
        <div className={contentWrapperStyles}>
          {imageProps && (
            <div className={imageWrapperStyles}>
              <Image
                src={imageProps.src}
                alt={imageProps.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          )}
          <div className={contentStyles}>
            <p className={dateStyles}>{formattedDate}</p>
            <h2 className={titleStyles}>
              {translation.title}
            </h2>
            <p className={descriptionStyles}>{translation.description}</p>
            <span className={readMoreStyles}>
              {dict.common.readMore}
              <ChevronRightIcon className="h-5 w-5"/>
            </span>
          </div>
        </div>
      </Link>
      {article.authors && article.authors.length > 0 && article.authors[0].name !== '::EDITORIAL::' && (
        <div className="absolute hidden bg-sf-cont bg-opacity-80 top-2 left-2 pb-1 px-3 rounded-md">
          <div className="mx-auto">
            {article.authors.map((author, index) => (
              <Link 
                key={author.slug} 
                href={`/${lang}/authors/${author.slug}`}
                className="text-xs sm:text-sm inline-block mr-1 last:mr-0 hover:text-pr-fix transition-colors duration-200"
              >
                {index > 0 && "| "}
                {author.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}