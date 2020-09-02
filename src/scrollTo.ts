/**
 * @public
 * @param scroller {any}
 * @param [opts={}] {object}
 * @param [opts.top] {number}
 * @param [opts.left] {number}
 * @param [opts.behavior] {"auto" | "smooth"}
 */
export default function scrollTo(scroller: any, opts: ScrollToOptions = {}) {
  const { top, left, behavior } = opts
  const fallbackScroll = () => {
    scroller.scrollLeft = left
    scroller.scrollTop = top
  }

  if (typeof scroller.scroll === 'function') {
    try {
      scroller.scroll({
        top,
        left,
        behavior
      })
    } catch (e) {
      fallbackScroll()
    }
  } else {
    fallbackScroll()
  }
}
