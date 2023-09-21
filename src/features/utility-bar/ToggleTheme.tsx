import { BlendingModeIcon } from '@radix-ui/react-icons'

export function handleThemeClick() {
  if (localStorage.theme && localStorage.theme == 'dark') {
    localStorage.theme = 'light'
    document.documentElement.classList.remove('dark')
  } else {
    localStorage.theme = 'dark'
    document.documentElement.classList.add('dark')
  }
}

export default function () {
  return (
    <button
      className="btn-subtle btn-icon"
      title="Toggle Theme [Shift + T]"
      onClick={() => handleThemeClick()}
    >
      <BlendingModeIcon />
    </button>
  )
}
