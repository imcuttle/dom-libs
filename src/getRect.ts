import getWindow from './getWindow'

/**
 * Get the absolute rect of element
 * @param el {Element}
 * @return {{width: number, height: number, left: number, top: number}}
 */
export default function getRect(el: Element) {
  const window = getWindow(el) || { scrollX: 0, scrollY: 0 }
  const rect = el.getBoundingClientRect()
  return {
    width: rect.width,
    height: rect.height,
    left: rect.left + (window.scrollX || window.document.documentElement.scrollLeft),
    top: rect.top + (window.scrollY || window.document.documentElement.scrollTop)
  }
}
