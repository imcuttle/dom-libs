/**
 * @file main
 * @author imcuttle
 * @date 2018/4/4
 * @jest-environment jsdom
 */
import { findParent } from '../src'

describe('findParent', function () {
  beforeEach(() => {
    document.body.innerHTML = `
    <div id="f"  data-depth="1">
      <div id="e"  data-depth="2">
        <div id="d"  data-depth="3">
        </div>
      </div>
      <div id="c"  data-depth="2">
        <div id="b" data-depth="3">
        </div>
        <div id="a" data-depth="3">
        <div id="root" data-depth="4">
        </div>
        </div>
      </div>
    </div>
    `
  })

  it('match is string', function () {
    const node = findParent(document.getElementById('root'), '[data-depth="1"]')
    expect(node.getAttribute('data-depth')).toBe('1')
  })

  it('match is function', function () {
    let resultCtx
    const node = findParent(document.getElementById('root'), (node, ctx) => {
      resultCtx = ctx
      return node.getAttribute('data-depth') === '1'
    })
    expect(node.getAttribute('data-depth')).toBe('1')
    expect(resultCtx.parents.map((node) => node.id)).toMatchInlineSnapshot(`
      Array [
        "root",
        "a",
        "c",
      ]
    `)
  })
})
