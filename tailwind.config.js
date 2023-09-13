const colors = require('tailwindcss/colors')

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
    extend: {},
  },
  plugins: [require('./config/tailwind/icons.js')],
}
