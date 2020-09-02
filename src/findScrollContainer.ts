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

export type FindScrollContainerOpts = { overflowStyleName?: string }

/**
 * Find scroll container which can emits `scroll` event
 * @public
 * @param el {any} start element
 * @param [opts={}] {object}
 * @param [opts.overflowStyleName='overflowY'] {string}
 * @return {null | Element}
 */
export default function findScrollContainer(el, opts: FindScrollContainerOpts = {}) {
  const { overflowStyleName = 'overflowY' } = opts
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

/**
 * Find scroller which can has `scrollTo` method
 * @public
 * @param el {any} start element
 * @param [opts] {any} see [findScrollContainer](#findScrollContainer)
 * @return {null | Element | Window}
 */
export function findScroller(el, opts: FindScrollContainerOpts = {}) {
  const container = findScrollContainer(el, opts)
  if (container === fallbackScrollerContainer) {
    return typeof window !== 'undefined' ? window : typeof document !== 'undefined' ? document : null
  }
  return container
}
