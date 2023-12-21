import { BlendingModeIcon } from '@radix-ui/react-icons'
import { useThemeStore } from './store'

export default function () {
  const themeStore = useThemeStore()

  return (
    <button
      className="btn-subtle btn-icon"
      title="Toggle Theme [Shift + T]"
      onClick={() => themeStore.toggleMode()}
    >
      <BlendingModeIcon />
    </button>
  )
}
