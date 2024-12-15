// src/main/components/Article/Metadata.tsx
import Link from 'next/link';
import { Category } from '@/main/lib/directus/interfaces';
import { Lang } from '@/main/lib/dictionaries/types';
import { createThemeStyles } from '@/main/lib/utils';

interface MetadataProps {
  categories: Category[];
  lang: Lang;
}

export function Metadata({ categories, lang }: MetadataProps) {
  const containerStyles = createThemeStyles({
    base: 'text-sm text-on-sf-var mb-8 text-center space-x-4',
    default: 'px-4',
    rounded: 'px-6',
    sharp: 'px-4'
  });

  const linkStyles = createThemeStyles({
    base: 'hover:text-pr-fix transition-colors duration-200',
    default: 'underline underline-offset-4',
    rounded: 'bg-sf-hi px-3 py-1 rounded-lg',
    sharp: 'px-1 border border-ol-var hover:border-pr-fix'
  });

  return (
    <div className={containerStyles}>
      {categories.map((category) => (
        <span key={category.slug}>
          <Link 
            href={`/${lang}/articles?category=${category.slug}`} 
            className={linkStyles}
          >
            {category.name}
          </Link>
        </span>
      ))}
    </div>
  );
}