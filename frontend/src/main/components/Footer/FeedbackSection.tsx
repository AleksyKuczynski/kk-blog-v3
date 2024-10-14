// src/main/components/Footer/FeedbackSection.tsx
import FeedbackSectionClient from './FeedbackSectionClient';

interface FeedbackSectionProps {
  translations: {
    title: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    submitButton: string;
    successMessage: string;
  };
}

export default function FeedbackSection({ translations }: FeedbackSectionProps) {
  return (
    <div className="bg-bgcolor-accent p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{translations.title}</h2>
      <FeedbackSectionClient translations={translations} />
    </div>
  );
}