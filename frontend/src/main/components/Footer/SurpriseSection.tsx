// src/main/components/SurpriseSection.tsx
import { CustomButton } from '../Interface/CustomButton';

export default function SurpriseSection({ translations }) {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">{translations.clickForSurprise}</h3>
      <CustomButton
        color="primary"
        onClick={() => alert('Thanks for visiting our crazy footer!')}
      >
        {translations.clickForSurprise}
      </CustomButton>
    </div>
  );
}