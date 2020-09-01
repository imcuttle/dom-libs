/**
 * @file main
 * @author imcuttle
 * @date 2018/4/4
 */

import 'expect-puppeteer'
import { Page } from 'puppeteer'

const port = process.env.TEST_SERVER_PORT

describe('getRect', function () {
  let page: Page
  beforeEach(async () => {
    // @ts-ignore
    await jestPuppeteer.resetPage()
    // @ts-ignore
    page = await browser.newPage()
    await page.goto(`http://localhost:${port}/getRect.html`)
  })
  afterEach(async () => {
    if (page) {
      await page.close()
    }
  })

  it('getRect#fixed', async function () {
    const rect = await (await page.evaluateHandle('getRect(window.fixed)')).jsonValue()
    expect(rect).toEqual({ width: 100, height: 100, left: 20, top: 20 })
  })

  it('getRect#fixed when scrolled', async function () {
    await page.evaluateHandle('window.scrollTo(100, 100)')
    const rect = await (await page.evaluateHandle('getRect(window.fixed)')).jsonValue()
    expect(rect).toEqual({ width: 100, height: 100, left: 120, top: 120 })
  })

  it('getRect#absolute', async function () {
    const rect = await (await page.evaluateHandle('getRect(window.absolute)')).jsonValue()
    // window.height - rect.bottom - rect.height
    const topValue = await (await page.evaluateHandle('window.innerHeight - 100 - 100')).jsonValue()
    expect(rect).toEqual({ width: 100, height: 100, left: 100, top: topValue })
  })

  it('getRect#absolute when scrolled', async function () {
    await page.evaluateHandle('window.scrollTo(100, 100)')

    const rect = await (await page.evaluateHandle('getRect(window.absolute)')).jsonValue()
    // window.height - rect.bottom - rect.height
    const topValue = await (await page.evaluateHandle('window.innerHeight - 100 - 100')).jsonValue()
    expect(rect).toEqual({ width: 100, height: 100, left: 100, top: +topValue })
  })

  it('getRect#normal', async function () {
    const rect = await (await page.evaluateHandle('getRect(window.normal)')).jsonValue()
    expect(rect).toEqual({ width: 100, height: 100, left: 200, top: 0 })
  })

  it('getRect#normal when scrolled', async function () {
    await page.evaluateHandle('window.scrollTo(100, 100)')
    const rect = await (await page.evaluateHandle('getRect(window.normal)')).jsonValue()
    expect(rect).toEqual({ width: 100, height: 100, left: 200, top: 0 })
  })
})
