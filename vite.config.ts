import { defineConfig, mergeConfig } from 'vite'
import preact from '@preact/preset-vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'


/** Config shared by all of our build processes. Used with `mergeConfig` */
export const sharedConfig = {
  plugins: [
    preact(),
    cssInjectedByJsPlugin(),
  ],
}

export default mergeConfig(sharedConfig, {
  // Customize your local dev here
})
