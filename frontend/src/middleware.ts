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

  if (pathnameHasLanguage) return

  // Get the preferred language from the Accept-Language header
  const acceptLanguage = request.headers.get('Accept-Language')
  let lang = acceptLanguage ? acceptLanguage.split(',')[0].split('-')[0] : 'ru'

  // If the language is not supported, use the default (Russian)
  if (!languages.includes(lang)) {
    lang = 'ru'
  }

  // Redirect to the same pathname with the language prefix
  return NextResponse.redirect(new URL(`/${lang}${pathname}`, request.url))
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}