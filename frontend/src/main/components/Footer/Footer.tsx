// src/main/components/Footer.tsx
'use client';

import Link from 'next/link';
import SearchBarWrapper from '@/main/components/Search/SearchBarWrapper';
import { Lang, FooterTranslations, SearchTranslations } from '@/main/lib/dictionaries/types';
import Logo from '../Logo';

interface FooterProps {
  lang: Lang;
  translations: FooterTranslations & {
    articles: string;
    authors: string;
  };
  searchTranslations: SearchTranslations;
}

export default function Footer({ lang, translations, searchTranslations }: FooterProps) {
  const FOOTER_LINKS = [
    { href: '/articles', name: translations.articles },
    { href: '/authors', name: translations.authors },
    { href: '/about', name: translations.about },
  ];

  return (
    <footer className="bg-gradient-to-t from-bgcolor to-bgcolor-alt text-txcolor-muted py-16 relative overflow-hidden">
      {/* Background SVG Shapes remain the same */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="mb-8">
            <Logo lang={lang} variant="footer" />
          </div>
          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">{translations.quickLinks}</h3>
            {FOOTER_LINKS.map((link) => (
              <Link 
                key={link.href} 
                href={`/${lang}${link.href}`} 
                className="block text-lg hover:text-accent-light transition duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div>
            <h3 className="text-2xl font-bold mb-4">{translations.findWhatYouNeed}</h3>
            <SearchBarWrapper translations={searchTranslations} />
          </div>

          {/* KuKraft Link */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">{translations.designedWithLove}</h3>
            <a 
              href="https://kukraft.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block bg-accent text-text-primary px-6 py-3 rounded-full text-lg font-semibold hover:bg-accent-dark transition duration-300 transform hover:scale-105"
            >
              {translations.visitKuKraft}
            </a>
          </div>
        </div>

        {/* Fun Interactive Element */}
        <div className="text-center mb-12">
          <button 
            className="bg-prcolor-dark hover:bg-prcolor-light px-8 py-4 rounded-full text-xl font-bold transition duration-300 transform hover:rotate-3 hover:scale-110"
            onClick={() => alert('Thanks for visiting our crazy footer!')}
          >
            {translations.clickForSurprise}
          </button>
        </div>

        {/* Social Media Icons remain the same */}

        {/* Copyright */}
        <div className="text-center text-sm opacity-75">
          <p>{translations.copyright.replace('{year}', new Date().getFullYear().toString())}</p>
          <p className="mt-2">{translations.poweredBy}</p>
        </div>
      </div>

      {/* Animated Elements remain the same */}
    </footer>
  );
}