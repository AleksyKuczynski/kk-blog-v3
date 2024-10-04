// src/app/[lang]/layout.tsx
import { getTheme, getColorMode } from '@/main/lib/actions';
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
  const initialColorMode = await getColorMode();
  
  return (
    <html lang={lang} data-theme={initialTheme} data-color-mode={initialColorMode} className={`${fontSans.variable} ${fontSerif.variable} ${fontDisplay.variable} ${fontCustom.variable}`}>
      <ThemeProvider initialTheme={initialTheme} initialColorMode={initialColorMode}>
        <body className={`flex flex-col min-h-screen bg-bgcolor text-txcolor theme-${initialTheme} transition-colors duration-300`}>
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}