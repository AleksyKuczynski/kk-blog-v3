// src/app/[lang]/(main)/rubrics/page.tsx
import { fetchAllRubrics } from '@/main/lib/directus/fetchAllRubrics';
import RubricCard from '@/main/components/Main/RubricCard';
import Breadcrumbs from '@/main/components/Main/Breadcrumbs';
import { getDictionary } from '@/main/lib/dictionaries';
import { Lang } from '@/main/lib/dictionaries/types';
import { Rubric } from '@/main/lib/directus/interfaces';
import Section from '@/main/components/Main/Section';

interface AllRubricsPageProps {
  params: {
    lang: Lang;
  };
}

export default async function AllRubricsPage({ params: { lang } }: AllRubricsPageProps) {
  const rubrics = await fetchAllRubrics(lang);
  const dict = await getDictionary(lang);
  const breadcrumbItems = [
    { label: dict.sections.rubrics.allRubrics, href: `/${lang}/rubrics` },
  ];
  const rubricBasics = rubrics.map(r => ({
    slug: r.slug,
    name: r.translations.find(t => t.languages_code === lang)?.name || r.slug
  }));

  return (
    <>
      <Breadcrumbs 
        items={breadcrumbItems} 
        rubrics={rubricBasics}
        lang={lang}
        translations={{
          home: dict.navigation.home,
          allRubrics: dict.sections.rubrics.allRubrics,
          allAuthors: dict.sections.authors.ourAuthors,
        }}
      />
      <h1 className="text-4xl font-bold mb-8">{dict.sections.rubrics.allRubrics}</h1>
      <Section 
        isOdd={true}
        ariaLabel={dict.sections.rubrics.allRubrics}
      >
        {rubrics.map((rubric: Rubric) => (
          <RubricCard 
            key={rubric.slug} 
            rubric={rubric}
            lang={lang} 
          />
        ))}
      </Section>
    </>
  );
}