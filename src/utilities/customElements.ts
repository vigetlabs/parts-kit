import PartsKit from '../custom-elements/parts-kit'

/**
 * Finds the first child node in the parts-kit custom element.
 */
export const partsKitRoot = () =>
  document.querySelector(PartsKit.elementName)?.shadowRoot?.firstChild
