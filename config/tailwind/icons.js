const plugin = require('tailwindcss/plugin')

module.exports = plugin(({ addComponents }) => {
  const icons = {
    '.icon': {
      '@apply h-4 w-4': {},
    },
    '.icon-lg': {
      '@apply h-5 w-5': {},
    },
  }

  addComponents(icons)
})
