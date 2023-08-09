const buttons = document.querySelectorAll('.toggle-content-editable')
let isEnabled = false;

const toggleContentEditable = (enabled, btn) => {
  isEnabled = enabled;
  const editableElements = Array.from(document.querySelectorAll('span, h1, h2, h3, h4, h5, h6, p, a, button'))

  editableElements.filter(el => el !== btn).forEach(el => el.toggleAttribute('contenteditable', enabled))

  btn.innerText = !enabled ? 'Edit Text' : 'Stop editing text'

}

buttons.forEach(btn => btn.addEventListener('click', () => toggleContentEditable(!isEnabled, btn)))

