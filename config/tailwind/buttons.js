const plugin = require('tailwindcss/plugin')

module.exports = plugin(({ addComponents }) => {
  // Base styles
  const base = {
    '@apply inline-flex font-medium transition-colors items-center justify-center text-center focus:outline-none shrink-0 rounded focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2':
      {},
    '&:not(.btn-icon)': {
      '@apply min-h-10 px-5 py-2 gap-2': {},
    },
    '&:not(.btn-icon) svg': {
      '@apply -mx-0.5': {}, // handles icon padding offset
    },
    '& svg': {
      '@apply w-5 h-5 shrink-0': {},
    },
    '&:disabled': {
      '@apply cursor-not-allowed opacity-50': {},
    },
  }

  const buttons = {
    // Variants
    '.btn': {
      ...base,
      '@apply bg-blue-500 text-white enabled:hover:bg-blue-600 enabled:active:bg-blue-700 aria-expanded:bg-blue-700':
        {},
    },
    '.btn-outline': {
      ...base,
      '@apply bg-transparent text-gray-600 border border-gray-600 enabled:hover:bg-black/5 enabled:active:bg-black/10 aria-expanded:bg-black/10':
        {},
    },
    '.btn-subtle': {
      ...base,
      '@apply bg-transparent text-gray-600 enabled:hover:bg-black/5 enabled:active:bg-black/10 aria-expanded:bg-black/10':
        {},
    },

    // Icon buttons (uses base variants for styling)
    '.btn-icon': {
      '@apply !gap-0 !p-0 w-6 h-6 !leading-[0] !text-[0]': {},

      '& svg': {
        '@apply w-4 h-4 shrink-0': {},
      },
    },
  }

  addComponents(buttons)
})
