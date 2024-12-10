// src/main/components/Footer/FeedbackSection.tsx
import { submitFeedback } from '@/main/lib/actions';
import FormSectionServer from './FormSectionServer';

interface FeedbackSectionProps {
  translations: {
    title: string;
    description: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    submitButton: string;
    successMessage: string;
  };
}

export default function FeedbackSection({ translations }: FeedbackSectionProps) {
  const feedbackForm = (
    <form action={submitFeedback} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder={translations.namePlaceholder}
        className="w-full p-2 border rounded"
        required
        minLength={2}
        maxLength={50}
      />
      <input
        type="email"
        name="email"
        placeholder={translations.emailPlaceholder}
        className="w-full p-2 border rounded"
        required
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
      />
      <textarea
        name="message"
        placeholder={translations.messagePlaceholder}
        rows={4}
        className="w-full p-2 border rounded"
        required
        minLength={10}
        maxLength={1000}
      />
      <button 
        type="submit"
        className="w-full bg-prcolor text-white py-2 rounded hover:bg-prcolor-dark transition-colors"
      >
        {translations.submitButton}
      </button>
    </form>
  );

  return (
    <FormSectionServer
      translations={translations}
      form={feedbackForm}
    />
  );
}