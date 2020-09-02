export default function scrollTo(scroller: any, { top, left, behavior }: ScrollToOptions) {
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
