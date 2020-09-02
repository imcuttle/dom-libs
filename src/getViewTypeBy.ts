import getOffsetBy from './getOffsetBy'
import getRect from './getRect'
import findScrollContainer from './findScrollContainer'

/**
 * 判断 DOM 与基准dom的页面位置关系
 */

export const VIEW_TYPES = {
  CONTAIN: 'contain',
  INTERSECTION: 'intersection',
  PARALLEL: 'parallel'
}

export type ViewType = 'contain' | 'intersection' | 'parallel'

/**
 * Returns the `el` position's relation in `byEl` like `{xType: 'contain' | 'intersection' | 'parallel', yType: 'contain' | 'intersection' | 'parallel', elOffset: object, byRect: object}`
 * @public
 * @param el {Element}
 * @param [byEl=findScrollContainer(el)] {Element}
 */
export default function getViewTypeBy(
  el,
  byEl = findScrollContainer(el)
): {
  xType: ViewType
  yType: ViewType
  elOffset: ReturnType<typeof getOffsetBy>
  byRect: ReturnType<typeof getRect>
} {
  const byRect = getRect(byEl)
  const offset = getOffsetBy(el, byEl)
  // todo, 当 window.innerWidth < scroller.width 时候，需要特殊处理吗
  // 嵌套

  let xType
  let yType
  if (offset.top >= 0 && offset.top + offset.height <= byRect.height) {
    // 垂直方向 contain
    yType = VIEW_TYPES.CONTAIN
  } else if (
    // 垂直方向 没有交集
    offset.top + offset.height < 0 ||
    offset.top > byRect.height
  ) {
    yType = VIEW_TYPES.PARALLEL
  } else {
    yType = VIEW_TYPES.INTERSECTION
  }

  if (offset.left >= 0 && offset.left + offset.width <= byRect.width) {
    // 水平方向 contain
    xType = VIEW_TYPES.CONTAIN
  } else if (
    // 水平方向 没有交集
    offset.left + offset.width < 0 ||
    offset.left > byRect.width
  ) {
    xType = VIEW_TYPES.PARALLEL
  } else {
    xType = VIEW_TYPES.INTERSECTION
  }

  return {
    xType,
    yType,
    elOffset: offset,
    byRect
  }
}
