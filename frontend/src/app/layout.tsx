// src/app/[lang]/layout.tsx
import { getTheme } from '@/main/lib/actions';
import { fontSans, fontSerif, fontDisplay, fontCustom } from '@/app/fonts/fonts';
import '@/app/globals.scss';
import { ThemeProvider } from '@/main/components/ThemeSwitcher';

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const initialTheme = await getTheme();
  
  return (
    <html lang={lang} data-theme={initialTheme} className={`${fontSans.variable} ${fontSerif.variable} ${fontDisplay.variable} ${fontCustom.variable}`}>
      <ThemeProvider initialTheme={initialTheme}>
      <body className={`flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-text-primary dark:text-text-inverted theme-${initialTheme} transition-colors duration-300`}>
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}