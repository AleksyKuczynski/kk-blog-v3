// src/main/components/Main/RubricCard.tsx

import Link from 'next/link';
import { Rubric } from '@/main/lib/directus/interfaces';
import { Lang } from '@/main/lib/dictionaries/types';

interface RubricCardProps {
  rubric: Rubric;
  lang: Lang;
}

export default function RubricCard({ rubric, lang }: RubricCardProps) {
  const rubricName = rubric.translations.find(t => t.languages_code === lang)?.name || rubric.slug;
  
  return (
    <Link href={`/${lang}/${rubric.slug}`} className="block">
      <div className="bg-bgcolor-alt rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-2xl font-bold mb-2">{rubricName}</h2>
        <p className="text-txcolor">
          {rubric.articleCount} article{rubric.articleCount !== 1 ? 's' : ''}
        </p>
      </div>
    </Link>
  );
}