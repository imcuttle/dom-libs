import findScrollContainer from './findScrollContainer'
import getViewTypeBy, { VIEW_TYPES } from './getViewTypeBy'
import scrollTo from './scrollTo'

type ScrollIntoViewIfNeededOptions = {
  scroller?: Element
  behavior?: ScrollBehavior
  offsetTop?: number
  offsetLeft?: number
  offsetBottom?: number
  offsetRight?: number
}

export default function scrollIntoViewIfNeeded(
  el: any,
  {
    scroller,
    behavior,
    offsetTop = 10,
    offsetLeft = 10,
    offsetBottom = 10,
    offsetRight = 10
  }: ScrollIntoViewIfNeededOptions = {}
) {
  // if (el && typeof el.scrollIntoViewIfNeeded === 'function') {
  //     return el.scrollIntoViewIfNeeded();
  // }
  if (scroller) {
    return scrollIfNeed(el, scroller)
  }

  const scrollYController = findScrollContainer(el, { overflowStyleName: 'overflowY' })
  const scrollXController = findScrollContainer(el, { overflowStyleName: 'overflowX' })

  return !!(
    Number(scrollIfNeed(el, scrollYController, { allowScrollLeft: false })) |
    Number(scrollIfNeed(el, scrollXController, { allowScrollTop: false }))
  )

  function scrollIfNeed(el, scroller, { allowScrollLeft = true, allowScrollTop = true } = {}) {
    if (el === scroller) {
      return false
    }

    // todo：scroller 可见 后，但 el 还是隐藏了怎么办
    // 让 scroller 可见
    scrollIntoViewIfNeeded(scroller, {
      offsetTop: 0,
      offsetRight: 0,
      offsetLeft: 0,
      offsetBottom: 0
    })

    const { xType, yType, elOffset, byRect } = getViewTypeBy(el, scroller)

    let scrollLeft = scroller.scrollLeft
    let scrollTop = scroller.scrollTop
    let scrolled = false
    if (allowScrollLeft && xType !== VIEW_TYPES.CONTAIN) {
      scrolled = true

      if (elOffset.left < 0) {
        // left
        scrollLeft = scrollLeft + elOffset.left - offsetLeft
      } else if (elOffset.left + elOffset.width > byRect.width) {
        // right
        scrollLeft = scrollLeft + (elOffset.left + elOffset.width - byRect.width) + offsetRight
      }
    }

    if (allowScrollTop && yType !== VIEW_TYPES.CONTAIN) {
      scrolled = true

      if (elOffset.top < 0) {
        // above
        scrollTop = scrollTop + elOffset.top - offsetTop
      } else if (elOffset.top + elOffset.height > byRect.height) {
        // below
        scrollTop = scrollTop + (elOffset.top + elOffset.height - byRect.height) + offsetBottom
      }
    }

    // if need
    if (scrolled) {
      scrollTo(scroller, {
        top: scrollTop,
        left: scrollLeft,
        behavior
      })
    }

    return scrolled
  }
}
