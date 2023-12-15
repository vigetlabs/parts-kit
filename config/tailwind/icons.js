const plugin = require('tailwindcss/plugin')

module.exports = plugin(({ addComponents }) => {
  const icons = {
    '#parts-kit .icon': {
      '@apply h-4 w-4': {},
    },
    '#parts-kit .icon-lg': {
      '@apply h-5 w-5': {},
    },
  }

  addComponents(icons)
})
