// src/app/[lang]/(main)/page.tsx
import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Lang } from '@/main/lib/dictionaries/types';
import { getDictionary } from '@/main/lib/dictionaries';
import { fetchAllRubrics, Rubric, fetchHeroSlugs } from '@/main/lib/directus/index';
import HeroArticles from '@/main/components/Main/HeroArticles';
import RubricCard from '@/main/components/Main/RubricCard';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { lang } }: { params: { lang: Lang } }): Promise<Metadata> {
  const dict = await getDictionary(lang);
  return {
    title: dict.sections.home.welcomeTitle,
    description: dict.sections.home.welcomeDescription,
  };
}

export default async function Home({ params: { lang } }: { params: { lang: Lang } }) {
  const dict = await getDictionary(lang);
  
  let heroSlugs: string[] = [];
  let rubrics: Rubric[] = [];

  try {
    heroSlugs = await fetchHeroSlugs(lang);
  } catch (error) {
    console.error('Error fetching hero articles:', error);
  }

  try {
    rubrics = await fetchAllRubrics(lang);
  } catch (error) {
    console.error('Error fetching rubrics:', error);
  }

  return (
    <>
      <section className="py-12 md:py-24">
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4 text-center">
          {dict.sections.home.welcomeTitle}
        </h1>
        <p className="text-xl text-text-secondary text-center mb-8">
          {dict.sections.home.welcomeDescription}
        </p>
      </section>

      <section aria-label={dict.sections.articles.featuredArticles} className="container mx-auto px-4 mb-12">
          <Suspense fallback={<div>{dict.common.loading}</div>}>
            {heroSlugs.length > 0 ? (
              <HeroArticles heroSlugs={heroSlugs} lang={lang} />
            ) : (
              <div>{dict.sections.articles.noFeaturedArticles}</div>
            )}
          </Suspense>
        </section>

      <section aria-label={dict.sections.home.exploreRubrics} className="my-12">
        <h2 className="text-3xl font-bold text-primary mb-6">{dict.sections.home.exploreRubrics}</h2>
        {rubrics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rubrics.slice(0, 6).map((rubric) => {
              return <RubricCard key={rubric.slug} rubric={rubric} lang={lang} />;
            })}
          </div>
        ) : (
          <p className="text-center text-text-secondary">No rubrics available</p>
        )}
        {rubrics.length > 6 && (
          <div className="text-center mt-8">
            <Link href={`/${lang}/rubrics`} className="text-primary hover:text-primary-dark transition-colors duration-200">
              {dict.sections.home.viewAllRubrics}
            </Link>
          </div>
        )}
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "http://schema.org",
          "@type": "WebPage",
          "name": dict.sections.home.welcomeTitle,
          "description": dict.sections.home.welcomeDescription,
          "publisher": {
            "@type": "Organization",
            "name": "My Blog"
          }
        })
      }} />
    </>
  );
}