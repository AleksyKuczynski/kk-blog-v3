// src/main/components/Footer/NewsletterSection.tsx
import NewsletterSectionClient from './NewsletterSectionClient';

interface NewsletterSectionProps {
  translations: {
    title: string;
    placeholder: string;
    submitButton: string;
    successMessage: string;
  };
}

export default function NewsletterSection({ translations }: NewsletterSectionProps) {
  return (
    <div className="bg-bgcolor-accent p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{translations.title}</h2>
      <NewsletterSectionClient translations={translations} />
    </div>
  );
}