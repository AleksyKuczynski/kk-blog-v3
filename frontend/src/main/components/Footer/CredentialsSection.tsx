// src/main/components/Footer/CredentialsSection.tsx
import React from 'react';
import Link from 'next/link';
import { Lang } from '@/main/lib/dictionaries/dictionariesTypes';

interface CredentialsSectionProps {
  lang: Lang;
  translations: {
    copyright: string;
    privacyPolicy: string;
    termsOfService: string;
  };
}

const CredentialsSection: React.FC<CredentialsSectionProps> = ({ lang, translations }) => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="pt-16">
      <p>&copy; {currentYear} EventForMe. {translations.copyright}</p>
      <p className="mt-2">
        <Link href={`/${lang}/privacy-policy`} className="hover:text-prcolor transition-colors duration-200">
          {translations.privacyPolicy}
        </Link>
        {' | '}
        <Link href={`/${lang}/terms-of-service`} className="hover:text-prcolor transition-colors duration-200">
          {translations.termsOfService}
        </Link>
      </p>
    </div>
  );
};

export default CredentialsSection;