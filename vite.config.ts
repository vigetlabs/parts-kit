import { mergeConfig, UserConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import preact from '@preact/preset-vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

/** Config shared by all of our build processes. Used with `mergeConfig` */
export const sharedConfig: UserConfig = defineConfig({
  plugins: [
    preact(),
    cssInjectedByJsPlugin({
      injectCodeFunction: (cssCode) => {
        try {
          // Only inject parts kit styles if the <parts-kit> custom element is present
          if (typeof document != 'undefined' && document.querySelector('parts-kit')) {
            const elementStyle = document.createElement('style')
            elementStyle.appendChild(document.createTextNode(cssCode))
            document.head.appendChild(elementStyle)
          }
        } catch (e) {
          console.error('vite-plugin-css-injected-by-js', e)
        }
      },
    }),
  ],
  test: {
    globals: true,
  },
})

export default mergeConfig(sharedConfig, {
  // Customize your local dev here
})
