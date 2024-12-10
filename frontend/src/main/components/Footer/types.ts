// src/main/components/Footer/types.ts

// Bazowy interfejs dla formularzy
export interface FormSectionProps {
    title: string;
    buttonText: string;
    successMessage: string;
    modalTitle?: string;
  }
  
  // Typ dla stanu formularza
  export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';
  
  // Bazowy interfejs dla komponentu klienckiego
  export interface FormSectionClientProps {
    translations: {
      title: string;
      buttonText: string;
      successMessage: string;
    };
    modalConfig: {
      title: string;
      content: React.ReactNode;
    };
  }