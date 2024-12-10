// src/main/components/Footer/QuickLinksSection.tsx
import React from 'react';
import Link from 'next/link';
import NavLinks from '../Navigation/NavLinks';
import { Lang, NavigationTranslations } from '@/main/lib/dictionaries/types';

interface QuickLinksSectionProps {
  lang: Lang;
  quickLinks: {
    title: string;
  };
  navigationTranslations: NavigationTranslations;
  contact: {
    faq: string;
    helpCenter: string;
  };
  className: string;
}

const linkStyles = 'block text-txcolor-muted hover:text-txcolor transition-colors duration-200 py-1';

export default function QuickLinksSection({ 
  lang, 
  quickLinks,
  navigationTranslations,
  contact,
  className
}: QuickLinksSectionProps) {
  return (
    <div className={className}>
      <h2 className="text-xl font-semibold mb-4">{quickLinks.title}</h2>
      <nav className="space-y-2">
        <ul className="list-none">
          <NavLinks 
            lang={lang} 
            translations={navigationTranslations} 
            linkStyles={linkStyles}
            disableClientDecorations = {true}
          />
        </ul> 
        <div className="border-t border-txcolor-muted/20 pt-2 mt-4">
          <Link 
            href={`/${lang}/faq`} 
            className={linkStyles}
          >
            {contact.faq}
          </Link>
          <Link 
            href={`/${lang}/help-center`} 
            className={linkStyles}
          >
            {contact.helpCenter}
          </Link>
        </div>
      </nav>
    </div>
  );
}