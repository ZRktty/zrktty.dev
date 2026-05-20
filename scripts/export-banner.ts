import puppeteer from 'puppeteer-core'
import path from 'path'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const URL = 'http://localhost:3000/banner/b'
const OUT = path.join(process.cwd(), 'docs/jobdesc/banner-b.png')
const W = 1584
const H = 396

const browser = await puppeteer.launch({
  executablePath: CHROME,
  args: ['--no-sandbox', '--disable-gpu'],
})

const page = await browser.newPage()
await page.setViewport({ width: W, height: H, deviceScaleFactor: 2 })
await page.goto(URL, { waitUntil: 'networkidle0' })

// Wait for fonts to render
await new Promise(r => setTimeout(r, 800))

await page.screenshot({
  path: OUT,
  clip: { x: 0, y: 0, width: W, height: H },
})

await browser.close()
console.log(`✓ Exported → ${OUT}`)
