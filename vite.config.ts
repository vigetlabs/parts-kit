import { mergeConfig, UserConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import preact from '@preact/preset-vite'

/** Config shared by all of our build processes. Used with `mergeConfig` */
export const sharedConfig: UserConfig = defineConfig({
  plugins: [
    preact(),
  ],
  test: {
    globals: true,
    include: ['./src/**/*.{spec,test}.{ts,tsx}'],
  },
})

export default mergeConfig(sharedConfig, {
  // Customize your local dev here
})
