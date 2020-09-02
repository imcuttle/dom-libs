/**
 * @file main
 * @author imcuttle
 * @date 2018/4/4
 */

import 'expect-puppeteer'
import { Page } from 'puppeteer'

const port = process.env.TEST_SERVER_PORT

describe('scrollTo', function () {
  let page: Page
  beforeEach(async () => {
    // @ts-ignore
    await jestPuppeteer.resetPage()
    // @ts-ignore
    page = await browser.newPage()
    await page.goto(`http://localhost:${port}/scrollTo.html`)
  })

  it('scrollTo#scrollIntoViewIfNeeded', async function () {
    await page.evaluate('scrollTo(window.scroller, { left: 300, top: 300 })')
    const prev = await (await page.evaluateHandle(`getViewTypeBy(window.viewportRect)`)).jsonValue()
    const result = await (await page.evaluateHandle(`scrollIntoViewIfNeeded(window.viewportRect)`)).jsonValue()
    const newView = await (await page.evaluateHandle(`getViewTypeBy(window.viewportRect)`)).jsonValue()
    expect({ prev, newView }).toMatchInlineSnapshot(`
      Object {
        "newView": Object {
          "byRect": Object {
            "height": 200,
            "left": 0,
            "top": 0,
            "width": 200,
          },
          "elOffset": Object {
            "height": 100,
            "left": 0,
            "top": 0,
            "width": 100,
          },
          "xType": "contain",
          "yType": "contain",
        },
        "prev": Object {
          "byRect": Object {
            "height": 200,
            "left": 0,
            "top": 0,
            "width": 200,
          },
          "elOffset": Object {
            "height": 100,
            "left": -100,
            "top": -100,
            "width": 100,
          },
          "xType": "intersection",
          "yType": "intersection",
        },
      }
    `)
  })
})
