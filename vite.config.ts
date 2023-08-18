import { mergeConfig, UserConfig } from 'vite'
import { defineConfig} from 'vitest/config'
import preact from '@preact/preset-vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'


/** Config shared by all of our build processes. Used with `mergeConfig` */
export const sharedConfig: UserConfig = defineConfig({
  plugins: [
    preact(),
    cssInjectedByJsPlugin(),
  ],
  test: {
    globals: true,
  }
})

export default mergeConfig(sharedConfig, {
  // Customize your local dev here
})
