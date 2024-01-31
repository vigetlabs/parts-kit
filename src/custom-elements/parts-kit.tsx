import { render } from 'preact'
import { App } from '../app.tsx'
// https://vitejs.dev/guide/features.html#disabling-css-injection-into-the-page
import cssString from '../index.css?inline'

/**
 * Ensure that we only set styles once
 */
let hasSetUpStyles = false

export default class PartsKit extends HTMLElement {
  private shadow: ShadowRoot

  static readonly elementName = 'parts-kit'

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

    this.shadow = this.attachShadow({ mode: 'open' })
    this.shadow.adoptedStyleSheets = [this.styleSheet]
  }

  connectedCallback() {
    const configUrl = this.getAttribute('config-url')

    this.setUpStyles()

    render(<App configUrl={configUrl} />, this.shadow)
  }

  disconnectedCallback() {
    render(null, this)
  }

  private setUpStyles() {
    if (hasSetUpStyles) {
      return
    }
    const googleFontsLink = document.createElement('link')
    googleFontsLink.href =
      'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap'
    googleFontsLink.rel = 'stylesheet'

    document.head.appendChild(googleFontsLink)

    // Since our main stylesheet is scoped to the web component, we want to ensure that the body tag doesn't have its default padding & margins.
    const bodyStyles = document.createElement('style')
    bodyStyles.appendChild(
      document.createTextNode(`
      body {
        margin: 0;
        padding: 0;
      }
    `),
    )
    document.head.appendChild(bodyStyles)

    // Attach styles to this custom element
    this.styleSheet.replaceSync(cssString)

    // Respond to HMR of our styles. This is tree shaken when building for prod
    // https://vitejs.dev/guide/api-hmr#hot-accept-deps-cb
    if (import.meta.hot) {
      import.meta.hot.accept('../index.css?inline', (newCssString) => {
        if (!newCssString) {
          return
        }

        this.styleSheet.replaceSync(newCssString.default)
      })
    }

    hasSetUpStyles = true
  }
}
