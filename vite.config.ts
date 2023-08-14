import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'


export const sharedConfig = {
  plugins: [
    preact(),
    cssInjectedByJsPlugin(),
  ],
}

// https://vitejs.dev/config/
export default defineConfig({
  ...sharedConfig
})
