import { defineConfig, mergeConfig } from 'vite'
import {sharedConfig} from './vite.config.js'
import { resolve } from 'path'

const libraryConfig = defineConfig({
  define: {
    // I think this is because normally you wouldn't include `preact` in your node module
    // https://vitejs.dev/config/shared-options.html#define
    // https://github.com/vitejs/vite/issues/9186#issuecomment-1189228653
    'process.env.NODE_ENV': '"production"',
  },
  build: {
    outDir: 'lib',
    copyPublicDir: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/main.tsx'),
      name: 'PartsKit',
      // the proper extensions will be added
      fileName: 'parts-kit',
      formats: ['es']
    },
  },
})

export default mergeConfig(sharedConfig, libraryConfig)
