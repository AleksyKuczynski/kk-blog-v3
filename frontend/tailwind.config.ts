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
        '60': '60',
      },
      borderRadius: {
        DEFAULT: 'var(--border-radius)',
      },
      margin: {
        DEFAULT: 'var(--content-margin)',
      },
      padding: {
        card: 'var(--card-padding)',
        'button-x': 'var(--button-padding-x)',
        'button-y': 'var(--button-padding-y)',
      },
      fontSize: {
        base: 'var(--font-size-base)',
      },
      transitionDuration: {
        DEFAULT: 'var(--transition-duration)',
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
        primary: {
          DEFAULT: '#FF6B6B', // Vibrant coral
          light: '#FFA5A5',
          dark: '#FF3E3E',
        },
        secondary: {
          DEFAULT: '#4ECDC4', // Bright teal
          light: '#7EEAE3',
          dark: '#2EAFA5',
        },
        accent: {
          DEFAULT: '#FFD93D', // Sunny yellow
          light: '#FFE685',
          dark: '#FFCC00',
        },
        neutral: {
          100: '#F8F9FA',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
          600: '#6C757D',
          700: '#495057',
          800: '#343A40',
          900: '#212529',
        },
        background: {
          accent: '#FFFFFF',
          light: '#EEEEEE',
          dark: '#000000',
        },
        text: {
          primary: '#1A1A2E',
          secondary: '#16213E',
          inverted: '#EEEEEE',
        },
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