const plugin = require('tailwindcss/plugin')

module.exports = plugin(({ addComponents }) => {
  const dropdown = {
    '.dropdown': {
      '@apply inline-flex flex-col gap-2 p-2 bg-white border border-gray-300 shadow min-w-[200px] max-w-[250px] rounded-xl':
        {},

      // handle dropdown animation
      '&[data-side="top"]': {
        '@apply animate-slideDownAndFade': {},
      },
      '&[data-side="bottom"]': {
        '@apply animate-slideUpAndFade': {},
      },
      '&[data-side="left"]': {
        '@apply animate-slideRightAndFade': {},
      },
      '&[data-side="right"]': {
        '@apply animate-slideLeftAndFade': {},
      },
    },

    '.dropdown-item': {
      '@apply cursor-pointer flex items-center px-3 min-h-8 hover:bg-black/5 hover:outline-none active:bg-black/10 w-full gap-2 justify-between rounded-md aria-checked:bg-blue-500 aria-checked:text-white aria-checked:hover:bg-blue-400 aria-checked:active:bg-blue-500':
        {},

      '& + &': {
        '@apply mt-1': {},
      },
    },

    '.dropdown-separator': {
      '@apply h-px mx-3 bg-gray-300': {},
    },

    '.dropdown-arrow': {
      '@apply fill-gray-300': {},
    },
  }

  addComponents(dropdown)
})
