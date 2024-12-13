// src/main/components/Breadcrumbs.tsx
import Link from 'next/link';
import { ChevronRightIcon } from '@/main/components/Interface/Icons';
import { RubricBasic } from '@/main/lib/directus/interfaces';
import { Lang } from '@/main/lib/dictionaries/types';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  rubrics: RubricBasic[];
  lang: Lang;
  translations: {
    home: string;
    allRubrics: string;
    allAuthors: string;
  };
}

export default function Breadcrumbs({ items, rubrics, lang, translations }: BreadcrumbsProps) {
  const rubricMap = new Map(rubrics.map(r => [r.slug, r.name]));
  const fullPath: BreadcrumbItem[] = [
    { label: translations.home, href: `/${lang}` },
  ];

  // Determine the context based on the first item
  const firstItem = items[0];
  if (firstItem) {
    if (firstItem.href === `/${lang}/authors` || firstItem.href.startsWith(`/${lang}/authors/`)) {
      // Authors context
      if (firstItem.href !== `/${lang}/authors`) {
        fullPath.push({ label: translations.allAuthors, href: `/${lang}/authors` });
      }
    } else if (firstItem.href === `/${lang}/rubrics` || firstItem.href.startsWith(`/${lang}/`)) {
      // Rubrics context
      if (firstItem.href !== `/${lang}/rubrics`) {
        fullPath.push({ label: translations.allRubrics, href: `/${lang}/rubrics` });
      }
    }
  }

  items.forEach(item => {
    if (!fullPath.some(existingItem => existingItem.href === item.href)) {
      const newItem = {
        ...item,
        label: rubricMap.get(item.label) || item.label
      };
      fullPath.push(newItem);
    }
  });

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="text-sm mb-4"
      itemScope 
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className="list-none p-0 inline-flex">
        {fullPath.map((item, index) => (
          <li 
            key={item.href} 
            className="flex items-center"
            itemProp="itemListElement" 
            itemScope 
            itemType="https://schema.org/ListItem"
          >
            {index > 0 && <ChevronRightIcon className="h-4 w-4 text-txcolor-secondary mx-2" aria-hidden="true" />}
            {index === fullPath.length - 1 ? (
              <span 
                className="text-txcolor-muted"
                itemProp="name"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href} 
                className="text-prcolor hover:text-prcolor-dark hover:underline underline-offset-4 transition-colors duration-200"
                itemProp="item"
              >
                <span itemProp="name">{item.label}</span>
              </Link>
            )}
            <meta itemProp="position" content={`${index + 1}`} />
          </li>
        ))}
      </ol>
    </nav>
  );
}