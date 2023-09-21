import { useEffect } from 'preact/hooks'
import { useUtilityBarStore } from '../features/utility-bar/store'
import { handleThemeClick } from '../features/utility-bar/ToggleTheme'

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
        e.preventDefault()
        return utilityStore.setIsNavBarVisible(!utilityStore.isNavBarVisible)

      // exit fullscreen [Esc]
      case 'Escape':
        e.preventDefault()
        return utilityStore.setIsNavBarVisible(true)

      // toggle viewport menu [Shift + V]
      case 'V':
        if (e.shiftKey) {
          e.preventDefault()
          utilityStore.setIsViewportOpen(!utilityStore.isViewportOpen)
        }
        return

      // toggle theme [Shift + T]
      case 'T':
        if (e.shiftKey) {
          e.preventDefault()
          handleThemeClick()
        }
        return

      // toggle settings [Shift + S]
      case 'S':
        if (e.shiftKey) {
          e.preventDefault()
          utilityStore.setIsSettingsOpen(!utilityStore.isSettingsOpen)
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
  }, [
    utilityStore.isNavBarVisible,
    utilityStore.isViewportOpen,
    utilityStore.isSettingsOpen,
  ])
}
