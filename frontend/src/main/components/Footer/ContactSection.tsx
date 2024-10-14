// src/main/components/Footer/ContactSection.tsx
import { Lang } from '@/main/lib/dictionaries/types';
import ContactSectionClient from './ContactSectionClient';

interface ContactSectionProps {
  lang: Lang;
  translations: {
    title: string;
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

export default function ContactSection({ lang, translations }: ContactSectionProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{translations.title}</h2>
      <ContactSectionClient lang={lang} translations={translations} />
    </div>
  );
}