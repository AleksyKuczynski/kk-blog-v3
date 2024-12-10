// src/main/components/Footer/ContactSection.tsx
import { submitContact } from '@/main/lib/actions';
import { Lang } from '@/main/lib/dictionaries/types';
import FormSectionServer from './FormSectionServer';

interface ContactSectionProps {
  lang: Lang;
  translations: {
    title: string;
    description: string;
    emailUs: string;
    form: {
      emailPlaceholder: string;
      messagePlaceholder: string;
      sendButton: string;
    };
  };
}

export default function ContactSection({ translations }: ContactSectionProps) {
  const contactForm = (
    <form action={submitContact} className="space-y-4">
      <input
        type="email"
        name="email"
        placeholder={translations.form.emailPlaceholder}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="message"
        placeholder={translations.form.messagePlaceholder}
        rows={3}
        className="w-full p-2 border rounded"
        required
      />
      <button 
        type="submit"
        className="w-full bg-prcolor text-white py-2 rounded hover:bg-prcolor-dark transition-colors"
      >
        {translations.form.sendButton}
      </button>
    </form>
  );

  // Dostosowujemy strukturę translations do wymagań FormSectionServer
  const sectionTranslations = {
    title: translations.title,
    description: translations.description,
    submitButton: translations.form.sendButton,
    successMessage: "Message sent successfully!" // TODO: Add to translations
  };

  return (
    <FormSectionServer
      translations={sectionTranslations}
      form={contactForm}
    />
  );
}