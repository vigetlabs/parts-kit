import { render } from 'preact'
import { App } from '../app.tsx'
// https://vitejs.dev/guide/features.html#disabling-css-injection-into-the-page
import cssString from '../index.css?inline'

export default class PartsKit extends HTMLElement {

  private shadow:ShadowRoot

  /**
   * Using constructable stylesheets.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM?ref=blog.jonas.liljegren.org#constructable_stylesheets
   *
   * In the future, we could make this variable globally shared across all web components that want to load our
   * Tailwind based stylesheet.
   *
   * This doesn't work in Safari 16.3 and less. 16.4 was Released 2023-03-27
   */
  private styleSheet = new CSSStyleSheet()

  constructor() {
    // Always call super first in constructor
    super()

    this.shadow = this.attachShadow({mode: 'open'})
    this.shadow.adoptedStyleSheets = [this.styleSheet]

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

        this.styleSheet.replaceSync(newCssString.default)
      })
    }

    this.styleSheet.replaceSync(cssString)

    render(<App configUrl={configUrl} />, this.shadow)
  }

  disconnectedCallback() {
    render(null, this)
  }

}
