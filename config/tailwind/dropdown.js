const plugin = require('tailwindcss/plugin')

module.exports = plugin(({ addComponents }) => {
  const dropdown = {
    '.dropdown': {
      '@apply inline-flex flex-col gap-2 p-2 bg-white border border-gray-300 shadow min-w-[200px] max-w-[250px] rounded-xl z-50 dark:bg-gray-800 dark:border-gray-500 transition-colors':
        {},

      // handle dropdown animation
      '&[data-side="top"]': {
        '@apply animate-slide-down-and-fade': {},
      },
      '&[data-side="bottom"]': {
        '@apply animate-slide-up-and-fade': {},
      },
      '&[data-side="left"]': {
        '@apply animate-slide-right-and-fade': {},
      },
      '&[data-side="right"]': {
        '@apply animate-slide-left-and-fade': {},
      },
    },

    '.dropdown-item': {
      '@apply cursor-pointer flex items-center px-3 min-h-8 hover:bg-black/5 hover:outline-none active:bg-black/10 w-full gap-2 justify-between rounded-md aria-checked:bg-blue-500 aria-checked:text-white aria-checked:hover:bg-blue-400 aria-checked:active:bg-blue-500 dark:text-white dark:hover:bg-black/30 dark:active:bg-black/40 aria-checked:dark:hover:bg-blue-400 aria-checked:dark:active:bg-blue-500 transition-colors':
        {},

      '& + &': {
        '@apply mt-1': {},
      },
    },

    '.dropdown-separator': {
      '@apply h-px mx-3 bg-gray-300 dark:bg-gray-500 transition-colors': {},
    },

    '.dropdown-arrow': {
      '@apply fill-gray-300 dark:fill-gray-400 transition-colors': {},
    },
  }

  addComponents(dropdown)
})
