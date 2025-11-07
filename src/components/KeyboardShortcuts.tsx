import { useCallback, useEffect } from 'preact/hooks'
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
  const keydownHandler = useCallback((e: SimpleKeyboardEvent) => {
    const utilityStore = useUtilityBarStore.getState()
    const themeStore = useThemeStore.getState()

    if (!canHandleKeyboard()) {
      return
    }

    switch (e.key.toLowerCase()) {
      case 'f': {
        preventDefault(e)
        utilityStore.setIsNavBarVisible(!utilityStore.isNavBarVisible)
        return
      }

      case 'escape': {
        preventDefault(e)
        utilityStore.setIsNavBarVisible(true)
        return
      }

      case 'v': {
        if (e.shiftKey) {
          preventDefault(e)
          utilityStore.setIsViewportOpen(!utilityStore.isViewportOpen)
        }
        return
      }

      case 't': {
        if (e.shiftKey) {
          preventDefault(e)
          themeStore.toggleMode()
        }
        return
      }

      case 's': {
        if (e.shiftKey) {
          preventDefault(e)
          utilityStore.setIsSettingsOpen(!utilityStore.isSettingsOpen)
        }
        return
      }

      default:
        return
    }
  }, [])

  usePostMessageReceiver({
    onMessage(e) {
      if (!isKeyboardEventMessage(e.data)) {
        return
      }

      keydownHandler(e.data.payload)
    },
  })

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => keydownHandler(event)
    document.addEventListener('keydown', handleKeydown)
    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  }, [keydownHandler])
}
