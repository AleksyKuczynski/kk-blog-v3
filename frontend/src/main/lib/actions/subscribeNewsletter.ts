// src/main/lib/actions/subscribeNewsletter.ts
'use server'

export async function subscribeNewsletter(formData: FormData) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Newsletter subscription:', {
      email: formData.get('email'),
    });
  }