import { cn } from "@/main/lib/utils";
import FormSectionClient from "./FormSectionClient";

// src/main/components/Footer/FormSectionServer.tsx
interface FormSectionServerProps {
    translations: {
      title: string;
      description: string;
      submitButton: string;
      successMessage: string;
    };
    form: React.ReactNode;
    className?: string;
  }
  
  export default function FormSectionServer({
    translations,
    form,
    className
  }: FormSectionServerProps) {
    const modalConfig = {
      title: translations.title,
      content: form
    };
  
    const clientTranslations = {
      title: translations.title,
      buttonText: translations.submitButton,
      successMessage: translations.successMessage
    };
  
    return (
      <div className="flex flex-col justify-between space-y-2">
        <h2 className="text-xl font-semibold grow">{translations.title}</h2>
        <p className="text-sm text-txcolor-muted pb-4">{translations.description}</p>
        
        {/* Hidden content for SEO */}
        <div className="hidden">
          {form}
        </div>
  
        <FormSectionClient
          translations={clientTranslations}
          modalConfig={modalConfig}
        />
      </div>
    );
  }