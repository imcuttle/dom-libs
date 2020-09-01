import { findScrollContainer, findScroller } from '../src'

Object.assign(window, {
  test1: () => {
    return findScrollContainer(document.querySelector('#no-scroller')) === document.documentElement
  },
  test2: () => {
    return findScroller(document.querySelector('#no-scroller')) === document
  },
  //
  test3: () => {
    return (
      findScrollContainer(document.querySelector('#auto-scroller')) ===
      document.querySelector('#auto-scroller').parentElement
    )
  },
  test4: () => {
    return (
      findScrollContainer(document.querySelector('#scroll-scroller')) ===
      document.querySelector('#scroll-scroller').parentElement
    )
  },

  test5: () => {
    return (
      findScrollContainer(document.querySelector('#x-scroller'), { overflowStyleName: 'overflowY' }) ===
      document.documentElement
    )
  }
})
