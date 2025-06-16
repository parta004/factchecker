import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        'safe-area-inset-bottom': 'env(safe-area-inset-bottom)',
        'safe-area-inset-top': 'env(safe-area-inset-top)',
        'safe-area-inset-left': 'env(safe-area-inset-left)',
        'safe-area-inset-right': 'env(safe-area-inset-right)',
      },
      height: {
        'screen-safe': 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
      },
      minHeight: {
        'touch-target': '44px',
      },
      minWidth: {
        'touch-target': '44px',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
        'progress-ring': 'progress-ring 0.8s ease-out forwards',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    // Add safe area utilities
    function({ addUtilities }: any) {
      addUtilities({
        '.pb-safe': {
          'padding-bottom': 'max(env(safe-area-inset-bottom), 1rem)',
        },
        '.pt-safe': {
          'padding-top': 'max(env(safe-area-inset-top), 1rem)',
        },
        '.pl-safe': {
          'padding-left': 'max(env(safe-area-inset-left), 1rem)',
        },
        '.pr-safe': {
          'padding-right': 'max(env(safe-area-inset-right), 1rem)',
        },
        '.p-safe': {
          'padding-top': 'max(env(safe-area-inset-top), 1rem)',
          'padding-bottom': 'max(env(safe-area-inset-bottom), 1rem)',
          'padding-left': 'max(env(safe-area-inset-left), 1rem)',
          'padding-right': 'max(env(safe-area-inset-right), 1rem)',
        },
      });
    },
  ],
};
export default config;