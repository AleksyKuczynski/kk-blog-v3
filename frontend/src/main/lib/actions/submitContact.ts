// src/main/lib/actions/submitContact.ts
'use server'

export async function submitContact(formData: FormData) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('Contact form submitted:', {
    email: formData.get('email'),
    message: formData.get('message')
  });
}