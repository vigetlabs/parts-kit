import { useEffect } from 'preact/hooks'
import { CrossCircledIcon, EnterFullScreenIcon } from '@radix-ui/react-icons'
import { useUtilityBarStore } from '../features/utility-bar/store'

export default function () {
  const utilityStore = useUtilityBarStore()

  // Toggle nav bar visibility with the `f` key and exit fullscreen with the `Escape` key
  const keydownHandler = (e: KeyboardEvent) => {
    // Don't toggle nav bar visibility if the user is typing in an input
    if (
      document.activeElement instanceof HTMLInputElement ||
      document.activeElement instanceof HTMLTextAreaElement
    ) {
      return
    }

    switch (e.key) {
      case 'f':
        return utilityStore.setIsNavBarVisible(!utilityStore.isNavBarVisible)

      case 'Escape':
        return utilityStore.setIsNavBarVisible(true)

      default:
        return
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler)
    return () => {
      document.removeEventListener('keydown', keydownHandler)
    }
  }, [utilityStore.isNavBarVisible])

  return (
    <button
      className="btn-subtle btn-icon"
      title={
        utilityStore.isNavBarVisible
          ? 'Go Fullscreen [F]'
          : 'Exit Fullscreen [F]'
      }
      onClick={() =>
        utilityStore.setIsNavBarVisible(!utilityStore.isNavBarVisible)
      }
    >
      {utilityStore.isNavBarVisible ? (
        <EnterFullScreenIcon />
      ) : (
        <CrossCircledIcon />
      )}
    </button>
  )
}
