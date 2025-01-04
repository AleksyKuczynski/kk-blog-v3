// src/main/components/Main/RubricCard.tsx
import Link from 'next/link';
import { Rubric } from '@/main/lib/directus/directusInterfaces';
import { Lang } from '@/main/lib/dictionaries/dictionariesTypes';
import { DateSortUpIcon } from '../Interface/Icons'; // Assuming we have this icon

interface RubricCardProps {
  rubric: Rubric;
  lang: Lang;
}

const rubricCardStyles = {
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
    p-6
    theme-rounded:p-8
  `,
  iconWrapper: `
    relative 
    w-16 h-16 sm:w-24 sm:h-24
    flex items-center justify-center
    bg-prcolor/10
    text-prcolor
    theme-default:rounded-lg
    theme-rounded:rounded-full
    theme-sharp:rounded-none
    mb-4 sm:mb-0 sm:mr-6
  `,
  content: `
    grow 
    space-y-2 
    flex flex-col 
  `,
  title: `
    font-bold
    transition-colors
    duration-600
    theme-default:text-xl theme-default:lg:text-2xl
    theme-rounded:text-xl theme-rounded:lg:text-2xl
    theme-sharp:text-2xl
  `,
  articleCount: `
    text-txcolor-secondary
    transition-colors 
    duration-600
    theme-default:text-sm theme-default:lg:text-base
    theme-rounded:text-sm theme-rounded:lg:text-base
    theme-sharp:text-base
  `,
};

export default function RubricCard({ rubric, lang }: RubricCardProps) {
  const rubricName = rubric.translations.find(t => t.languages_code === lang)?.name || rubric.slug;
  
  return (
    <Link href={`/${lang}/${rubric.slug}`} className="block">
      <div className={rubricCardStyles.container}>
        <div className={rubricCardStyles.contentWrapper}>
          <div className={rubricCardStyles.iconWrapper}>
            <DateSortUpIcon className="w-8 h-8 sm:w-12 sm:h-12" />
          </div>
          <div className={rubricCardStyles.content}>
            <h2 className={rubricCardStyles.title}>{rubricName}</h2>
            <p className={rubricCardStyles.articleCount}>
              {rubric.articleCount} article{rubric.articleCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}