// src/main/components/Footer/FeedbackSectionClient.tsx
'use client';

import React, { useState } from 'react';
import { CustomButton } from '../Interface/CustomButton';

interface FeedbackSectionClientProps {
  translations: {
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    submitButton: string;
    successMessage: string;
  };
}

export default function FeedbackSectionClient({ translations }: FeedbackSectionClientProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback submitted:', { name, email, message });
    setIsSubmitted(true);
  };

  return (
    <>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={translations.namePlaceholder}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={translations.emailPlaceholder}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={translations.messagePlaceholder}
            className="w-full p-2 border rounded"
            rows={4}
            required
          ></textarea>
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