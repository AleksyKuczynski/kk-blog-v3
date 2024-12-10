// src/main/components/Footer/SurpriseSectionClient.tsx
'use client';

import React from 'react';
import { CustomButton } from '../Interface';
import ModalController from '../Interface/Modal/ModalController';

interface SurpriseSectionClientProps {
  translations: {
    clickForSurprise: string;
  };
  modalConfig: {
    title: string;
    description: string;
    content: React.ReactNode;
  };
}

export default function SurpriseSectionClient({ 
  translations, 
  modalConfig 
}: SurpriseSectionClientProps) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <CustomButton
        color="primary"
        onClick={() => setShowModal(true)}
      >
        {translations.clickForSurprise}
      </CustomButton>

      {showModal && (
        <ModalController
          modalType="surprise"
          title={modalConfig.title}
          description={modalConfig.description}
          onClose={() => setShowModal(false)}
        >
          {modalConfig.content}
        </ModalController>
      )}
    </>
  );
}