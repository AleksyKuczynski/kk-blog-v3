// /frontend/src/main/components/ArticleCards/StandardCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from '../Interface/Icons';
import { StandardCardProps } from './interfaces';

export function StandardCard({
  article,
  formattedDate,
  articleLink,
  dict,
  themeClasses,
  imageProps,
  lang,
}: StandardCardProps) {
  const translation = article.translations[0];

  return (
    <div className={themeClasses.container}>
      <Link href={articleLink} className="block h-full">
        <div className={themeClasses.contentWrapper}>
          {imageProps && (
            <div className={`${themeClasses.imageWrapper} relative`}>
              <Image
                src={imageProps.src}
                alt={imageProps.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className={`object-cover ${themeClasses.image}`}
              />
            </div>
          )}
          <div className={themeClasses.content}>
            <p className={themeClasses.date}>{formattedDate}</p>
            <h2 className={themeClasses.title}>
              {translation.title}
            </h2>
            <p className={themeClasses.description}>{translation.description}</p>
            <span className={themeClasses.readMore}>
              {dict.common.readMore}
              <ChevronRightIcon  className="h-5 w-5"/>
            </span>
          </div>
        </div>
      </Link>
      {article.authors && article.authors.length > 0 && article.authors[0].name !== '::EDITORIAL::' && (
        <div className={`absolute ${themeClasses.authorWrapper}`}>
          <div className="mx-auto">
            {article.authors.map((author, index) => (
              <Link 
                key={author.slug} 
                href={`/${lang}/authors/${author.slug}`}
                className={themeClasses.authorLink}
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