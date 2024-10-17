// src/main/components/Footer/ContactSectionClient.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Lang } from '@/main/lib/dictionaries/types';
import { CustomButton } from '../Interface/CustomButton';

interface ContactSectionClientProps {
  lang: Lang;
  translations: {
    emailUs: string;
    faq: string;
    helpCenter: string;
    form: {
      button: string;
      emailPlaceholder: string;
      messagePlaceholder: string;
      sendButton: string;
    };
  };
}

export default function ContactSectionClient({ lang, translations }: ContactSectionClientProps) {
  const [showEmailForm, setShowEmailForm] = useState(false);

  return (
    <ul className="space-y-2">
      <li>
        <CustomButton
          color="primary"
          onClick={() => setShowEmailForm(!showEmailForm)}
        >
          {translations.emailUs}
        </CustomButton>
        {showEmailForm && (
          <form className="mt-2 space-y-2">
            <input type="email" placeholder={translations.form.emailPlaceholder} className="w-full p-2 border rounded" />
            <textarea placeholder={translations.form.messagePlaceholder} className="w-full p-2 border rounded" rows={3}></textarea>
            <CustomButton color="primary" type="submit">{translations.form.sendButton}</CustomButton>
          </form>
        )}
      </li>
      <li>
        <Link href={`/${lang}/faq`} className="hover:text-prcolor transition-colors duration-200">
          {translations.faq}
        </Link>
      </li>
      <li>
        <Link href={`/${lang}/help-center`} className="hover:text-prcolor transition-colors duration-200">
          {translations.helpCenter}
        </Link>
      </li>
    </ul>
  );
}