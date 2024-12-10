// src/main/components/Footer/NewsletterSection.tsx

import { subscribeNewsletter } from "@/main/lib/actions";
import FormSectionServer from "./FormSectionServer";

interface NewsletterSectionProps {
  translations: {
    title: string;
    description: string;
    placeholder: string;
    submitButton: string;
    successMessage: string;
  };
}

export default function NewsletterSection({ translations }: NewsletterSectionProps) {
  const newsletterForm = (
    <form action={subscribeNewsletter} className="space-y-4">
      <input
        type="email"
        name="email"
        className="w-full p-2 border rounded"
        placeholder={translations.placeholder}
        required
      />
      <button type="submit" className="w-full bg-prcolor text-white py-2 rounded">
        {translations.submitButton}
      </button>
    </form>
  );

  return (
    <FormSectionServer
      translations={translations}
      form={newsletterForm}
    />
  );
}