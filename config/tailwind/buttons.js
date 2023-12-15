const plugin = require('tailwindcss/plugin')

module.exports = plugin(({ addComponents }) => {
  // Base styles
  const base = {
    '@apply pk-inline-flex pk-font-medium pk-transition-colors pk-items-center pk-justify-center pk-text-center focus:pk-outline-none pk-shrink-0 pk-rounded focus-visible:pk-ring-2 focus-visible:pk-ring-black focus-visible:pk-ring-offset-2':
      {},
    '&:not(.btn-icon)': {
      '@apply pk-min-h-10 pk-px-5 pk-py-2 pk-gap-2': {},
    },
    '&:not(.btn-icon) svg': {
      '@apply -pk-mx-0.5': {}, // handles icon padding offset
    },
    '& svg': {
      '@apply pk-w-5 pk-h-5 pk-shrink-0': {},
    },
    '&:disabled': {
      '@apply pk-cursor-not-allowed pk-opacity-50': {},
    },
  }

  const buttons = {
    // Variants
    '.btn': {
      ...base,
      '@apply pk-bg-blue-500 pk-text-white enabled:hover:pk-bg-blue-600 enabled:active:pk-bg-blue-700 aria-expanded:pk-bg-blue-700':
        {},
    },
    '.btn-outline': {
      ...base,
      '@apply pk-bg-transparent pk-text-gray-600 pk-border pk-border-gray-600 enabled:hover:pk-bg-black/5 enabled:active:pk-bg-black/10 aria-expanded:pk-bg-black/10':
        {},
    },
    '.btn-subtle': {
      ...base,
      '@apply pk-bg-transparent pk-text-gray-600 enabled:hover:pk-bg-black/5 enabled:active:pk-bg-black/10 aria-expanded:pk-bg-black/10 dark:pk-text-gray-300 dark:active:pk-text-white dark:enabled:active:pk-bg-black/30 dark:enabled:hover:pk-bg-black/20 dark:aria-expanded:pk-bg-black/30 dark:aria-expanded:pk-text-white':
        {},
    },

    // Icon buttons (uses base variants for styling)
    '.btn-icon': {
      '@apply !pk-gap-0 !pk-p-0 pk-w-6 pk-h-6 !pk-leading-[0] !pk-text-[0]': {},

      '& svg': {
        '@apply pk-w-4 pk-h-4 pk-shrink-0': {},
      },
    },
  }

  addComponents(buttons)
})
