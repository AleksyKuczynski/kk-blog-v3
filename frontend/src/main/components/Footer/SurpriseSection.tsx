// src/main/components/Footer/SurpriseSection.tsx
import SurpriseSectionClient from './SurpriseSectionClient';

interface SurpriseSectionProps {
  translations: {
    clickForSurprise: string;
  };
}

export default function SurpriseSection({ translations }: SurpriseSectionProps) {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">{translations.clickForSurprise}</h3>
      <SurpriseSectionClient translations={translations} />
    </div>
  );
}