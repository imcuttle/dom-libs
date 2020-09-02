/**
 * @file main
 * @author imcuttle
 * @date 2018/4/4
 */

import 'expect-puppeteer'
import { Page } from 'puppeteer'

const port = process.env.TEST_SERVER_PORT

describe('getViewTypeBy', function () {
  let page: Page
  beforeEach(async () => {
    // @ts-ignore
    await jestPuppeteer.resetPage()
    // @ts-ignore
    page = await browser.newPage()
    await page.goto(`http://localhost:${port}/getViewTypeBy.html`)
  })

  it('getViewTypeBy#parallel', async function () {
    const result = await (
      await page.evaluateHandle(
        `getViewTypeBy(window.parallel.querySelector('.a'), window.parallel.querySelector('.b'))`
      )
    ).jsonValue()
    expect(result).toEqual({
      xType: 'parallel',
      yType: 'contain',
      elOffset: { width: 100, height: 100, left: 110, top: 0 },
      byRect: { width: 100, height: 100, left: 0, top: 0 }
    })
  })

  it('getViewTypeBy#parallel after scrolled', async function () {
    await page.evaluate('window.scrollTo(100, 100)')
    const result = await (
      await page.evaluateHandle(
        `getViewTypeBy(window.parallel.querySelector('.a'), window.parallel.querySelector('.b'))`
      )
    ).jsonValue()
    expect(result).toEqual({
      xType: 'parallel',
      yType: 'contain',
      elOffset: { width: 100, height: 100, left: 110, top: 0 },
      byRect: { width: 100, height: 100, left: 0, top: 0 }
    })
  })

  it('getViewTypeBy#intersection', async function () {
    const result = await (
      await page.evaluateHandle(
        `getViewTypeBy(window.intersection.querySelector('.a'), window.intersection.querySelector('.b'))`
      )
    ).jsonValue()
    expect(result).toMatchObject({
      xType: 'intersection',
      yType: 'contain'
    })
  })

  it('getViewTypeBy#contain', async function () {
    const result = await (
      await page.evaluateHandle(`getViewTypeBy(window.contain.querySelector('.a'), window.contain.querySelector('.b'))`)
    ).jsonValue()
    expect(result).toMatchObject({
      xType: 'contain',
      yType: 'contain'
    })
  })

  it('getViewTypeBy#parallelY', async function () {
    const result = await (
      await page.evaluateHandle(
        `getViewTypeBy(window.parallelY.querySelector('.a'), window.parallelY.querySelector('.b'))`
      )
    ).jsonValue()
    expect(result).toMatchObject({
      xType: 'contain',
      yType: 'parallel'
    })
  })

  it('getViewTypeBy#intersectionY', async function () {
    const result = await (
      await page.evaluateHandle(
        `getViewTypeBy(window.intersectionY.querySelector('.a'), window.intersectionY.querySelector('.b'))`
      )
    ).jsonValue()
    expect(result).toMatchObject({
      xType: 'contain',
      yType: 'intersection'
    })
  })

  it('getViewTypeBy#viewportRect', async function () {
    await page.evaluate(`
      window.scrollTo(0, window.viewportRect.getBoundingClientRect().top + 20)
    `)
    const result = await (await page.evaluateHandle(`getViewTypeByViewport(window.viewportRect)`)).jsonValue()
    expect(result).toMatchObject({
      xType: 'contain',
      yType: 'intersection',
      elOffset: { width: 100, height: 100, left: 0, top: -20 }
      // byRect: { width: 800, height: 600, left: 0, top: 380 }
    })
  })
})
