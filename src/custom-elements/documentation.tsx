import {IframeMessage, MessageType, Sources} from '../features/iframe-messages/store'

export default class Documentation extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super()

  }

  connectedCallback() {
    const payload : IframeMessage = {
      source: Sources.Iframe,
      message: MessageType.Documentation,
      payload: this.innerText,
    }

    window.parent?.postMessage(payload, {
      targetOrigin: window.location.origin,
    })
  }
}
