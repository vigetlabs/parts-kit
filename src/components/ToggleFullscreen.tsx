import { useEffect } from 'preact/hooks'
import { CrossCircledIcon, EnterFullScreenIcon } from '@radix-ui/react-icons'
import { useUtilityBarStore } from '../features/utility-bar/store'

export default function () {
  const utilityStore = useUtilityBarStore()

  // Toggle utility bar visibility with the `f` key and exit fullscreen with the `Escape` key
  const keydownHandler = (e: KeyboardEvent) => {
    // Don't toggle utility bar visibility if the user is typing in an input
    if (document.activeElement instanceof HTMLInputElement) {
      return
    }

    switch (e.key) {
      case 'f':
        return utilityStore.setIsUtilityBarVisible(
          !utilityStore.isUtilityBarVisible,
        )

      case 'Escape':
        return utilityStore.setIsUtilityBarVisible(true)

      default:
        return
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler)
    return () => {
      document.removeEventListener('keydown', keydownHandler)
    }
  }, [utilityStore.isUtilityBarVisible])

  return (
    <button
      className="btn-subtle btn-icon"
      title={
        utilityStore.isUtilityBarVisible
          ? 'Go Fullscreen [F]'
          : 'Exit Fullscreen [F]'
      }
      onClick={() =>
        utilityStore.setIsUtilityBarVisible(!utilityStore.isUtilityBarVisible)
      }
    >
      {utilityStore.isUtilityBarVisible ? (
        <EnterFullScreenIcon />
      ) : (
        <CrossCircledIcon />
      )}
    </button>
  )
}
