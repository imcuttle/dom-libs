import getWindow from './getWindow'
import getRect from './getRect'

export default function getOffsetBy(elem: Element, byElem: Element = getWindow(elem).document.body) {
  let eleRect = getRect(elem)
  let byEleRect = getRect(byElem)

  return {
    ...eleRect,
    left: eleRect.left - byEleRect.left,
    top: eleRect.top - byEleRect.top
  }
}
