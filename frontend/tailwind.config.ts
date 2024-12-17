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
        bgcolor: { //outdated, must not be used
          DEFAULT: 'var(--color-background)',
          accent: 'var(--color-background-accent)',
          alt: 'var(--color-background-alt)',
        },
        txcolor: { //outdated, must not be used
          DEFAULT: 'var(--color-text)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
        prcolor: { //outdated, must not be used
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
          light: 'var(--color-primary-light)',
        },
        accolor: { //outdated, must not be used
          DEFAULT: 'var(--color-accent)',
          dark: 'var(--color-accent-dark)',
          light: 'var(--color-accent-light)',
        },
        // Surface colors
        sf: {
          DEFAULT: 'var(--color-surface)',
          cont: 'var(--color-surface-container)',
          hi: 'var(--color-surface-container-high)',
          hst: 'var(--color-surface-container-highest)',
        },
        
        // Primary colors
        pr: {
          cont: 'var(--color-primary-container)',
          fix: 'var(--color-primary-fixed)',
          dim: 'var(--color-primary-fixed-dim)',
          inv: 'var(--color-primary-container-inverted)',
          'fix-inv': 'var(--color-primary-fixed-inverted)',
          'dim-inv': 'var(--color-primary-fixed-dim-inverted)',
        },
        
        // Tertiary colors
        tr: {
          cont: 'var(--color-tertiary-container)',
          fix: 'var(--color-tertiary-fixed)',
          dim: 'var(--color-tertiary-fixed-dim)',
        },
        
        // Text colors
        on: {
          sf: 'var(--color-on-surface)',
          'sf-var': 'var(--color-on-surface-variant)',
          pr: 'var(--color-on-primary-container)',
          'pr-var': 'var(--color-on-primary-container-variant)',
          tr: 'var(--color-on-tertiary-container)',
          'tr-var': 'var(--color-on-tertiary-container-variant)',
        },
        
        // Outline colors
        ol: {
          DEFAULT: 'var(--color-outline)',
          var: 'var(--color-outline-variant)',
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
      addVariant('theme-default', 'html[data-theme="default"] &')
      addVariant('theme-rounded', 'html[data-theme="rounded"] &')
      addVariant('theme-sharp', 'html[data-theme="sharp"] &')
      addVariant('scheme-default', 'html[data-color-scheme="default"] &')
      addVariant('scheme-1', 'html[data-color-scheme="scheme1"] &')
      addVariant('scheme-2', 'html[data-color-scheme="scheme2"] &')
    },
    require('@tailwindcss/typography'),
  ],
  //safelist: [
  //  {
  //    pattern: /^(bg|(p|m)(x|y|t|b|r|l)|-mx|space|font|text|underline|rounded|leading|md|lg|xl|marker)-.+/, // Pattern dla wszystkich klas utility
  //    variants: ['theme-default', 'theme-rounded', 'theme-sharp']
  //  }
  //],
};
export default config;