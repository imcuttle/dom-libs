/**
 * @file main
 * @author imcuttle
 * @date 2018/4/4
 */

import 'expect-puppeteer'
import { Page } from 'puppeteer'

const port = process.env.TEST_SERVER_PORT

describe('findScrollContainer', function () {
  let page: Page
  beforeEach(async () => {
    // @ts-ignore
    await jestPuppeteer.resetPage()
    // @ts-ignore
    page = await browser.newPage()
    await page.goto(`http://localhost:${port}/findScrollContainer.html`)
  })

  it('findScrollContainer#no-scroller', async function () {
    const isOK = await page.evaluateHandle('test1()')
    expect(isOK).toBeTruthy()
  })

  it('findScroller#no-scroller', async function () {
    const isOK = await page.evaluateHandle('test2()')
    expect(isOK).toBeTruthy()
  })

  it('findScrollContainer#auto-scroller', async function () {
    const isOK = await page.evaluateHandle('test3()')
    expect(isOK).toBeTruthy()
  })

  it('findScrollContainer#scroll-scroller', async function () {
    const isOK = await page.evaluateHandle('test4()')
    expect(isOK).toBeTruthy()
  })

  it('findScrollContainer#x-scroller', async function () {
    const isOK = await page.evaluateHandle('test5()')
    expect(isOK).toBeTruthy()
  })
})
