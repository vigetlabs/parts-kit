const plugin = require('tailwindcss/plugin')

module.exports = plugin(({ addComponents }) => {
  const dropdown = {
    '.dropdown': {
      '@apply pk-inline-flex pk-flex-col pk-gap-2 pk-p-2 pk-bg-white pk-border pk-border-gray-300 pk-shadow pk-min-w-[200px] pk-max-w-[250px] pk-rounded-xl pk-z-50 dark:pk-bg-gray-800 dark:pk-border-gray-500 pk-transition-colors':
        {},

      // handle dropdown animation
      '&[data-side="top"]': {
        '@apply pk-animate-slide-down-and-fade': {},
      },
      '&[data-side="bottom"]': {
        '@apply pk-animate-slide-up-and-fade': {},
      },
      '&[data-side="left"]': {
        '@apply pk-animate-slide-right-and-fade': {},
      },
      '&[data-side="right"]': {
        '@apply pk-animate-slide-left-and-fade': {},
      },
    },

    '.dropdown-item': {
      '@apply pk-cursor-pointer pk-flex pk-items-center pk-px-3 pk-min-h-8 hover:pk-bg-black/5 hover:pk-outline-none active:pk-bg-black/10 pk-w-full pk-gap-2 pk-justify-between pk-rounded-md aria-checked:pk-bg-blue-500 aria-checked:pk-text-white aria-checked:hover:pk-bg-blue-400 aria-checked:active:pk-bg-blue-500 dark:pk-text-white dark:hover:pk-bg-black/30 dark:active:pk-bg-black/40 aria-checked:dark:hover:pk-bg-blue-400 aria-checked:dark:active:pk-bg-blue-500 pk-transition-colors':
        {},

      '& + &': {
        '@apply pk-mt-1': {},
      },
    },

    '.dropdown-separator': {
      '@apply pk-h-px pk-mx-3 pk-bg-gray-300 dark:pk-bg-gray-500 pk-transition-colors':
        {},
    },

    '.dropdown-arrow': {
      '@apply pk-fill-gray-300 dark:pk-fill-gray-400 pk-transition-colors': {},
    },
  }

  addComponents(dropdown)
})
