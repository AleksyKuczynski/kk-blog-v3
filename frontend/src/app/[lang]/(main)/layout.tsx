// src/app/[lang]/(main)/layout.tsx
import { getDictionary } from '@/main/lib/dictionaries';
import Footer from '@/main/components/Footer';
import Navigation from '@/main/components/Navigation'
import { Lang, Dictionary, NavigationTranslations, SearchTranslations } from '@/main/lib/dictionaries/types';
import { getTheme } from '@/main/lib/actions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "My Blog",
  description: "Discover the latest trends, stories, and insights",
}

export default async function MainLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: Lang }
}) {
  const dict: Dictionary = await getDictionary(lang);
  const initialTheme = await getTheme();

  const navigationTranslations: NavigationTranslations = dict.navigation;
  const searchTranslations: SearchTranslations = dict.search;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary text-text-inverted" role="banner">
        <Navigation 
          lang={lang} 
          translations={navigationTranslations}
          searchTranslations={searchTranslations}
        />
      </header>
      <main className="flex-grow mt-16 md:mt-24 pt-4 md:pt-8" role="main">        
        {children}
      </main>
      <Footer 
        lang={lang} 
        translations={{
          ...dict.footer,
          articles: dict.navigation.articles,
          authors: dict.navigation.authors,
        }}
        searchTranslations={dict.search}
      />
    </>
  );
}