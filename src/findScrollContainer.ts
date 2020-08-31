import getWindow from './getWindow'
import { IS_SAFARI } from 'slate-dev-environment'

import findParent from './findParent'

const OVERFLOWS = ['auto', 'overlay', 'scroll']

const fallbackScrollerContainer = (() => {
  if (typeof document === 'undefined') {
    return null
  }
  return window.document.scrollingElement || (IS_SAFARI ? window.document.body : window.document.documentElement)
})()

export default function findScrollContainer(el, { overflowStyleName = 'overflowY' } = {}) {
  const window = getWindow(el)
  return (
    findParent(el, (node) => {
      const style = window.getComputedStyle(node)
      if (OVERFLOWS.includes(style[overflowStyleName])) {
        return true
      }
    }) || fallbackScrollerContainer
  )
}

export function findScroller(el, opts) {
  const container = findScrollContainer(el, opts)
  if (container === fallbackScrollerContainer) {
    return typeof window !== 'undefined' ? window : typeof document !== 'undefined' ? document : null
  }
  return container
}
