// src/main/components/Article/Metadata.tsx
import Link from 'next/link';
import { Category } from '@/main/lib/directus/interfaces';
import { Lang } from '@/main/lib/dictionaries/types';

interface MetadataProps {
  categories: Category[];
  lang: Lang;
}

export function Metadata({ categories, lang }: MetadataProps) {
  return (
    <div className="text-sm text-gray-600 mb-8 text-center">
      {categories.map((category, index) => (
        <span key={category.slug}>
          {index > 0 && ", "}
          <Link href={`/${lang}/articles?category=${category.slug}`} className="text-primary hover:text-primary-dark">
            {category.name}
          </Link>
        </span>
      ))}
    </div>
  );
}