// src/app/[lang]/(main)/error.tsx
'use client'

export default function MainError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-error mb-4">Unable to load content</h2>
      <p className="mb-4">We're sorry, but we couldn't load the requested content. Please try again later.</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-primary text-text-inverted rounded hover:bg-primary-dark transition-colors"
      >
        Try again
      </button>
    </div>
  )
}