// src/main/components/CredentialsSection.tsx
export default function CredentialsSection({ translations }) {
    const currentYear = new Date().getFullYear();
    return (
      <div>
        <p>{translations.copyright.replace('{year}', currentYear.toString())}</p>
        <p className="mt-2">{translations.poweredBy}</p>
      </div>
    );
  }