// src/main/components/Footer/NewsletterSectionClient.tsx
'use client';

import React, { useState } from 'react';
import { CustomButton } from '../Interface/CustomButton';

interface NewsletterSectionClientProps {
  translations: {
    placeholder: string;
    submitButton: string;
    successMessage: string;
  };
}

export default function NewsletterSectionClient({ translations }: NewsletterSectionClientProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribing email:', email);
    setIsSubscribed(true);
  };

  return (
    <>
      {!isSubscribed ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={translations.placeholder}
            className="w-full p-2 border rounded"
            required
          />
          <CustomButton color="primary" type="submit">
            {translations.submitButton}
          </CustomButton>
        </form>
      ) : (
        <p className="text-prcolor">{translations.successMessage}</p>
      )}
    </>
  );
}