import type { Config } from "tailwindcss";
import type { PluginAPI } from 'tailwindcss/types/config'

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/main/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      zIndex: {
        '40': '40',
        '50': '50',
        '60': '60',
        '70': '70',        
      },
      borderRadius: {
        'none': 'var(--border-radius-none)',
        'sm': 'var(--border-radius-sm)',
        DEFAULT: 'var(--border-radius-default)',
        'md': 'var(--border-radius-md)',
        'lg': 'var(--border-radius-lg)',
        'xl': 'var(--border-radius-xl)',
        '2xl': 'var(--border-radius-2xl)',
        '3xl': 'var(--border-radius-3xl)',
        'full': 'var(--border-radius-full)',
      },
      fontSize: {
        base: 'var(--font-size-base)',
      },
      transitionDuration: {
        DEFAULT: 'var(--transition-duration)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        expandWidth: {
          '0%': { width: '3rem' },
          '100%': { width: '16rem' },
        },
        collapseWidth: {
          '0%': { width: '16rem' },
          '100%': { width: '3rem' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 300ms ease-in-out',
        fadeOut: 'fadeOut 300ms ease-in-out',
        expandWidth: 'expandWidth 300ms ease-in-out',
        collapseWidth: 'collapseWidth 300ms ease-in-out',
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
        display: ['var(--font-display)'],
        custom: ['var(--font-custom)'],
      },
      colors: {
        bgcolor: {
          DEFAULT: 'var(--color-background)',
          accent: 'var(--color-background-accent)',
          alt: 'var(--color-background-alt)',
        },
        txcolor: {
          DEFAULT: 'var(--color-text)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
        prcolor: {
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
          light: 'var(--color-primary-light)',
        },
        accolor: {
          DEFAULT: 'var(--color-accent)',
          dark: 'var(--color-accent-dark)',
          light: 'var(--color-accent-light)',
        },
        // Direct color values
        success: '#06D6A0',
        error: '#EF476F',
        warning: '#FFC43D',
        info: '#118AB2',
      },
    },
  },
  plugins: [
    function({ addVariant }: PluginAPI) {
      addVariant('theme-default', 'body[data-theme="default"] &')
      addVariant('theme-rounded', 'body[data-theme="rounded"] &')
      addVariant('theme-sharp', 'body[data-theme="sharp"] &')
      addVariant('scheme-default', 'body[data-color-scheme="default"] &')
      addVariant('scheme-1', 'body[data-color-scheme="scheme1"] &')
      addVariant('scheme-2', 'body[data-color-scheme="scheme2"] &')
    },
    require('@tailwindcss/typography'),
  ],
  safelist: [
    'shadow-sm',
        'shadow-md',
        'hover:shadow-md',
        'hover:shadow-lg',
  ],
};
export default config;