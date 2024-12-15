// src/main/components/Footer/SocialLinks.tsx
import React from 'react';
import Link from 'next/link';
import { socialLinks, SocialLink } from './socialLinksData';
import { Lang } from '@/main/lib/dictionaries/types';

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
    className: string;
  }

const SocialLinks: React.FC<SocialLinksProps> = ({ translations, className }) => {
  return (
    <div className={className}>
      <h2 className="text-xl font-semibold grow">{translations.title}</h2>
      <p className='text-sm'>{translations.description}</p>
      <ul className="flex space-x-4">
        {socialLinks.map((link: SocialLink) => (
          <li key={link.name}>
            <Link
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-sf-var hover:text-on-sf transition-colors duration-300"
            >
              <span className="sr-only">{translations[link.name]}</span>
              <link.Icon className="w-8 h-8" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialLinks;