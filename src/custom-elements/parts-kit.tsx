import { render } from 'preact'
import { App } from '../app.tsx'

export default class PartsKit extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super()

    // Setup localStorage for theme prior to app loading to prevent FOUC
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      localStorage.theme = 'dark'
      document.documentElement.classList.add('dark')
    } else {
      localStorage.theme = 'light'
      document.documentElement.classList.remove('dark')
    }
  }

  connectedCallback() {
    const configUrl = this.getAttribute('config-url')
    render(<App configUrl={configUrl} />, this)
  }

  disconnectedCallback() {
    render(null, this)
  }
}
