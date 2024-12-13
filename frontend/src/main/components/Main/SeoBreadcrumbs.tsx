// src/main/components/Main/SeoBreadcrumbs.tsx
import { Lang } from '@/main/lib/dictionaries/types';
import { headers } from 'next/headers'

interface SeoBreadcrumbsProps {
  articleSlug: string;
  rubricSlug: string;
  title: string;
  lang: Lang;
}

export async function SeoBreadcrumbs({ articleSlug, rubricSlug, title, lang }: SeoBreadcrumbsProps) {
  const headersList = headers()
  const host = headersList.get('host') || 'localhost:3000'
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
  const baseUrl = `${protocol}://${host}`

  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${baseUrl}/${lang}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Rubrics",
        "item": `${baseUrl}/${lang}/rubrics`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": rubricSlug,
        "item": `${baseUrl}/${lang}/${rubricSlug}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": title,
        "item": `${baseUrl}/${lang}/${rubricSlug}/${articleSlug}`
      }
    ]
  }

  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
    />
  )
}