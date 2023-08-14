import { defineConfig, mergeConfig } from 'vite'
import {sharedConfig} from './vite.config.js'
import { resolve } from 'path'

export default mergeConfig(sharedConfig, {
  build: {
    outDir: 'lib',
    copyPublicDir: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/main.tsx'),
      name: 'PartsKit',
      // the proper extensions will be added
      fileName: 'parts-kit',
    },
  },
})



