// src/main/components/Breadcrumbs.tsx
import Link from 'next/link';
import { ChevronRightIcon } from '@/main/components/Icons';
import { RubricBasic } from '@/main/lib/directus/interfaces';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  rubrics: RubricBasic[];
  lang: string;
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
    <nav aria-label="Breadcrumb" className="text-sm mb-4">
      <ol className="list-none p-0 inline-flex">
        {fullPath.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && <ChevronRightIcon className="h-4 w-4 text-gray-400 mx-2" />}
            {index === fullPath.length - 1 ? (
              <span className="text-gray-500">{item.label}</span>
            ) : (
              <Link href={item.href} className="text-primary hover:text-primary-dark transition-colors duration-200">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}