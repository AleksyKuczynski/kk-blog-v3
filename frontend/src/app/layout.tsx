// src/app/[lang]/layout.tsx
import { getTheme, getColorMode, getColorScheme } from '@/main/lib/actions';
import { fontSans, fontSerif, fontDisplay, fontCustom } from '@/app/fonts/fonts';
import '@/app/globals.scss';
import { ThemeProvider } from '@/main/components/ThemeSwitcher';
import { ColorThemeProvider } from '@/main/components/ThemeSwitcher/ColorThemeSwitcher';

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const initialTheme = await getTheme();
  const initialColorMode = await getColorMode();
  const initialColorScheme = await getColorScheme();
  
  return (
    <html lang={lang} data-theme={initialTheme} data-color-mode={initialColorMode} className={`${fontSans.variable} ${fontSerif.variable} ${fontDisplay.variable} ${fontCustom.variable}`}>
      <ThemeProvider initialTheme={initialTheme} initialColorMode={initialColorMode}>
        <ColorThemeProvider initialColorScheme={initialColorScheme}>
          <body data-color-scheme={initialColorScheme} className={`flex flex-col min-h-screen bg-bgcolor text-txcolor theme-${initialTheme} transition-colors duration-300`}>
            {children}
          </body>
        </ColorThemeProvider>
    </ThemeProvider>
    </html>
  );
}