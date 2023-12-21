import { render } from 'preact'
import { App } from '../app.tsx'
// https://vitejs.dev/guide/features.html#disabling-css-injection-into-the-page
import cssString from '../index.css?inline'

export default class PartsKit extends HTMLElement {

  private shadow:ShadowRoot

  constructor() {
    // Always call super first in constructor
    super()

    this.shadow = this.attachShadow({mode: 'open'})

    // TODO ensure this works

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

    // TODO, font styles

    // Respond to HMR of our styles. This is tree shaken when building for prod
    // https://vitejs.dev/guide/api-hmr#hot-accept-deps-cb
    if (import.meta.hot) {
      import.meta.hot.accept('../index.css?inline', (newCssString) => {
        if(!newCssString) {
          return;
        }

        this.setStyles(newCssString.default)
      })
    }

    this.setStyles(cssString)

    render(<App configUrl={configUrl} />, this.shadow)
  }

  disconnectedCallback() {
    render(null, this)
  }

  private setStyles(cssString:string) {
    const styleElement = this.querySelector('#css') || document.createElement('style')
    styleElement.textContent = ''
    styleElement.appendChild(document.createTextNode(cssString))
    this.shadow.appendChild(styleElement)
  }
}
