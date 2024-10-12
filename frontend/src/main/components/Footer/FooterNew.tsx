// src/main/components/Footer.tsx
import Link from 'next/link';
import { Lang, FooterTranslations, SearchTranslations, NavigationTranslations } from '@/main/lib/dictionaries/types';
import Logo from '../Logo';
import SocialLinks from './SocialLinks';
import SurpriseSection from './SurpriseSection';
import CredentialsSection from './CredentialsSection';
import KuKraftSection from './KuKraftSection';
import SearchSection from './SearchSection';
import NavLinks from '../Navigation/NavLinks';

interface FooterProps {
  lang: Lang;
  translations: FooterTranslations & {
    articles: string;
    authors: string;
  };
  navTranslations: NavigationTranslations;
  searchTranslations: SearchTranslations;
}

export default function Footer({ lang, translations, searchTranslations, navTranslations }: FooterProps) {
  return (
    <footer className="bg-bgcolor-alt text-txcolor-muted py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-8">
            <div className="flex flex-col items-start">
              <Logo lang={lang} variant="footer" />
              <NavLinks lang={lang} translations={navTranslations} />
            </div>
            <SocialLinks />
          </div>

          <div className="space-y-8 md:col-start-2 lg:col-start-3">
            <SurpriseSection translations={translations} />
            <div>
              <h3 className="text-2xl font-bold mb-4">{translations.findWhatYouNeed}</h3>
              <SearchSection />
            </div>
          </div>

          <div className="space-y-8 md:col-span-2 lg:col-span-1">
            <CredentialsSection translations={translations} />
            <KuKraftSection translations={translations} />
          </div>
        </div>
      </div>
    </footer>
  );
}