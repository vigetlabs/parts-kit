import { render } from 'preact'
import { App } from '../app.tsx'

export default class PartsKit extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super()
  }

  connectedCallback() {
    const configUrl = this.getAttribute('config-url')
    render(<App configUrl={configUrl} />, this)
  }

  disconnectedCallback() {
    render(null, this)
  }
}
