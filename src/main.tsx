import { canHandleKeyboard } from './components/KeyboardShortcuts'
import PartsKit from './custom-elements/parts-kit'
import { MessageKeyboardEvent, sendMessage } from './features/iframe-postmessage/messages'

customElements.define(PartsKit.elementName, PartsKit)


/**
 * Rough & ready way to init code on pages without <parts-kit>
 */
document.addEventListener('DOMContentLoaded', () => {
  const partsKitEl = document.querySelector(PartsKit.elementName)

  // If a parts kit element is present, we're not inside of the iframe
  // Could also try this -> https://stackoverflow.com/questions/326069/how-to-identify-if-a-webpage-is-being-loaded-inside-an-iframe-or-directly-into-t
  if (partsKitEl) {
    return
  }

  document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (!canHandleKeyboard()) {
      return
    }

    const message: MessageKeyboardEvent = {
      type: 'keyboardEvent',
      from: 'iframe',
      to: 'react',
      payload: {
        key: event.key,
        shiftKey: event.shiftKey,
      },
    }

    sendMessage(message)
  })
})
