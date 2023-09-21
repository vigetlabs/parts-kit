const colors = require('tailwindcss/colors')

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '550px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
      '<sm': { max: '549.98px' },
      '<md': { max: '767.98px' },
      '<lg': { max: '1023.98px' },
      '<xl': { max: '1439.98px' },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
    fontSize: {
      xs: ['12px', 1.4],
      sm: ['14px', 1.4],
      md: ['16px', 1.4],
      lg: ['18px', 1.4],
      xl: ['24px', 1.2],
    },
    keyframes: {
      'slide-down-and-fade': {
        from: { opacity: 0, transform: 'translateY(-2px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
      },
      'slide-left-and-fade': {
        from: { opacity: 0, transform: 'translateX(2px)' },
        to: { opacity: 1, transform: 'translateX(0)' },
      },
      'slide-up-and-fade': {
        from: { opacity: 0, transform: 'translateY(2px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
      },
      'slide-right-and-fade': {
        from: { opacity: 0, transform: 'translateX(-2px)' },
        to: { opacity: 1, transform: 'translateX(0)' },
      },
      'dialog-overlay-show': {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      'dialog-content-show': {
        from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
        to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
      },
    },
    animation: {
      'slide-down-and-fade':
        'slide-down-and-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      'slide-left-and-fade':
        'slide-left-and-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      'slide-up-and-fade':
        'slide-up-and-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      'slide-right-and-fade':
        'slide-right-and-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      'dialog-overlay-show':
        'dialog-overlay-show 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      'dialog-content-show':
        'dialog-content-show 150ms cubic-bezier(0.16, 1, 0.3, 1)',
    },
    extend: {
      minHeight: (theme) => ({
        ...theme('spacing'),
      }),
    },
  },
  plugins: [
    require('./config/tailwind/icons.js'),
    require('./config/tailwind/buttons.js'),
    require('./config/tailwind/dropdown.js'),
  ],
}
