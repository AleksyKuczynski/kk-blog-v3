// src/main/components/Footer/SocialLinks.tsx
import React from 'react';
import Link from 'next/link';
import { socialLinks, SocialLink } from './socialLinksData';
import { Lang, FooterTranslations } from '@/main/lib/dictionaries/types';

interface SocialLinksProps {
    lang: Lang;
    translations: {
      title: string;
      description: string;
      facebook: string;
      twitter: string;
      instagram: string;
      vk: string;
      telegram: string;
      whatsapp: string;
    };
  }

const SocialLinks: React.FC<SocialLinksProps> = ({ translations }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">{translations.title}</h2>
      <p className="mb-4">{translations.description}</p>
      <ul className="flex space-x-4">
        {socialLinks.map((link: SocialLink) => (
          <li key={link.name}>
            <Link
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-txcolor-muted hover:text-prcolor transition-colors duration-300"
            >
              <span className="sr-only">{translations[link.name]}</span>
              <link.Icon className="w-6 h-6" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialLinks;