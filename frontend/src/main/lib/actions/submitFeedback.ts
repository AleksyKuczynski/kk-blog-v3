// src/main/lib/actions/submitFeedback.ts
'use server'

export async function submitFeedback(formData: FormData) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Log the data that would be sent
  console.log('Feedback submitted:', {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message')
  });
}