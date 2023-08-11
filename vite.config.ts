import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

export const sharedConfig = {
  plugins: [preact()],
}

// https://vitejs.dev/config/
export default defineConfig({
  ...sharedConfig
})
