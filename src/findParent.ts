import * as visit from '@moyuyc/visit-tree'

export type FindParentOptions = {
  parentType?: 'parentElement' | 'parentNode'
}

export default function findParent<T = Element>(
  el: T,
  match: ((node: T, ctx: visit.IContext<T>) => boolean) | string,
  { parentType = 'parentElement' }: FindParentOptions = {}
) {
  let resultNode

  visit<T>(
    el,
    (node, ctx) => {
      let isMatched = false
      if (typeof match === 'function') {
        isMatched = match(node, ctx)
      }
      // @ts-ignore
      else if (typeof match === 'string' && typeof node.matches === 'function') {
        // @ts-ignore
        isMatched = node.matches(match)
      }
      if (isMatched) {
        resultNode = node
        ctx.break()
      }
    },
    { path: parentType }
  )

  return resultNode
}
