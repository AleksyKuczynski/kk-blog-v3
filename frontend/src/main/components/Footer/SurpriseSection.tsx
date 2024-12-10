// src/main/components/Footer/SurpriseSection.tsx
import SurpriseSectionClient from './SurpriseSectionClient';

interface SurpriseSectionProps {
  translations: {
    clickForSurprise: string;
  };
}

export default function SurpriseSection({ translations }: SurpriseSectionProps) {
  // Przygotowanie contentu, który będzie widoczny dla SEO
  const modalContent = (
    <div className="text-center space-y-4">
      <div className="text-6xl" aria-hidden="true">🎈</div>
      <p className="text-lg">
        You have discovered our secret modal! We appreciate your 
        interest in exploring our site. 
      </p>
      <div className="text-4xl" aria-hidden="true">🎁</div>
    </div>
  );

  const modalConfig = {
    title: "🎉 Surprise!",
    description: "Thanks for being curious! Here's your reward:",
    content: modalContent
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">{translations.clickForSurprise}</h3>
      
      {/* Ukryty div dla SEO */}
      <div className="hidden">
        {modalContent}
      </div>

      <SurpriseSectionClient 
        translations={translations} 
        modalConfig={modalConfig}
      />
    </div>
  );
}