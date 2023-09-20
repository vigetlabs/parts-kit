import { useEffect } from 'preact/hooks'
import { useUtilityBarStore } from '../features/utility-bar/store'

export default function () {
  const utilityStore = useUtilityBarStore()

  // handles different keyboard shortcuts
  const keydownHandler = (e: KeyboardEvent) => {
    // don't assess shortcuts when inside of an input or textarea
    if (
      document.activeElement instanceof HTMLInputElement ||
      document.activeElement instanceof HTMLTextAreaElement
    ) {
      return
    }

    switch (e.key) {
      // toggle fullscreen [F]
      case 'f':
        return utilityStore.setIsNavBarVisible(!utilityStore.isNavBarVisible)

      // exit fullscreen [Esc]
      case 'Escape':
        return utilityStore.setIsNavBarVisible(true)

      // open viewport menu [shift + V]
      case 'V':
        if (e.shiftKey) {
          utilityStore.setIsViewportOpen(!utilityStore.isViewportOpen)
        }
        return

      default:
        return
    }
  }

  // be sure to track changes to your states here, or they won't update when re-used
  useEffect(() => {
    document.addEventListener('keydown', keydownHandler)
    return () => {
      document.removeEventListener('keydown', keydownHandler)
    }
  }, [utilityStore.isNavBarVisible, utilityStore.isViewportOpen])
}
