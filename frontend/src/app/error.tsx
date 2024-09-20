// src/app/error.tsx
'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-background-light">
          <h2 className="text-2xl font-bold text-error mb-4">Something went wrong!</h2>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-primary text-text-inverted rounded hover:bg-primary-dark transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}