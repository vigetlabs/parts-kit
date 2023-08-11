import { defineConfig } from 'vite'
import {sharedConfig} from './vite.config.js'

// https://vitejs.dev/config/
export default defineConfig({
  ...sharedConfig,
  // Sets a base for Github Pages
  base: '/parts-kit/',
})
