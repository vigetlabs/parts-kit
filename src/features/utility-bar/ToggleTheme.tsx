import { BlendingModeIcon } from '@radix-ui/react-icons'
import { useThemeStore } from './store'
import { Button } from '../../components/Button'

export default function () {
  const themeStore = useThemeStore()

  return (
    <Button
      variant="icon"
      title="Toggle Theme [Shift + T]"
      aria-label="Toggle Theme [Shift + T]"
      onClick={() => themeStore.toggleMode()}
    >
      <BlendingModeIcon />
    </Button>
  )
}
