// src/main/components/Footer/InteractiveForms.tsx
import { Dictionary, Lang } from '@/main/lib/dictionaries/types';
import { cn } from '@/main/lib/utils';
import ContactSection from './ContactSection';
import NewsletterSection from './NewsletterSection';
import FeedbackSection from './FeedbackSection';

interface InteractiveFormsProps {
  lang: Lang;
  translations: Dictionary['footer'];
  className?: string;
}

export default function InteractiveForms({ lang, translations,className }: InteractiveFormsProps) {
  return (
    <div className={className}>
      <div className="grid gap-8 md:grid-cols-3 md:gap-12">
        <NewsletterSection translations={translations.newsletter} />
        <FeedbackSection translations={translations.feedback} />
        <ContactSection lang={lang} translations={translations.contact} />
      </div>
    </div>
  );
}