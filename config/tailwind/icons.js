const plugin = require('tailwindcss/plugin')

module.exports = plugin(({ addComponents }) => {
  const icons = {
    '.icon': {
      '@apply pk-h-4 pk-w-4': {},
    },
    '.icon-lg': {
      '@apply pk-h-5 pk-w-5': {},
    },
  }

  addComponents(icons)
})
