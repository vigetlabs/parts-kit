import { mergeConfig } from 'vite'
import {sharedConfig} from './vite.config.js'

/**
 * This config is used when deploying the demo version of the app to github pages
 */
export default mergeConfig(sharedConfig, {
  // Sets a base for Github Pages
  base: '/parts-kit/',
})
