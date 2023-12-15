// TODO figure out how to isolate CSS from rest of project
import './index.css'
import PartsKit from './custom-elements/parts-kit'
import Documentation from './custom-elements/documentation'

customElements.define('parts-kit', PartsKit)
customElements.define('parts-kit-docs', Documentation)
