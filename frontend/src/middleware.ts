// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ignore public files
  if (PUBLIC_FILE.test(pathname)) return

  // Supported languages
  const languages = ['ru', 'en', 'fr', 'pl']

  // Check if the pathname starts with a supported language
  const pathnameHasLanguage = languages.some(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  )

  // Get the preferred language from the Accept-Language header
  const acceptLanguage = request.headers.get('Accept-Language')
  let lang = acceptLanguage ? acceptLanguage.split(',')[0].split('-')[0] : 'ru'

  // If the language is not supported, use the default (Russian)
  if (!languages.includes(lang)) {
    lang = 'ru'
  }

  // Get the color mode from the cookie or default to system preference
  let colorMode = request.cookies.get('colorMode')?.value
  if (!colorMode) {
    const prefersDark = request.headers.get('Sec-CH-Prefers-Color-Scheme') === 'dark'
    colorMode = prefersDark ? 'dark' : 'light'
  }

  // Create a new response
  const response = pathnameHasLanguage
    ? NextResponse.next()
    : NextResponse.redirect(new URL(`/${lang}${pathname}`, request.url))

  // Set the color mode cookie if it doesn't exist
  if (!request.cookies.get('colorMode')) {
    response.cookies.set('colorMode', colorMode)
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}