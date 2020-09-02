import getViewTypeBy from './getViewTypeBy'
import * as getDocument from 'get-document'

/**
 * 判断与当前
 */

export default function getViewTypeByViewport(el): ReturnType<typeof getViewTypeBy> {
  const document = getDocument(el)
  if (!document) return
  const viewportElem = getViewportElement(document)
  document.body.appendChild(viewportElem)
  const result = getViewTypeBy(el, viewportElem)
  document.body.removeChild(viewportElem)
  return result
}

export function getViewportElement(document = global.document) {
  if (typeof document === 'undefined') {
    return null
  }

  const div = document.createElement('div')

  Object.assign(div.style, {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    pointerEvents: 'none',
    visibility: 'hidden',
    userSelect: 'none',
    opacity: 'none'
  })

  return div
}
