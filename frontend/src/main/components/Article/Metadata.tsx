// src/main/components/Article/Metadata.tsx
import Link from 'next/link';
import { Category } from '@/main/lib/directus/interfaces';
import { Lang } from '@/main/lib/dictionaries/types';
import { twMerge } from 'tailwind-merge';

interface MetadataProps {
  categories: Category[];
  lang: Lang;
}

export function Metadata({ categories, lang }: MetadataProps) {
  const containerStyles = twMerge(
    // Base styles
    'text-sm mb-8 text-center space-x-4',
    // Theme variants
    'theme-default:text-pr-cont',
    'theme-rounded:text-on-sf-var',
    'theme-sharp:text-on-sf-var'
  );
  
  const linkStyles = twMerge(
    // Base styles
    'hover:text-pr-fix transition-colors duration-200',
    // Theme variants
    'theme-default:underline theme-default:underline-offset-4',
    'theme-rounded:bg-sf-hi theme-rounded:px-3 theme-rounded:py-1 theme-rounded:rounded-lg',
    'theme-sharp:px-2 theme-sharp:border theme-sharp:border-ol theme-sharp:hover:border-pr-fix'
  );
  
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