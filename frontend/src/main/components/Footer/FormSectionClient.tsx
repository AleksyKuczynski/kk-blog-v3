// src/main/components/Footer/FormSectionClient.tsx
'use client';

import React, { useState } from 'react';
import { CustomButton } from '../Interface';
import ModalController from '../Interface/Modal/ModalController';
import { FormSectionClientProps, FormStatus } from './types';

export default function FormSectionClient({
  translations,
  modalConfig
}: FormSectionClientProps) {
  const [showModal, setShowModal] = useState(false);
  const [showMobileForm, setShowMobileForm] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  async function handleSubmit(formData: FormData) {
    setFormStatus('submitting');
    
    try {
      // We don't need to handle the submit action here as it's handled by the form's action
      setFormStatus('success');
      
      setTimeout(() => {
        setShowModal(false);
        setShowMobileForm(false);
        setFormStatus('idle');
      }, 2000);
    } catch (error) {
      setFormStatus('error');
      console.error(error);
    }
  }

  const formContent = React.cloneElement(
    modalConfig.content as React.ReactElement,
    { onSubmit: handleSubmit }
  );

  if (formStatus === 'success') {
    return (
      <div className="text-center py-4">
        <p className="text-prcolor">{translations.successMessage}</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop version - uses modal */}
      <div className="hidden md:block">
        <CustomButton
          onClick={() => setShowModal(true)}
          filled={false}
        >
          {translations.buttonText}
        </CustomButton>

        {showModal && (
          <ModalController
            modalType="form"
            title={modalConfig.title}
            onClose={() => setShowModal(false)}
          >
            {formContent}
          </ModalController>
        )}
      </div>

      {/* Mobile version - expands in place */}
      <div className="md:hidden">
        <CustomButton
          
          onClick={() => setShowMobileForm(!showMobileForm)}
        >
          {translations.buttonText}
        </CustomButton>

        {showMobileForm && (
          <div className="mt-4">
            {formContent}
          </div>
        )}
      </div>
    </>
  );
}