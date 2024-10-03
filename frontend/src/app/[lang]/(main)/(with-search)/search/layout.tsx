// src/app/[lang]/(main)/(with-search)/layout.tsx
import SortingControl from '@/main/components/Main/SortingControl';
import SearchPageWrapper from '@/main/components/Search/SearchPageWrapper';
import { getDictionary } from '@/main/lib/dictionaries';
import { Lang } from '@/main/lib/dictionaries/types';
import { Suspense } from 'react';

export default async function WithSearchLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Lang };
}) {
  const dict = await getDictionary(lang);

  return (
    <>
      <SearchPageWrapper initialSearch="" translations={dict.search} />
      <div className="mt-4">
          <Suspense fallback={<div>Loading...</div>}>
            <SortingControl translations={dict.sorting} />
          </Suspense>
        </div>      {children}
    </>
  );
}