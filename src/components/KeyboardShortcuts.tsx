import { useEffect } from 'preact/hooks'
import {
  useThemeStore,
  useUtilityBarStore,
} from '../features/utility-bar/store'
import { usePostMessageReceiver } from '../features/iframe-postmessage/receiver'
import { isKeyboardEventMessage } from '../features/iframe-postmessage/messages'

/**
 * A simplified version of a keyboard event.
 * preventDefault is optional so we can safely
 * serialize it in a postMessage
 */
export interface SimpleKeyboardEvent {
  key: string
  shiftKey: boolean
  preventDefault?(): void
}

/**
 * Finds the active element even in the shadow DOM.
 *
 * The app is rendered inside a parts-kit custom element with a shadow DOM.
 * document.activeElement is the host element (<parts-kit>), not the inner <input>.
 */
function getDeepActiveElement(root: Document | ShadowRoot = document): Element | null {
  // Start with the active element on the provided root (document by default)
  let active: Element | null = (root as Document).activeElement ?? null

  // If the active element hosts a shadow root, drill down to that shadow root's active element
  while (active && (active as HTMLElement).shadowRoot) {
    const shadow = (active as HTMLElement).shadowRoot as ShadowRoot
    active = shadow.activeElement
  }

  return active
}

export function canHandleKeyboard(): boolean {
  const active = getDeepActiveElement()
  return !(
    active instanceof HTMLInputElement ||
    active instanceof HTMLTextAreaElement
  )
}

/**
 * Safely preventDefault when we can
 */
function preventDefault(e: SimpleKeyboardEvent) {
  if (e.preventDefault !== undefined) {
    e.preventDefault()
  }
}

export default function () {
  const utilityStore = useUtilityBarStore()
  const themeStore = useThemeStore()

  usePostMessageReceiver({
    onMessage(e) {
      if (!isKeyboardEventMessage(e.data)) {
        return
      }

      keydownHandler(e.data.payload)
    },
  })

  // handles different keyboard shortcuts
  const keydownHandler = (e: SimpleKeyboardEvent) => {
    if (!canHandleKeyboard()) {
      return
    }

    // Make sure all of your case statements are lowercase too
    switch (e.key.toLowerCase()) {
      // toggle fullscreen [F]
      case 'f':
        preventDefault(e)
        return utilityStore.setIsNavBarVisible(!utilityStore.isNavBarVisible)

      // exit fullscreen [Esc]
      case 'escape':
        preventDefault(e)
        return utilityStore.setIsNavBarVisible(true)

      // toggle viewport menu [Shift + V]
      case 'v':
        if (e.shiftKey) {
          preventDefault(e)
          utilityStore.setIsViewportOpen(!utilityStore.isViewportOpen)
        }
        return

      // toggle theme [Shift + T]
      case 't':
        if (e.shiftKey) {
          preventDefault(e)
          themeStore.toggleMode()
        }
        return

      // toggle settings [Shift + S]
      case 's':
        if (e.shiftKey) {
          preventDefault(e)
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
    themeStore.mode,
  ])
}
