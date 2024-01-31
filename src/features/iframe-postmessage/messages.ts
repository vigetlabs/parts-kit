import { SimpleKeyboardEvent } from "../../components/KeyboardShortcuts"

type MessageType = 'keyboardEvent'
interface Message {
  type: MessageType
  payload: any
}

export interface MessageKeyboardEvent extends Message {
  type: 'keyboardEvent'
  payload: SimpleKeyboardEvent
}

export function isMessage(maybeMessage: any): maybeMessage is Message {
  const message = maybeMessage as Message
  return message.type !== undefined && message.payload !== undefined
}

export function isKeyboardEventMessage(
  message: Message,
): message is MessageKeyboardEvent {
  return isMessage(message) && message.type === 'keyboardEvent'
}

export function sendMessage(message: Message): void {
    window.parent.postMessage(message, {
      targetOrigin: window.location.origin,
    })
}
