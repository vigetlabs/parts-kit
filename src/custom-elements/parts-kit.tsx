import { render } from 'preact'
import { App } from '../app.tsx'

export default class PartsKit extends HTMLDivElement {
  constructor() {
    // Always call super first in constructor
    super()

    const shadow = this.attachShadow({ mode: 'closed'})

    const mountElement = document.createElement('div')

    shadow.append(mountElement)

    render(<App />, mountElement)
  }
}
