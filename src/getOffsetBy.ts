import getWindow from './getWindow'
import getRect from './getRect'

/**
 * @public
 * @param elem {Element}
 * @param byElem {Element}
 * @return {{width: number, height: number, left: number, top: number}}
 */
export default function getOffsetBy(elem: Element, byElem: Element = getWindow(elem).document.body) {
  let eleRect = getRect(elem)
  let byEleRect = getRect(byElem)

  return {
    ...eleRect,
    left: eleRect.left - byEleRect.left,
    top: eleRect.top - byEleRect.top
  }
}
